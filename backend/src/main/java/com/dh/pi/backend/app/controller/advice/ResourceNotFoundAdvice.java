package com.dh.pi.backend.app.controller.advice;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.dh.pi.backend.app.exception.ResourceNotFoundException;

@ControllerAdvice
public class ResourceNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    HashMap<String, Object> roleNotFoundHandler(ResourceNotFoundException ex) {
        HashMap<String, Object> response = new HashMap<>();
        response.put("error", ex.getMessage());
        return response;
    }
}