package com.dh.pi.backend.app.model.seeders;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.dh.pi.backend.app.model.Role;
import com.dh.pi.backend.app.repository.IRoleRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * Seeder para crear los roles
 * 
 * @version 1.0
 * @since 1.0
 * @see ApplicationListener
 */
@Slf4j
@Component
public class RoleSeeder implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private IRoleRepository roleRepository; // Repositorio correspondiente

    /**
     * Método que se ejecuta al iniciar la aplicación
     * 
     * @param event Evento de inicio de la aplicación
     * @see ContextRefreshedEvent
     */
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        if (roleRepository.findAll().isEmpty()) {
            createRoles();
        }
    }

    /**
     * Método que crea los roles
     * 
     * @see Role
     */
    private void createRoles() {

        // Se guardan los roles
        roleRepository.saveAll(List.of(
                new Role("ADMIN"),
                new Role("USER"),
                new Role("GUEST")));

        // Se muestra un mensaje en consola
        log.info("Se han creado los roles 'ADMIN', 'USER' y 'GUEST'");
    }
}
