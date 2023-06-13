package com.dh.pi.backend.app.controller.advice;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.dh.pi.backend.app.exception.ExistingResourceException;

@ControllerAdvice
public class ExistingResourceErrorAdvice {

    @ResponseBody
    @ExceptionHandler(ExistingResourceException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    HashMap<String, Object> existingResourceHandler(ExistingResourceException ex) {
        HashMap<String, Object> response = new HashMap<>();
        response.put("error", ex.getMessage());
        return response;
    }
}
