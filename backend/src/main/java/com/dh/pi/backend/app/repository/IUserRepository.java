package com.dh.pi.backend.app.repository;

import java.util.Optional;

// import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dh.pi.backend.app.model.User;

/**
 * Representa un repositorio de usuarios.
 * 
 * @author A. Gómez Juan
 * @version 1.0
 */
@Repository
public interface IUserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);

    // List<Usuario> findByRole(Role role);

    // Usuario signUp(Usuario usuario);

    // Usuario signIn(String email, String password);
}
