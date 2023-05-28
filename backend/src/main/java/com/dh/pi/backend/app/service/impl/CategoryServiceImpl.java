package com.dh.pi.backend.app.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dh.pi.backend.app.dto.CategoryDTO;
import com.dh.pi.backend.app.model.Category;
import com.dh.pi.backend.app.repository.ICategoryRepository;
import com.dh.pi.backend.app.service.ICategoryService;

@Service
public class CategoryServiceImpl implements ICategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category categoryEntity = modelMapper.map(categoryDTO, Category.class);

        categoryEntity = categoryRepository.save(categoryEntity);

        return modelMapper.map(categoryEntity, CategoryDTO.class);
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        List<Category> categoryEntity = categoryRepository.findAll();
        List<CategoryDTO> categoriesDTO = categoryEntity.stream()
                .map(category -> modelMapper.map(category, CategoryDTO.class)).toList();

        return categoriesDTO;
    }

    @Override
    public CategoryDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id).get();
        CategoryDTO categoryDTO = modelMapper.map(category, CategoryDTO.class);

        return categoryDTO;
    }

    @Override
    public CategoryDTO updateCategory(CategoryDTO categoryDTO, Long id) {
        Category categoryEntity = modelMapper.map(categoryDTO, Category.class);

        categoryEntity = categoryRepository.save(categoryEntity);

        return modelMapper.map(categoryEntity, CategoryDTO.class);

    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

}
