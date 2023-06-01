package com.dh.pi.backend.app.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.dh.pi.backend.app.dto.UserDTO;
import com.dh.pi.backend.app.exception.TechnicalException;
import com.dh.pi.backend.app.exception.UserNotFoundException;
import com.dh.pi.backend.app.model.User;
import com.dh.pi.backend.app.repository.IUserRepository;
import com.dh.pi.backend.app.service.IUserService;

import lombok.extern.slf4j.Slf4j;

// import jakarta.validation.Valid;

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
    private ModelMapper modelMapper;

    @Override
    public UserDTO createUser(UserDTO usuario) {
        User usuarioEntity = modelMapper.map(usuario, User.class);
        userRepository.save(usuarioEntity);

        return modelMapper.map(usuarioEntity, UserDTO.class);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> usuarios = (List<User>) userRepository.findAll();
        List<UserDTO> usuariosDTO = usuarios.stream().map(usuario -> modelMapper.map(usuario, UserDTO.class))
                .toList();

        return usuariosDTO;
    }

    @Override
    public UserDTO getUser(Long id) {
        User usuario = userRepository.findById(id).orElse(null);
        UserDTO usuarioDTO = modelMapper.map(usuario, UserDTO.class);

        return usuarioDTO;
    }

    @Override
    public void deleteUser(Long id) throws UserNotFoundException, TechnicalException {
        try {
            userRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new UserNotFoundException(id, e);
        } catch (Exception e) {
            throw new TechnicalException(e);
        }

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.info("Se está autenticando el usuario: " + username);

        return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

    }

}
