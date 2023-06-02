package com.dh.pi.backend.app.controller;

// import org.hibernate.mapping.List;
// import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dh.pi.backend.app.dto.ReservationDTO;
import com.dh.pi.backend.app.service.IReservationService;

@RestController
@RequestMapping("/api/v1/users/reservations")
public class ReservationController {

    @Autowired
    private IReservationService reservationService;

    @PostMapping
    public ReservationDTO saveReservation(@RequestBody ReservationDTO reservationDTO) {
        return reservationService.createReservation(reservationDTO);
    }

    @GetMapping
    public java.util.List<ReservationDTO> getReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    public ReservationDTO getReservation(Long id) {
        return reservationService.getReservation(id);
    }

    @PutMapping("/{id}")
    public ReservationDTO updateReservation(ReservationDTO reservationDTO, Long id) {
        return reservationService.updateReservation(reservationDTO, id);
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(Long id) {
        reservationService.deleteReservation(id);
    }
}
