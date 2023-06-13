package com.dh.pi.backend.app.repository;

import org.springframework.data.repository.CrudRepository;

import com.dh.pi.backend.app.model.Reservation;

/**
 * Representa un repositorio de reservas.
 * 
 * @autor A. Gómez Juan
 * @version 1.0
 */
public interface IReservationRepository extends CrudRepository<Reservation, Long> {

}
