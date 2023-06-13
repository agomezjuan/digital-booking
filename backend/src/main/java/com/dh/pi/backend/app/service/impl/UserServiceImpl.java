package com.dh.pi.backend.app.service.impl;

import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.dh.pi.backend.app.dto.RegisterRequestDTO;
import com.dh.pi.backend.app.dto.UserDTO;
import com.dh.pi.backend.app.exception.ExistingResourceException;
import com.dh.pi.backend.app.exception.TechnicalException;
import com.dh.pi.backend.app.exception.ResourceNotFoundException;
import com.dh.pi.backend.app.mapper.UserMapper;
import com.dh.pi.backend.app.model.Role;
import com.dh.pi.backend.app.model.User;
import com.dh.pi.backend.app.model.VerificationToken;
import com.dh.pi.backend.app.repository.IUserRepository;
import com.dh.pi.backend.app.repository.IVerificationTokenRepository;
import com.dh.pi.backend.app.service.IRoleService;
import com.dh.pi.backend.app.service.IUserService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

/**
 * Usuario Service Implementation que accede a la capa de repositorio
 */
@Slf4j
@Service
@Validated
public class UserServiceImpl implements UserDetailsService, IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRoleService roleService;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IVerificationTokenRepository verificationTokenRepository;

    @Override
    public UserDTO createUser(RegisterRequestDTO usuarioDTO) {
        String email = usuarioDTO.getEmail();

        if (userRepository.findByEmail(email).isPresent()) {
            log.error("Intentando crear un usuario con un correo que ya existe: " + email);
            throw new ExistingResourceException("Ya existe un usuario con el correo " + email);
        }
        Role role = roleService.getDefaultRole();
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        usuarioDTO.setRoles(roles.stream().map(Role::getAuthority).toList());

        User usuarioEntity = userMapper.mapToUser(usuarioDTO);

        usuarioEntity.setRoles(roles);

        String encodedPassword = passwordEncoder.encode(usuarioDTO.getPassword());
        usuarioEntity.setPassword(encodedPassword);

        userRepository.save(usuarioEntity);

        UserDTO usuarioDTOres = userMapper.mapToUserDTO(usuarioEntity);

        return usuarioDTOres;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> usuarios = (List<User>) userRepository.findAll();
        List<UserDTO> usuariosDTO = usuarios.stream().map(usuario -> {
            UserDTO usuarioDTO = userMapper.mapToUserDTO(usuario);
            return usuarioDTO;
        }).toList();

        return usuariosDTO;
    }

    @Override
    public UserDTO getUser(Long id) {
        User usuario = userRepository.findById(id).orElse(null);
        UserDTO usuarioDTO = userMapper.mapToUserDTO(usuario);

        return usuarioDTO;
    }

    @Override
    public void deleteUser(Long id) throws ResourceNotFoundException, TechnicalException {
        try {
            userRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
        } catch (Exception e) {
            throw new TechnicalException(e);
        }

    }

    @Override
    public UserDTO updateUser(Long id, @Valid UserDTO usuarioDTO) throws ResourceNotFoundException {
        User usuario = userRepository.findById(id).orElse(null);

        if (usuario == null) {
            throw new ResourceNotFoundException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
        }
        usuario.setName(usuarioDTO.getName());
        usuario.setLastname(usuarioDTO.getLastname());
        usuario.setEmail(usuarioDTO.getEmail());
        userRepository.save(usuario);

        UserDTO usuarioDTOResponse = userMapper.mapToUserDTO(usuario);
        return usuarioDTOResponse;
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User usuario = userRepository.findByEmail(email).get();
        UserDTO usuarioDTO = userMapper.mapToUserDTO(usuario);

        return usuarioDTO;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    }

    @Override
    public void createVerificationToken(User user, String token) {
        var verificationToken = new VerificationToken(user, token);
        verificationTokenRepository.save(verificationToken);
    }

    @Override
    public void validateVerificationToken(String token) {

        if (!verificationTokenRepository.findByToken(token).isPresent()) {
            throw new UsernameNotFoundException("Token inválido");
        }

        VerificationToken verificationToken = verificationTokenRepository.findByToken(token).get();

        User user = verificationToken.getUser();

        Calendar cal = Calendar.getInstance();

        if (verificationToken.getExpiryDate().getTime() - cal.getTime().getTime() <= 0) {
            verificationTokenRepository.delete(verificationToken);
            throw new UsernameNotFoundException("Token expirado");
        }

        user.setEnabled(true);
        userRepository.save(user);
    }

}
