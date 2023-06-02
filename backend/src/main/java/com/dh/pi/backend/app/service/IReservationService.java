package com.dh.pi.backend.app.service;

import java.util.List;

import com.dh.pi.backend.app.dto.ReservationDTO;

public interface IReservationService {
    public ReservationDTO createReservation(ReservationDTO reservationDTO);

    public List<ReservationDTO> getAllReservations();

    public ReservationDTO getReservation(Long id);

    public ReservationDTO updateReservation(ReservationDTO reservationDTO, Long id);

    public void deleteReservation(Long id);
}
