package com.dh.pi.backend.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dh.pi.backend.app.dto.LoginRequestDTO;
import com.dh.pi.backend.app.dto.LoginResponseDTO;
import com.dh.pi.backend.app.dto.UserDTO;
import com.dh.pi.backend.app.model.User;
import com.dh.pi.backend.app.service.impl.AuthServiceImpl;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthServiceImpl authService;

    @PostMapping("/register")
    public User registerUser(@RequestBody UserDTO user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody LoginRequestDTO body) throws AuthenticationException {
        return authService.login(body.getEmail(), body.getPassword());
    }
}
