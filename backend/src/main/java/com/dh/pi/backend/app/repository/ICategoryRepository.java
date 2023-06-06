package com.dh.pi.backend.app.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.dh.pi.backend.app.model.Category;

/**
 * Representa un repositorio de categorias.
 * 
 * @autor A. Gómez Juan
 * @version 1.0
 */
public interface ICategoryRepository extends CrudRepository<Category, Long> {

    public List<Category> findAll();

    public Category findByName(String name);
}
