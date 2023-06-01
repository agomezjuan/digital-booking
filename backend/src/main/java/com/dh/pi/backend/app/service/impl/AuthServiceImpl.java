package com.dh.pi.backend.app.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dh.pi.backend.app.dto.UserDTO;
import com.dh.pi.backend.app.model.Role;
import com.dh.pi.backend.app.model.User;
import com.dh.pi.backend.app.repository.IRoleRepository;
import com.dh.pi.backend.app.repository.IUserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class AuthServiceImpl implements UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.info("Se está autenticando el usuario: " + username);

        return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

    }

    public User register(UserDTO user) {

        log.info("Se está registrando el usuario: " + user.getEmail());

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        Role userRole = roleRepository.findByName("USER").get();

        Set<Role> roles = new HashSet<>();

        roles.add(userRole);

        User newUser = new User();

        newUser.setName(user.getName());
        newUser.setLastname(user.getLastname());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(encodedPassword);
        newUser.setRoles(roles);

        return userRepository.save(newUser);

    }

}
