package com.example.maktab.controller;

import com.example.maktab.entity.Teacher;
import com.example.maktab.entity.User;
import com.example.maktab.payload.ReqGroup;
import com.example.maktab.repository.TeacherRepository;
import com.example.maktab.security.CurrentUser;
import com.example.maktab.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/group")
public class GroupController {

    @Autowired
    TeacherRepository teacherRepository;

    @Autowired
    GroupService groupService;

    @PostMapping("/addEdit")
    public HttpEntity<?> addGroup(@RequestBody ReqGroup reqGroup) {
        if (reqGroup.getId() == null) {
            return ResponseEntity.ok(groupService.addGroup(reqGroup));
        } else {
            return ResponseEntity.ok(groupService.editGroup(reqGroup));
        }
    }

    //for admin,Director
    @GetMapping("/all")
    public HttpEntity<?> resGroup(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                  @RequestParam(value = "size", defaultValue = "10") Integer size) {
        return ResponseEntity.ok(groupService.getGroups(page, size));
    }

    //teacher
    @GetMapping("/getGroups")
    public HttpEntity<?> resGroup(@CurrentUser User user) {
        Teacher teacher = teacherRepository.findByUser_Id(user.getId());
        return ResponseEntity.ok(groupService.resGroupsForTeacher(teacher.getId()));
    }

    @DeleteMapping("/delete/{id}")
    public HttpEntity<?> deleteStudent(@PathVariable UUID id) {
        return ResponseEntity.ok(groupService.deleteGroup(id));
    }


}