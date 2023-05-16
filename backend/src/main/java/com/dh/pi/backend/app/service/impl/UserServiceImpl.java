package com.dh.pi.backend.app.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.dh.pi.backend.app.dto.UserDTO;
import com.dh.pi.backend.app.exception.TechnicalException;
import com.dh.pi.backend.app.exception.UserNotFoundException;
import com.dh.pi.backend.app.model.User;
import com.dh.pi.backend.app.repository.IUserRepository;
import com.dh.pi.backend.app.service.IUserService;

// import jakarta.validation.Valid;

/**
 * Usuario Service Implementation que accede a la capa de repositorio
 */
@Service
@Validated
public class UserServiceImpl implements IUserService {

    @Autowired
    private IUserRepository usuarioRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDTO createUser(UserDTO usuario) {
        User usuarioEntity = modelMapper.map(usuario, User.class);
        usuarioRepository.save(usuarioEntity);

        return modelMapper.map(usuarioEntity, UserDTO.class);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> usuarios = (List<User>) usuarioRepository.findAll();
        List<UserDTO> usuariosDTO = usuarios.stream().map(usuario -> modelMapper.map(usuario, UserDTO.class))
                .toList();

        return usuariosDTO;
    }

    @Override
    public UserDTO getUser(Long id) {
        User usuario = usuarioRepository.findById(id).orElse(null);
        UserDTO usuarioDTO = modelMapper.map(usuario, UserDTO.class);

        return usuarioDTO;
    }

    @Override
    public void deleteUser(Long id) throws UserNotFoundException, TechnicalException {
        try {
            usuarioRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new UserNotFoundException(id, e);
        } catch (Exception e) {
            throw new TechnicalException(e);
        }

    }

    // @Override
    // public UsuarioDTO getByEmail(String email) {
    // Usuario usuario = usuarioRepository.findByEmail(email);
    // UsuarioDTO usuarioDTO = modelMapper.map(usuario, UsuarioDTO.class);

    // return usuarioDTO;
    // }

    // @Override
    // public UsuarioDTO update(Long id, @Valid UsuarioDTO usuarioDTO) {
    // // TODO Auto-generated method stub
    // throw new UnsupportedOperationException("Unimplemented method 'update'");
    // }

    // @Override
    // public UsuarioDTO getByEmail(String email) {
    // // TODO Auto-generated method stub
    // throw new UnsupportedOperationException("Unimplemented method 'getByEmail'");
    // }

    // @Override
    // public UsuarioDTO signUp(UsuarioDTO usuarioDTO) {
    // // TODO Auto-generated method stub
    // throw new UnsupportedOperationException("Unimplemented method 'signUp'");
    // }

    // @Override
    // public UsuarioDTO signIn(String email, String password) {
    // // TODO Auto-generated method stub
    // throw new UnsupportedOperationException("Unimplemented method 'signIn'");
}
