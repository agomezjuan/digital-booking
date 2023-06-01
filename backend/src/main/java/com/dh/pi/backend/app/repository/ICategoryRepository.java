package com.dh.pi.backend.app.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dh.pi.backend.app.model.Category;

@Repository
public interface ICategoryRepository extends CrudRepository<Category, Long> {

    public List<Category> findAll();

    public Category findByName(String name);
}
