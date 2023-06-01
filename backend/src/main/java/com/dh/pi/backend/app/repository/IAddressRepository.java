package com.dh.pi.backend.app.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.dh.pi.backend.app.model.Address;

public interface IAddressRepository extends CrudRepository<Address, Long> {

    public List<Address> findAll();

}
