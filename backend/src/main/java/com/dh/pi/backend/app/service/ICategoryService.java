package com.dh.pi.backend.app.service;

import java.util.List;

import com.dh.pi.backend.app.dto.CategoryDTO;

import jakarta.validation.Valid;

public interface ICategoryService {
    public CategoryDTO createCategory(@Valid CategoryDTO categoryDTO);

    public List<CategoryDTO> getAllCategories();

    public CategoryDTO getCategoryById(Long id);

    public CategoryDTO updateCategory(@Valid CategoryDTO categoryDTO, Long id);

    public void deleteCategory(Long id);
}
