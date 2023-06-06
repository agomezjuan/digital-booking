package com.dh.pi.backend.app.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.dh.pi.backend.app.model.Address;

/**
 * Representa un repositorio de direcciones.
 * 
 * @autor A. Gómez Juan
 * @version 1.0
 */
public interface IAddressRepository extends CrudRepository<Address, Long> {

    public List<Address> findAll();

}
