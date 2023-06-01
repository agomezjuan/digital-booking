package com.dh.pi.backend.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dh.pi.backend.app.model.Role;

/**
 * Representa un repositorio de usuarios.
 * 
 * @author A. Gómez Juan
 * @version 1.0
 */
@Repository
public interface IRoleRepository extends CrudRepository<Role, Long> {
    Optional<Role> findById(Long id);

    Optional<Role> findByAuthority(String authority);

    @Cacheable(value = "roles")
    List<Role> findAll();
}
