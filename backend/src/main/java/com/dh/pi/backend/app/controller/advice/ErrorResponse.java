package com.dh.pi.backend.app.controller.advice;

import lombok.Data;

@Data
public class ErrorResponse {
    private String errorCode;
    private String errorMessage;
}