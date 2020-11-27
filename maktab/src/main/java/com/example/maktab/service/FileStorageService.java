package com.example.maktab.service;

import com.example.maktab.entity.FileStorage;
import com.example.maktab.entity.enums.FileStatus;
import com.example.maktab.repository.FileStorageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    @Autowired
    FileStorageRepository fileStorageRepository;

    @Value("${upload.folder}")
    private String uploadFolder;

    public UUID saveFile(MultipartFile multipartFile) {
        if (!multipartFile.isEmpty()) {
            FileStorage fileStorage = new FileStorage();
            fileStorage.setName(multipartFile.getOriginalFilename());
            fileStorage.setExtension(getExt(multipartFile.getOriginalFilename()));
            fileStorage.setFileSize(multipartFile.getSize());
            fileStorage.setContentType(multipartFile.getContentType());
            fileStorage.setFileStatus(FileStatus.REJECTED);
            fileStorageRepository.save(fileStorage);
            Date data = new Date();
            File uploadFolders = new File(String.format("%s/upload_files/%d/%d/%d/", this.uploadFolder,
                    1900 + data.getYear(), 1 + data.getMonth(), data.getDate()));
            if (!uploadFolders.exists() && uploadFolders.mkdirs()) {
                System.out.println("aytilgan papka ochildi");
            }
            fileStorage.setUploadPath(String.format("upload_files/%d/%d/%d/%s.%s", 1900 + data.getYear(), 1 + data.getMonth(), data.getDate(),
                    fileStorage.getId(), fileStorage.getExtension()));
            fileStorageRepository.save(fileStorage);
            uploadFolders = uploadFolders.getAbsoluteFile();
            File file = new File(uploadFolders, String.format("%s.%s", fileStorage.getId(), fileStorage.getExtension()));
            try {
                multipartFile.transferTo(file);
            } catch (IOException e) {
                e.printStackTrace();
            }
            return fileStorage.getId();
        } else {
            return null;
        }
    }

    public void delete(UUID id) {
        FileStorage fileStorage = fileStorageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getFileStorage"));
        File file = new File(String.format("%s/%s", this.uploadFolder, fileStorage.getUploadPath()));
        if (file.delete()) {
            fileStorageRepository.delete(fileStorage);
        }
    }

    private String getExt(String fileName) {
        String ext = null;
        if (fileName != null && !fileName.isEmpty()) {
            int dot = fileName.lastIndexOf(".");
            if (dot > 0 && dot <= fileName.length() - 2) {
                ext = fileName.substring(dot);
            }
        }
        return ext;
    }

    public void deleteREJECTED(){
        List<FileStorage> allByFileStatus = fileStorageRepository.findAllByFileStatus(FileStatus.REJECTED);
        for (FileStorage byFileStatus : allByFileStatus) {
            File file = new File(String.format("%s/%s", this.uploadFolder, byFileStatus.getUploadPath()));
            if (file.delete()) {
                fileStorageRepository.delete(byFileStatus);
            }
        }
    }
}
