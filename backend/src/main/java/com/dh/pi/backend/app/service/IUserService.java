package com.dh.pi.backend.app.service;

import jakarta.validation.Valid;
import java.util.List;

import com.dh.pi.backend.app.dto.RegisterRequestDTO;
import com.dh.pi.backend.app.dto.UserDTO;
import com.dh.pi.backend.app.model.User;

public interface IUserService {
    public UserDTO createUser(@Valid RegisterRequestDTO usuario);

    public List<UserDTO> getAllUsers();

    public UserDTO getUser(Long id);

    public UserDTO getUserByEmail(String email);

    public UserDTO updateUser(Long id, @Valid UserDTO usuarioDTO);

    public void deleteUser(Long id);

    public void createVerificationToken(User user, String token);

    public void validateVerificationToken(String token);

}
