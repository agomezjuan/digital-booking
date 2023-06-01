package com.dh.pi.backend.app.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDTO {

    private String name;
    private String lastname;
    private String email;
    private String password;
    private List<String> roles;

}
