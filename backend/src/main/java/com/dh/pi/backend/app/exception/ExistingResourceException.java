package com.dh.pi.backend.app.exception;

public class ExistingResourceException extends RuntimeException {

    public ExistingResourceException(Long id, Throwable cause) {
        super("User with id=" + id + " not found", cause);
    }

    public ExistingResourceException(String message) {
        super(message);
    }

}
