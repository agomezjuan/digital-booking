package com.dh.pi.backend.app.controller;

import java.util.HashMap;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dh.pi.backend.app.dto.LoginRequestDTO;
import com.dh.pi.backend.app.dto.LoginResponseDTO;
import com.dh.pi.backend.app.dto.UserDTO;
import com.dh.pi.backend.app.event.RegistrationCompleteEvent;
import com.dh.pi.backend.app.model.Role;
import com.dh.pi.backend.app.model.User;
import com.dh.pi.backend.app.service.impl.AuthServiceImpl;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthServiceImpl authService;

    @Autowired
    ApplicationEventPublisher eventPublisher;

    @PostMapping("/register")
    public ResponseEntity<HashMap<String, Object>> registerUser(@RequestBody UserDTO user,
            final HttpServletRequest request) {

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

        eventPublisher.publishEvent(new RegistrationCompleteEvent(newUser, applicationUrl(request)));

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody LoginRequestDTO body) throws AuthenticationException {
        return authService.login(body.getEmail(), body.getPassword());
    }

    @GetMapping("/me")
    public ResponseEntity<HashMap<String, Object>> getCurrentUser(Authentication auth) {
        HashMap<String, Object> response = new HashMap<>();
        HashMap<String, Object> data = new HashMap<>();

        data.put("name", authService.getUserDetails(auth.getName()).getName());
        data.put("lastname", authService.getUserDetails(auth.getName()).getLastname());
        data.put("email", authService.getUserDetails(auth.getName()).getEmail());

        response.put("message", "Usuario logueado correctamente");
        response.put("user", data);

        return ResponseEntity.ok(response);
    }

    private String applicationUrl(HttpServletRequest request) {
        return request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
                + request.getContextPath();
    }

    @GetMapping("/verify")
    public ResponseEntity<HashMap<String, Object>> confirmRegistration(@RequestParam("token") String token) {
        String confirmationResult = authService.confirmRegistration(token);

        HashMap<String, Object> response = new HashMap<>();

        response.put("message", confirmationResult);

        return ResponseEntity.ok(response);
    }
}
