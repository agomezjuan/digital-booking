package com.dh.pi.backend.app.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResourceNotFoundException extends RuntimeException {

    private HttpStatus code;
    private String message;

    public ResourceNotFoundException(HttpStatus code, String message) {
        super(message);
        this.code = code;
        this.message = message;
    }

}
