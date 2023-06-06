package com.dh.pi.backend.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dh.pi.backend.app.dto.CategoryDTO;
import com.dh.pi.backend.app.service.IAwsS3Service;
import com.dh.pi.backend.app.service.ICategoryService;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

    @Autowired
    private ICategoryService categoryService;

    @Autowired
    private IAwsS3Service awsS3Service;

    @PostMapping
    public void saveCategory(@RequestBody CategoryDTO categoryDTO, @RequestPart(value = "file") MultipartFile file) {
        String imageUrl = awsS3Service.uploadFile(file);
        categoryDTO.setImageUrl(imageUrl);
        categoryService.createCategory(categoryDTO);
    }

    @PostMapping("/image")
    public String uploadImage(@RequestPart(value = "file") MultipartFile file) {
        return awsS3Service.uploadFile(file);
    }

    @GetMapping
    public List<CategoryDTO> getCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public CategoryDTO getCategory(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    @PutMapping("/{id}")
    public CategoryDTO updateCategory(@RequestBody CategoryDTO categoryDTO, @PathVariable Long id) {
        return categoryService.updateCategory(categoryDTO, id);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }
}
