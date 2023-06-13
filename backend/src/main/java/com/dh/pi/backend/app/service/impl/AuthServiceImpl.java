package com.dh.pi.backend.app.service.impl;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dh.pi.backend.app.dto.LoginResponseDTO;
import com.dh.pi.backend.app.dto.RegisterRequestDTO;
import com.dh.pi.backend.app.dto.UserDTO;
import com.dh.pi.backend.app.exception.ExistingResourceException;
import com.dh.pi.backend.app.exception.ResourceNotFoundException;
import com.dh.pi.backend.app.model.Role;
import com.dh.pi.backend.app.model.User;
import com.dh.pi.backend.app.model.VerificationToken;
import com.dh.pi.backend.app.repository.IRoleRepository;
import com.dh.pi.backend.app.repository.IUserRepository;
import com.dh.pi.backend.app.repository.IVerificationTokenRepository;
import com.dh.pi.backend.app.service.TokenService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class AuthServiceImpl {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private IVerificationTokenRepository verificationTokenRepository;

    public User register(RegisterRequestDTO user) {
        String email = user.getEmail();

        if (userRepository.findByEmail(email).isPresent()) {
            log.error("Intentando registro con email duplicado");
            throw new ExistingResourceException("El email " + email + " ya está registrado");
        }

        log.info("Se está registrando el usuario: " + user.getEmail());

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        Role userRole = roleRepository.findByAuthority("USER").get();

        Set<Role> roles = new HashSet<>();

        roles.add(userRole);

        User newUser = new User();

        newUser.setName(user.getName());
        newUser.setLastname(user.getLastname());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(encodedPassword);
        newUser.setRoles(roles);

        return userRepository.save(newUser);

    }

    public LoginResponseDTO login(String email, String password) {

        log.info("Se está autenticando el usuario: " + email);

        if (!userRepository.findByEmail(email).isPresent()) {
            log.error("Intentando autenticar un usuario que no existe");
            throw new ResourceNotFoundException(HttpStatus.NOT_FOUND, "El usuario no existe");
        }

        if (!userRepository.findByEmail(email).get().isEnabled()) {
            log.error("Intentando autenticar un usuario que no está activo");
            throw new ResourceNotFoundException(HttpStatus.FORBIDDEN,
                    "El usuario no está activo. Por favor, confirme su correo");
        }

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password));

            String token = tokenService.generateToken(auth);

            User user = userRepository.findByEmail(email).get();

            return new LoginResponseDTO(token, user.getEmail(), user.getRoles());

        } catch (AuthenticationException e) {
            return new LoginResponseDTO(null, null, null);
        }
    }

    public UserDTO getUserDetails(String email) {
        User user = userRepository.findByEmail(email).get();

        UserDTO userDTO = new UserDTO();

        userDTO.setName(user.getName());
        userDTO.setLastname(user.getLastname());
        userDTO.setEmail(user.getEmail());
        userDTO.setRoles(
                user.getRoles()
                        .stream()
                        .map(role -> role.getAuthority())
                        .collect(Collectors.toList()));

        return userDTO;
    }

    public String confirmRegistration(String token) {

        if (!verificationTokenRepository.findByToken(token).isPresent()) {
            log.error("Intentando confirmar un token que no existe");
            throw new ResourceNotFoundException(HttpStatus.NOT_FOUND, "El token de verificación es inválido");
        }

        VerificationToken verificationToken = verificationTokenRepository.findByToken(token).get();

        User user = verificationToken.getUser();

        if (user.isEnabled()) {
            log.error("El usuario ya está activo");
            throw new ExistingResourceException("El usuario ya está activo. Por favor, inicie sesión");
        }

        user.setEnabled(true);

        userRepository.save(user);

        return "Usuario activado correctamente. Ahora puede iniciar sesión";
    }

    public VerificationToken generateNewRegistrationToken(String oldTken) {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(oldTken).get();

        verificationToken.setToken(UUID.randomUUID().toString());
        verificationToken.setExpiryDate(verificationToken.calculateExpiryDate());

        return verificationTokenRepository.save(verificationToken);

    }

}
