package com.dh.pi.backend.app.repository;

import org.springframework.data.repository.CrudRepository;

import com.dh.pi.backend.app.model.Reservation;

public interface IReservationRepository extends CrudRepository<Reservation, Long> {

}
