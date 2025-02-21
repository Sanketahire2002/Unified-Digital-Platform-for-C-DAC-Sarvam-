package com.cdac.sarvam.repository;

import org.springframework.stereotype.Repository;

@Repository
public interface AWSFileRepository {
    void uploadFile(String fileName, byte[] fileData);
    byte[] downloadFile(String fileName);
    void deleteFile(String fileName);
    String[] listFiles();
}
