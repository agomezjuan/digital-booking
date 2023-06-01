package com.dh.pi.backend.app.dto;

import lombok.Data;

@Data
public class ReservationDTO {

    private Long id;

    private String start_date;

    private String end_date;

    private Integer guests;

    private Double total;

    private String payment_method;

    private String status;

    private Long user_id;

    private Long hotel_id;
}
