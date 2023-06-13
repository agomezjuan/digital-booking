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

import com.dh.pi.backend.app.dto.RegisterRequestDTO;
import com.dh.pi.backend.app.dto.UserDTO;
import com.dh.pi.backend.app.service.IUserService;

/**
 * Controlador para el manejo de usuarios
 * 
 * @version 1.0.0
 */
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private IUserService usuarioService;

    /**
     * Endpoint para crear un usuario
     * 
     * @param usuarioDTO
     * @return usuario creado
     */
    @PostMapping
    public UserDTO saveUsuario(@RequestBody RegisterRequestDTO usuario) {
        return usuarioService.createUser(usuario);
    }

    /**
     * Endpoint para obtener la lista de usuarios
     * 
     * @return lista de usuarios
     */
    @GetMapping
    public List<UserDTO> getUsuarios() {
        return usuarioService.getAllUsers();
    }

    /**
     * Endpoint para obtener un usuario por su id
     * 
     * @param id
     * @return usuario
     */
    @GetMapping("/{id}")
    public UserDTO getUsuario(@PathVariable Long id) {
        return usuarioService.getUser(id);
    }

    /**
     * Endpoint para modificar un usuario
     * 
     * @param usuarioDTO
     * @return usuario modificado
     */
    @PutMapping("/{id}")
    public UserDTO updateUsuario(@RequestBody UserDTO usuarioDTO, @PathVariable Long id) {
        return usuarioService.updateUser(id, usuarioDTO);
    }

    /**
     * Endpoint para eliminar un usuario
     * 
     * @param id
     */
    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioService.deleteUser(id);
    }

}
