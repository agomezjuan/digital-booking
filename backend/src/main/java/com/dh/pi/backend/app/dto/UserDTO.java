package com.dh.pi.backend.app.dto;

import lombok.Data;

@Data
public class UserDTO {

    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private String role;

}
