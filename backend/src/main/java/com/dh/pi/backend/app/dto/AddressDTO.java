package com.dh.pi.backend.app.dto;

import lombok.Data;

@Data
public class AddressDTO {

    private Long id;

    private String street;

    private String number;

    private String city;

    private String country;

    private String postalCode;
}
