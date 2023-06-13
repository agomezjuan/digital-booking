package com.dh.pi.backend.app.controller.advice;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class ErrorResponse {
    private HttpStatus code;
    private String message;
}