package com.example.maktab.service;

import com.example.maktab.entity.Poster;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqPost;
import com.example.maktab.payload.ResPageable;
import com.example.maktab.payload.ResPost;
import com.example.maktab.repository.PosterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PosterService {

    @Autowired
    PosterRepository posterRepository;


    public ApiResponse savePost(ReqPost reqPost) {
        Poster poster = new Poster();
        poster.setTitle(reqPost.getTitle());
        poster.setText(reqPost.getText());
        posterRepository.save(poster);
        return new ApiResponse("ok", true);
    }

    public ApiResponse editPost(ReqPost reqPost) {
        Poster poster = posterRepository.findById(reqPost.getId()).orElseThrow(() -> new ResourceNotFoundException("getPost"));
        poster.setTitle(reqPost.getTitle());
        poster.setText(reqPost.getText());
        posterRepository.save(poster);
        return new ApiResponse("ok", true);
    }

    public ApiResponse deletePost(UUID id) {
        posterRepository.deleteById(id);
        return new ApiResponse("ok", true);
    }

    public ResPageable resPageable(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Poster> all = posterRepository.findAll(pageable);
        return new ResPageable(
                page,
                size,
                all.getTotalElements(),
                all.getTotalPages(),
                all.getContent().stream().map(poster -> new ResPost(poster.getId(), poster.getTitle(), poster.getText(), poster.getCreatedAt().toString().substring(0, 10))).collect(Collectors.toList())
        );
    }
}
