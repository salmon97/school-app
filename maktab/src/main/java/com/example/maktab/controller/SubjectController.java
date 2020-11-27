package com.example.maktab.controller;

import com.example.maktab.entity.*;
import com.example.maktab.entity.enums.RoleName;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqSubject;
import com.example.maktab.repository.ParentRepository;
import com.example.maktab.repository.StudentRepository;
import com.example.maktab.repository.SubjectRepository;
import com.example.maktab.security.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subject")
public class SubjectController {

    @Autowired
    SubjectRepository subjectRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    ParentRepository parentRepository;

    @PostMapping("/addEdit")
    public HttpEntity<?> addSubject(@RequestBody ReqSubject reqSubject) {
        if (reqSubject.getId() != null) {
            Subject getSubject = subjectRepository.findById(reqSubject.getId()).orElseThrow(() -> new ResourceNotFoundException("getSubject"));
            getSubject.setNameUz(reqSubject.getNameUz());
            getSubject.setNameRu(reqSubject.getNameRu());
            getSubject.setNameEng(reqSubject.getNameEng());
            subjectRepository.save(getSubject);
        } else {
            Subject subject = new Subject();
            subject.setNameUz(reqSubject.getNameUz());
            subject.setNameRu(reqSubject.getNameRu());
            subject.setNameEng(reqSubject.getNameEng());
            subjectRepository.save(subject);
        }
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/get")
    public HttpEntity<?> getAllSubjects() {
        List<Subject> allByEduCenter_id = subjectRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        return ResponseEntity.ok(new ApiResponse("listSubject", true, allByEduCenter_id));
    }


    @DeleteMapping("/delete/{id}")
    public HttpEntity<?> deleteSubject(@PathVariable Long id) {
        subjectRepository.deleteById(id);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/getGroup")
    public HttpEntity<?> getAllByGroupId(@CurrentUser User user) {
        Student student = studentRepository.findByUser_Id(user.getId());;
        for (Role role : user.getRoles()) {
            if (role.getRoleName().equals(RoleName.ROLE_PARENT)) {
               student = parentRepository.findByUser_Id(user.getId()).getStudent();
               break;
            }
        }
        List<Subject> byGroup = subjectRepository.getAllByGroup(student.getGroup().getId());
        return ResponseEntity.ok(new ApiResponse("listSubject", true, byGroup));
    }

}
