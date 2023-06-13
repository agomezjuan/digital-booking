package com.dh.pi.backend.app.service;

import org.springframework.web.multipart.MultipartFile;

public interface IAwsS3Service {
    public String uploadFile(MultipartFile file);

    public void deleteFile(String fileName);
}
