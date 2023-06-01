package com.dh.pi.backend.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dh.pi.backend.app.dto.UserDTO;
import com.dh.pi.backend.app.service.impl.UserServiceImpl;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserServiceImpl usuarioService;

    @GetMapping
    public List<UserDTO> getUsuarios() {
        return usuarioService.getAllUsers();
    }

    @PostMapping
    public UserDTO saveUsuario(@RequestBody UserDTO usuarioDTO) {
        return usuarioService.createUser(usuarioDTO);
    }

    @PutMapping
    public UserDTO updateUsuario(UserDTO usuarioDTO) {
        return usuarioService.createUser(usuarioDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioService.deleteUser(id);
    }

}
