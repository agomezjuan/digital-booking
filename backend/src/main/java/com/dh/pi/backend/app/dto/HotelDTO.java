package com.dh.pi.backend.app.dto;

import lombok.Data;

@Data
public class HotelDTO {

    private Long id;

    private String name;

    private String description;

    private String image;

    private String phone;

    private String email;

    private AddressDTO address;
}
