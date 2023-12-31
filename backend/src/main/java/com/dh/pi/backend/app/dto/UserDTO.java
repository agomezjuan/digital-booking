package com.dh.pi.backend.app.dto;

import java.util.List;

import lombok.Data;

@Data
public class UserDTO {

    private Long id;
    private String name;
    private String lastname;
    private String email;
    private List<String> roles;

}
