package com.example.maktab.controller;


import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqRegister;
import com.example.maktab.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    TeacherService teacherService;

    @GetMapping("/get")
    public HttpEntity<?> resTeachers() {
        return ResponseEntity.ok(teacherService.resTeachers());
    }

    @PutMapping("/edit")
    public HttpEntity<?> edit(@RequestBody ReqRegister reqRegister) {
        ApiResponse apiResponse = teacherService.editTeacher(reqRegister);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST).body(apiResponse);
    }

    @DeleteMapping("/delete/{id}")
    public HttpEntity<?> deleteStudent(@PathVariable UUID id) {
        return ResponseEntity.ok(teacherService.deleteTeacher(id));
    }
}