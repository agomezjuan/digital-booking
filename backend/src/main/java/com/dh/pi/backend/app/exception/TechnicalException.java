package com.dh.pi.backend.app.exception;

public class TechnicalException extends RuntimeException {

    public TechnicalException(Throwable cause) {
        super("A technical problem occured, please contact admin", cause);
    }

}
