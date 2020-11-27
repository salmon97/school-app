package com.example.maktab.controller;

import com.example.maktab.entity.FileStorage;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.repository.FileStorageRepository;
import com.example.maktab.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileUrlResource;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.UUID;

@RestController
@RequestMapping("/api/file")
public class FileStorageControl {

    @Value("${upload.folder}")
    private String uploadFolder;

    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    FileStorageRepository fileStorageRepository;

    @PostMapping("/upload")
    public HttpEntity<?> upload(@RequestParam("file") MultipartFile multipartFile) {
        UUID uuid = fileStorageService.saveFile(multipartFile);
        return ResponseEntity.ok(new ApiResponse(uuid.toString(), true));
    }


    @GetMapping("/getFile/{id}")
    public HttpEntity<?> getFile(@PathVariable UUID id) throws IOException {
        FileStorage fileStorage = fileStorageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getFile"));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; FileName=\"" + URLEncoder.encode(fileStorage.getName()))
                .contentType(MediaType.parseMediaType(fileStorage.getContentType()))
                .contentLength(fileStorage.getFileSize())
                .body(new FileUrlResource(String.format("%s/%s", uploadFolder, fileStorage.getUploadPath())));
    }
}
