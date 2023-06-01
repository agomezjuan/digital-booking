package com.dh.pi.backend.app.model.seeders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.dh.pi.backend.app.model.Role;
import com.dh.pi.backend.app.repository.IRoleRepository;

@Component
public class RoleSeeder implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private IRoleRepository roleRepository; // Repositorio correspondiente

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        // Se crean los roles
        Role roleAdmin = new Role("ADMIN");
        Role roleUser = new Role("USER");
        Role roleGuest = new Role("GUEST");

        // Se guardan los roles
        roleRepository.save(roleAdmin);
        roleRepository.save(roleUser);
        roleRepository.save(roleGuest);
    }
}
