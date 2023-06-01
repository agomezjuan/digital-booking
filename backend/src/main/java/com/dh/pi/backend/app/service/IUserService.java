package com.dh.pi.backend.app.service;

import jakarta.validation.Valid;
import java.util.List;

import com.dh.pi.backend.app.dto.UserDTO;

public interface IUserService {
    public UserDTO createUser(@Valid UserDTO usuarioDTO);

    public List<UserDTO> getAllUsers();

    public UserDTO getUser(Long id);

    public UserDTO getUserByEmail(String email);

    public UserDTO updateUser(Long id, @Valid UserDTO usuarioDTO);

    public void deleteUser(Long id);

}
