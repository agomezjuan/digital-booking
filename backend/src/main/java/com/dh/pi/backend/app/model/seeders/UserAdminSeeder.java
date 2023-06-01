package com.dh.pi.backend.app.model.seeders;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.dh.pi.backend.app.model.Role;
import com.dh.pi.backend.app.model.User;
import com.dh.pi.backend.app.repository.IRoleRepository;
import com.dh.pi.backend.app.repository.IUserRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * Seeder para crear el usuario admin
 * 
 * @version 1.0
 * @since 1.0
 * @see ApplicationListener
 */
@Slf4j
@Component
public class UserAdminSeeder implements ApplicationListener<ContextRefreshedEvent> {

        @Autowired
        private IUserRepository userRepository; // Repositorio de usuarios

        @Autowired
        private IRoleRepository roleRepository; // Repositorio de roles

        @Autowired
        private PasswordEncoder passwordEncoder; // Codificador de contraseñas

        /**
         * Método que se ejecuta al iniciar la aplicación
         * 
         * @param event Evento de inicio de la aplicación
         * @see ContextRefreshedEvent
         */
        @Override
        public void onApplicationEvent(ContextRefreshedEvent event) {
                // Si no existe el usuario admin se crea
                if (!userRepository.findByEmail("admin@test.com").isPresent()) {
                        createUserAdmin();
                }
        }

        /**
         * Método que crea el usuario admin
         * 
         * @see User
         */
        private void createUserAdmin() {
                // Se crea el usuario admin
                User userAdmin = new User();

                Role roleAdmin = roleRepository.findByAuthority("ADMIN").get();

                if (roleAdmin == null) {
                        roleAdmin = new Role("ADMIN");
                        roleRepository.save(roleAdmin);
                }

                userAdmin.setName("admin");
                userAdmin.setLastname("admin");
                userAdmin.setEmail("admin@test.com");
                userAdmin.setPassword(passwordEncoder.encode("admin"));

                Set<Role> roles = new HashSet<>();
                roles.add(roleAdmin);

                userAdmin.setRoles(roles);

                // Se guarda el usuario admin
                userRepository.save(userAdmin);

                // Se muestra un mensaje por consola
                log.info("Se ha creado el usuario 'admin' con contraseña 'admin'");
        }
}