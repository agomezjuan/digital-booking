package com.dh.pi.backend.app.controller;

import java.util.HashMap;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dh.pi.backend.app.dto.LoginRequestDTO;
import com.dh.pi.backend.app.dto.LoginResponseDTO;
import com.dh.pi.backend.app.dto.UserDTO;
import com.dh.pi.backend.app.model.Role;
import com.dh.pi.backend.app.model.User;
import com.dh.pi.backend.app.service.impl.AuthServiceImpl;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthServiceImpl authService;

    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:5173/register")
    public ResponseEntity<HashMap<String, Object>> registerUser(@RequestBody UserDTO user) {

        User newUser = authService.register(user);

        Set<Role> roles = newUser.getRoles();

        String role = roles.iterator().next().getAuthority();

        HashMap<String, Object> data = new HashMap<>();
        data.put("name", user.getName());
        data.put("lastname", user.getLastname());
        data.put("email", user.getEmail());
        data.put("role", role);

        HashMap<String, Object> response = new HashMap<>();
        response.put("message", "Usuario registrado correctamente");
        response.put("data", data);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:5173/login")
    public LoginResponseDTO loginUser(@RequestBody LoginRequestDTO body) throws AuthenticationException {
        return authService.login(body.getEmail(), body.getPassword());
    }

    @GetMapping("/me")
    public ResponseEntity<HashMap<String, Object>> getUCurrentUsers(Authentication auth) {
        HashMap<String, Object> response = new HashMap<>();
        HashMap<String, Object> data = new HashMap<>();

        data.put("name", authService.getUserDetails(auth.getName()).getName());
        data.put("lastname", authService.getUserDetails(auth.getName()).getLastname());
        data.put("email", authService.getUserDetails(auth.getName()).getEmail());

        response.put("message", "Usuario logueado correctamente");
        response.put("user", data);

        return ResponseEntity.ok(response);
    }
}
