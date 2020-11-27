package com.example.maktab.controller;

import com.example.maktab.entity.User;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqMessageStuTea;
import com.example.maktab.payload.ResPageable;
import com.example.maktab.security.CurrentUser;
import com.example.maktab.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    MessageService messageService;

    @PostMapping("/sent")
    public HttpEntity<?> AddMessage(@RequestBody ReqMessageStuTea reqMessageStuTea, @CurrentUser User user) {
        ResPageable resPageable = messageService.messageSave(reqMessageStuTea, user);
        return ResponseEntity.ok(resPageable);
    }

    @GetMapping("/get/")
    public HttpEntity<?> getMessage(@RequestParam(value = "size") int size, @RequestParam(value = "sentToId") UUID sentToId, @CurrentUser User user) {
        ResPageable resPageable = messageService.resPageable(user.getId(), sentToId, size);
        return ResponseEntity.ok(resPageable);
    }

    @GetMapping("/getNoRead")
    public HttpEntity<?> getMessage(@CurrentUser User user) {
        ApiResponse apiResponse = messageService.noRead(user.getId());
        return ResponseEntity.ok(apiResponse);
    }
}


//    @Autowired
//    MessageService messageService;
//
//    @Autowired
//    StudentRepository studentRepository;
//
//    @Autowired
//    TeacherRepository teacherRepository;
//
//    @PostMapping("/sentTea")
//    public HttpEntity<?> AddMessage(@RequestBody ReqMessageStuTea reqMessageStuTea, @CurrentUser User user) {
//        ApiResponse apiResponse = messageService.messageSaveForSt(reqMessageStuTea, studentRepository.findByUser_Id(user.getId()));
//        return ResponseEntity.ok(apiResponse);
//    }
//
//    @GetMapping("/getStMsg/")
//    public HttpEntity<?> getMessage(@RequestParam(value = "size", defaultValue = "20") int size, @CurrentUser User user) {
//        ResPageable resPageable = messageService.resPageableForStudent(studentRepository.findByUser_Id(user.getId()).getId(), size);
//        return ResponseEntity.ok(resPageable);
//    }
//
//
//    //teacher
//    @PostMapping("/sentStu")
//    public HttpEntity<?> AddMessageForTea(@RequestBody ReqMessageStuTea reqMessageStuTea, @CurrentUser User user) {
//        ApiResponse apiResponse = messageService.messageSaveForTea(reqMessageStuTea, teacherRepository.findByUser_Id(user.getId()));
//        return ResponseEntity.ok(apiResponse);
//    }
//
//    //teacher
//    @GetMapping("/getTeaMsg/")
//    public HttpEntity<?> getMessageForTea(@RequestParam(value = "size", defaultValue = "20") int size, @CurrentUser User user) {
//        ResPageable resPageable = messageService.resPageableForTeacher(teacherRepository.findByUser_Id(user.getId()).getId(), size);
//        return ResponseEntity.ok(resPageable);
//    }
