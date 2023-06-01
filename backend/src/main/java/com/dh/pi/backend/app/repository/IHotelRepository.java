package com.dh.pi.backend.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.CrudRepository;

import com.dh.pi.backend.app.model.Hotel;

public interface IHotelRepository extends CrudRepository<Hotel, Long> {
    Optional<Hotel> findById(Long id);

    Hotel findByName(String name);

    @Cacheable(value = "hotels")
    List<Hotel> findAll();
}
