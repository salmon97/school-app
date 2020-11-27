package com.example.maktab.controller;

import com.example.maktab.entity.Parent;
import com.example.maktab.entity.User;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqRateTeacher;
import com.example.maktab.payload.ResPageable;
import com.example.maktab.repository.ParentRepository;
import com.example.maktab.security.CurrentUser;
import com.example.maktab.service.RatesTeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/rateTeacher")
public class RatesTeacherController {

    @Autowired
    RatesTeacherService ratesTeacherService;

    @Autowired
    ParentRepository parentRepository;

    @PostMapping
    public HttpEntity<?> rateTeacher(@RequestBody ReqRateTeacher reqRateTeacher, @CurrentUser User user) {
        Parent parent = parentRepository.findByUser_Id(user.getId());
        ApiResponse apiResponse = ratesTeacherService.ratesTeacher(reqRateTeacher, parent);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/get/{teacherId}")
    public HttpEntity<?> getRate(@PathVariable UUID teacherId, @RequestParam(value = "page", defaultValue = "0") int page,
                                 @RequestParam(value = "size", defaultValue = "10") int size) {
        ResPageable resPageable = ratesTeacherService.resPageable(page, size, teacherId);
        return ResponseEntity.ok(resPageable);
    }
}