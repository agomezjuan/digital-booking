package com.dh.pi.backend.app.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.dh.pi.backend.app.service.IAwsS3Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AwsS3ServiceImpl implements IAwsS3Service {

    @Autowired
    private AmazonS3 s3Client;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    @Override
    public String uploadFile(MultipartFile file) {
        File fileObj = new File(file.getOriginalFilename());

        try (FileOutputStream stream = new FileOutputStream(fileObj)) {
            stream.write(file.getBytes());
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, file.getOriginalFilename(), fileObj);
            putObjectRequest.setCannedAcl(CannedAccessControlList.PublicRead);
            s3Client.putObject(putObjectRequest);
            fileObj.delete();

        } catch (IOException e) {
            log.error("Hubo un error cargando el archivo a S3", e.getMessage());
        }

        String fileUrl = "https://" + bucketName + ".s3.amazonaws.com/" + file.getOriginalFilename();
        return fileUrl;
    }

    @Override
    public void deleteFile(String fileName) {
        s3Client.deleteObject(bucketName, fileName);
    }

}
