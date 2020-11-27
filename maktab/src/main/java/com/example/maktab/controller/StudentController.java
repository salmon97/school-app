package com.example.maktab.controller;

import com.example.maktab.entity.Role;
import com.example.maktab.entity.User;
import com.example.maktab.entity.enums.RoleName;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqStudent;
import com.example.maktab.security.CurrentUser;
import com.example.maktab.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    StudentService studentService;


    @PostMapping("/savePhoto")
    public HttpEntity<?> savePhoto(@RequestParam(value = "fileId") UUID fileId, @CurrentUser User user) {
        ApiResponse apiResponse = studentService.savePhoto(fileId, user);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/getTeacher")
    public HttpEntity<?> getStudentTeacherAndSubject(@CurrentUser User user) {
        for (Role role : user.getRoles()) {
            if (role.getRoleName().equals(RoleName.ROLE_STUDENT)) {
                ApiResponse apiResponse = studentService.studentTeacher(user);
                return ResponseEntity.ok(apiResponse);
            } else {
                ApiResponse apiResponse = studentService.parentTeacher(user);
                return ResponseEntity.ok(apiResponse);
            }
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/add")
    public HttpEntity<?> add(@Valid @RequestBody ReqStudent reqStudent) {
        if (reqStudent.getId() == null) {
            ApiResponse apiResponse = studentService.registerStudent(reqStudent);
            return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST).body(apiResponse);
        } else {
            ApiResponse apiResponse = studentService.editStudent(reqStudent);
            return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST).body(apiResponse);
        }
    }

//    @PutMapping("/edit")
//    public HttpEntity<?> edit(@Valid @RequestBody ReqStudent reqStudent) {
//        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST).body(apiResponse);
//    }

    @DeleteMapping("/delete/{id}")
    public HttpEntity<?> deleteStudent(@PathVariable UUID id) {
        return ResponseEntity.ok(studentService.deleteStudent(id));
    }

    @GetMapping("/getStudentByGr/{timeTableId}")
    public HttpEntity<?> getAllSubjects(@PathVariable UUID timeTableId) {
        ApiResponse apiResponse = studentService.resStudents(timeTableId);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/getStudentByGroup/{groupId}")
    public HttpEntity<?> getStudentByGroup(@PathVariable UUID groupId) {
        ApiResponse apiResponse = studentService.studentByGroupId(groupId);
        return ResponseEntity.ok(apiResponse);
    }

//    @GetMapping("/jurnal/{timeTableId}")
//    public HttpEntity<?> getAllSubjects(@PathVariable UUID timeTableId, @RequestParam(value = "page", defaultValue = "0") Integer page,
//                                        @RequestParam(value = "size", defaultValue = "10") Integer size) {
//        ResPageable journal = studentService.journal(timeTableId, page, size);
//        return ResponseEntity.ok(journal);
//    }
}
