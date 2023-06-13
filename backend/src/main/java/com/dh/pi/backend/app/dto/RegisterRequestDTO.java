package com.dh.pi.backend.app.dto;

import java.util.List;

import lombok.Data;

@Data
public class RegisterRequestDTO {

    private Long id;
    private String name;
    private String lastname;
    private String email;
    private String password;
    private List<String> roles;

}
