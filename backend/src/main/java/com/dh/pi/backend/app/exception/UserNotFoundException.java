package com.dh.pi.backend.app.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(Long id, Throwable cause) {
        super("User with id=" + id + " not found", cause);
    }

    public UserNotFoundException(String message) {
        super(message);
    }

}
