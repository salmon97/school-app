package com.example.maktab.controller;

import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqPost;
import com.example.maktab.service.PosterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/poster")
public class PostController {


    @Autowired
    PosterService posterService;


    @PostMapping
    public HttpEntity<?> saveEdit(@RequestBody ReqPost reqPost) {
        if (reqPost.getId() != null) {
            ApiResponse apiResponse = posterService.editPost(reqPost);
            return ResponseEntity.ok(apiResponse);
        } else {
            ApiResponse apiResponse = posterService.savePost(reqPost);
            return ResponseEntity.ok(apiResponse);
        }
    }

    @DeleteMapping("/delete/{id}")
    public HttpEntity<?> delete(@PathVariable UUID id) {
        ApiResponse apiResponse = posterService.deletePost(id);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping
    public HttpEntity<?> getPost(@RequestParam(value = "page", defaultValue = "0") int page,
                                 @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok(posterService.resPageable(page, size));
    }

}
