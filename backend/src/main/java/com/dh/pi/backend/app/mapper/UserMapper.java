package com.dh.pi.backend.app.mapper;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.dh.pi.backend.app.model.User;
import com.dh.pi.backend.app.dto.RegisterRequestDTO;
import com.dh.pi.backend.app.dto.UserDTO;
import com.dh.pi.backend.app.model.Role;

@Component
public class UserMapper {

    private final ModelMapper modelMapper;

    public UserMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public UserDTO mapToUserDTO(User user) {
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        userDTO.setRoles(mapRolesToRoleNames(user.getRoles()));
        return userDTO;
    }

    public UserDTO mapToUserDTO(RegisterRequestDTO user) {
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        return userDTO;
    }

    public User mapToUser(UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);

        user.setRoles(mapRoleNamesToRoles(userDTO.getRoles()));
        return user;
    }

    public User mapToUser(RegisterRequestDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);

        user.setRoles(mapRoleNamesToRoles(userDTO.getRoles()));
        return user;
    }

    private Set<Role> mapRoleNamesToRoles(List<String> roles) {
        return roles.stream()
                .map(role -> new Role(role))
                .collect(Collectors.toSet());
    }

    private List<String> mapRolesToRoleNames(Set<Role> roles) {
        return roles.stream()
                .map(Role::getAuthority)
                .collect(Collectors.toList());
    }

}
