package com.example.maktab.controller;

import com.example.maktab.entity.*;
import com.example.maktab.entity.enums.RoleName;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqTimeTable;
import com.example.maktab.repository.ParentRepository;
import com.example.maktab.repository.StudentRepository;
import com.example.maktab.repository.TeacherRepository;
import com.example.maktab.security.CurrentUser;
import com.example.maktab.service.TimeTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/timeTable")
public class TimeTableController {

    @Autowired
    TimeTableService timeTableService;

    @Autowired
    TeacherRepository teacherRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    ParentRepository parentRepository;

    @PostMapping("/add")
    public HttpEntity<?> add(@RequestBody ReqTimeTable reqTimeTable) {
        if (reqTimeTable.getTimeTableId() == null) {
            ApiResponse apiResponse = timeTableService.addTimeTable(reqTimeTable);
            return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST).body(apiResponse);
        } else {
            ApiResponse apiResponse = timeTableService.editTimeTable(reqTimeTable);
            return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST).body(apiResponse);
        }
    }

    //for admin
    @GetMapping("/getTimeTable/{groupId}")
    public HttpEntity<?> getTimeTable(@PathVariable UUID groupId) {
        return ResponseEntity.ok(timeTableService.timeTale(groupId));
    }

    @GetMapping("/getByGroup/{groupId}")
    public HttpEntity<?> getByGroup(@PathVariable UUID groupId, @CurrentUser User user) {
        Teacher teacher = teacherRepository.findByUser_Id(user.getId());
        return ResponseEntity.ok(timeTableService.getGroupById(groupId, teacher.getId()));
    }

    @DeleteMapping("/delete/{id}")
    public HttpEntity<?> deleteTimeTable(@PathVariable UUID id) {
        ApiResponse apiResponse = timeTableService.deleteTimeTable(id);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/get")
    public HttpEntity<?> getTimeTableForStudent(@CurrentUser User user) {
        for (Role role : user.getRoles()) {
            if (role.getRoleName().equals(RoleName.ROLE_STUDENT)) {
                Student byUser_id = studentRepository.findByUser_Id(user.getId());
                return ResponseEntity.ok(timeTableService.timeTale(byUser_id.getGroup().getId()));
            } else {
                Parent parent = parentRepository.findByUser_Id(user.getId());
                return ResponseEntity.ok(timeTableService.timeTale(parent.getStudent().getGroup().getId()));
            }
        }
        return ResponseEntity.badRequest().build();
    }
}
