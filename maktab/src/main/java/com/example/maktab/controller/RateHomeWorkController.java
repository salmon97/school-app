package com.example.maktab.controller;

import com.example.maktab.entity.Role;
import com.example.maktab.entity.Student;
import com.example.maktab.entity.User;
import com.example.maktab.entity.enums.RoleName;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqHomeWork;
import com.example.maktab.repository.ParentRepository;
import com.example.maktab.repository.StudentRepository;
import com.example.maktab.security.CurrentUser;
import com.example.maktab.service.HomeWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.UUID;


@RestController
@RequestMapping("/api/homeWork")
public class RateHomeWorkController {

    @Autowired
    HomeWorkService homeWorkService;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    ParentRepository parentRepository;

    @PostMapping("/add")
    public HttpEntity<?> addHomeWork(@RequestBody ReqHomeWork reqHomeWork) {
        ApiResponse apiResponse = homeWorkService.addHomeWork(reqHomeWork);
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/add/file")
    public HttpEntity<?> addFileHomeWork(@Valid @RequestBody ReqHomeWork reqHomeWork) {
        ApiResponse apiResponse = homeWorkService.addFileHomeWork(reqHomeWork);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/all/{timeTableId}")
    public HttpEntity<?> resGroup(@PathVariable String timeTableId, @RequestParam(value = "page", defaultValue = "0") Integer page,
                                  @RequestParam(value = "size", defaultValue = "1") Integer size) {
        return ResponseEntity.ok(homeWorkService.resHomWorksByTimeTable(UUID.fromString(timeTableId), page, size));
    }

    @GetMapping("/getmyhomework")
    public HttpEntity<?> getMyHomeWork(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                       @RequestParam(value = "subjectId") Long subjectId, @RequestParam(value = "date") String date, @CurrentUser User user) throws ParseException {
        Student student = studentRepository.findByUser_Id(user.getId());
        for (Role role : user.getRoles()) {
            if (role.getRoleName().equals(RoleName.ROLE_PARENT)) {
                student = parentRepository.findByUser_Id(user.getId()).getStudent();
                break;
            }
        }
        return ResponseEntity.ok(homeWorkService.resHowWorkForStudent(subjectId, date, page, student.getId()));
    }

    @GetMapping("/getmyhomeworkId")
    public HttpEntity<?> getMyHomeWorkId(@RequestParam(value = "homeWorkId") UUID homeworkId, @CurrentUser User user) {
        Student student = studentRepository.findByUser_Id(user.getId());
        for (Role role : user.getRoles()) {
            if (role.getRoleName().equals(RoleName.ROLE_PARENT)) {
                student = parentRepository.findByUser_Id(user.getId()).getStudent();
                break;
            }
        }
        return ResponseEntity.ok(homeWorkService.getHomeWorkId(homeworkId, student.getId()));
    }

    @DeleteMapping("/deleteFile/{id}")
    public HttpEntity<?> deleteFile(@PathVariable UUID id) {
        return ResponseEntity.ok(homeWorkService.deleteFile(id));
    }


    @PostMapping("/comment/add")
    public HttpEntity<?> addComment(@RequestBody ReqHomeWork reqHomeWork, @CurrentUser User user) {
        ApiResponse apiResponse = homeWorkService.addComment(reqHomeWork, user);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/comment/get")
    public HttpEntity<?> resComments(@RequestParam(value = "size", defaultValue = "20") int size, @RequestParam(value = "homeWorkId") UUID homeWorkId) {
        ApiResponse apiResponse = homeWorkService.resPageableComment(size, homeWorkId);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/homeWorkToday")
    public HttpEntity<?> resComments(@CurrentUser User user) {
        Student student = studentRepository.findByUser_Id(user.getId());
        for (Role role : user.getRoles()) {
            if (role.getRoleName().equals(RoleName.ROLE_PARENT)) {
                student = parentRepository.findByUser_Id(user.getId()).getStudent();
                break;
            }
        }
        ApiResponse apiResponse = homeWorkService.resTodayHomeWork(student.getGroup().getId());
        return ResponseEntity.ok(apiResponse);
    }
}
