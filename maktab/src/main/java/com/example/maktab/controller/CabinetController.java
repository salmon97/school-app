package com.example.maktab.controller;

import com.example.maktab.repository.GroupRepository;
import com.example.maktab.repository.StudentRepository;
import com.example.maktab.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cabinet")
public class CabinetController {

    @Autowired
    GroupRepository groupRepository;
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    TeacherRepository teacherRepository;
    @GetMapping("/counts")
    public HttpEntity<?> counts(){
        int[] counts = {groupRepository.countGroup(),studentRepository.countStudent(),teacherRepository.countTeacher()};
     return ResponseEntity.ok(counts);
    }
}
