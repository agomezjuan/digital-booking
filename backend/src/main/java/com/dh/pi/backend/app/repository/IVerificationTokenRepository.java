package com.dh.pi.backend.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dh.pi.backend.app.model.VerificationToken;

/**
 * Repositorio de tokens de verificación
 * 
 * @author A. Gómez Juan
 * @version 1.0
 */
public interface IVerificationTokenRepository extends JpaRepository<VerificationToken, Long> {

    Optional<VerificationToken> findByToken(String token);
}
