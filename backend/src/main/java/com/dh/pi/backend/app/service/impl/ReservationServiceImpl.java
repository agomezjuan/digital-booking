package com.dh.pi.backend.app.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dh.pi.backend.app.dto.ReservationDTO;
import com.dh.pi.backend.app.model.Reservation;
import com.dh.pi.backend.app.repository.IReservationRepository;
import com.dh.pi.backend.app.service.IReservationService;

@Service
public class ReservationServiceImpl implements IReservationService {

    @Autowired
    private IReservationRepository reservationRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ReservationDTO createReservation(ReservationDTO reservationDTO) {
        Reservation reservationEntity = modelMapper.map(reservationDTO, Reservation.class);

        reservationEntity = reservationRepository.save(reservationEntity);

        return modelMapper.map(reservationEntity, ReservationDTO.class);
    }

    @Override
    public List<ReservationDTO> getAllReservations() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllReservations'");
    }

    @Override
    public ReservationDTO getReservation(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getReservation'");
    }

    @Override
    public ReservationDTO updateReservation(ReservationDTO reservationDTO, Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateReservation'");
    }

    @Override
    public void deleteReservation(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteReservation'");
    }

}
