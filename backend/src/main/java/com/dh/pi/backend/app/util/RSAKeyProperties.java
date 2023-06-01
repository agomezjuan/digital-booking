package com.dh.pi.backend.app.util;

import java.security.KeyPair;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
public class RSAKeyProperties {

    @Getter
    @Setter
    private RSAPublicKey publicKey;

    @Getter
    @Setter
    private RSAPrivateKey privateKey;

    public RSAKeyProperties() {
        KeyPair pair = KeyGeneratorUtility.generateRsaKeys();
        this.publicKey = (RSAPublicKey) pair.getPublic();
        this.privateKey = (RSAPrivateKey) pair.getPrivate();
    }
}
