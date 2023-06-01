// package com.dh.pi.backend.app.controller.advice;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.ExceptionHandler;
// import org.springframework.web.bind.annotation.RestControllerAdvice;

// import com.dh.pi.backend.app.exception.DuplicateResourceException;

// @RestControllerAdvice
// public class RestExceptionHandler {

// @ExceptionHandler(DuplicateResourceException.class)
// public ResponseEntity<ErrorResponse>
// handleCustomException(DuplicateResourceException ex) {
// // Obtén el código de error y mensaje del diccionario de errores
// String errorCode = ex.getErrorCode();
// String errorMessage = ErrorDictionary.getErrorMessage(errorCode);

// // Crea la respuesta de error
// ErrorResponse errorResponse = new ErrorResponse();
// errorResponse.setErrorCode(errorCode);
// errorResponse.setErrorMessage(errorMessage);

// // Devuelve la respuesta con el código de estado correspondiente
// return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
// }

// // Otros métodos de manejo de excepciones

// // ...
// }