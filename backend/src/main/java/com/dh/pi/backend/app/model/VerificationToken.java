package com.dh.pi.backend.app.model;

import java.util.Calendar;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Representa un token de verificación.
 * Este token se utiliza para verificar la cuenta de un usuario.
 * 
 * @autor A. Gómez Juan
 * @version 1.0
 */
@Getter
@Setter
@Entity
@NoArgsConstructor
public class VerificationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String token;
    private Date expiryDate;
    private final int EXPIRATION = 60 * 24;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public VerificationToken(User user, String token) {
        super();
        this.user = user;
        this.token = token;
        this.expiryDate = this.calculateExpiryDate();
    }

    public VerificationToken(String token) {
        super();
        this.token = token;
        this.expiryDate = this.calculateExpiryDate();
    }

    public Date calculateExpiryDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(new Date().getTime());
        calendar.add(Calendar.MINUTE, EXPIRATION);

        return new Date(calendar.getTime().getTime());
    }

}
