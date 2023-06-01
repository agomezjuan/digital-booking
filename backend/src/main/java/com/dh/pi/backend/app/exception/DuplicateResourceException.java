package com.dh.pi.backend.app.exception;

public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(Long id, Throwable cause) {
        super("User with id=" + id + " not found", cause);
    }

    public DuplicateResourceException(String message) {
        super(message);
    }

}
