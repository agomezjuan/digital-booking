package com.dh.pi.backend.app.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dh.pi.backend.app.dto.LoginResponseDTO;
import com.dh.pi.backend.app.dto.UserDTO;
import com.dh.pi.backend.app.model.Role;
import com.dh.pi.backend.app.model.User;
import com.dh.pi.backend.app.repository.IRoleRepository;
import com.dh.pi.backend.app.repository.IUserRepository;
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

    public User register(UserDTO user) {

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

        return userDTO;
    }

}
