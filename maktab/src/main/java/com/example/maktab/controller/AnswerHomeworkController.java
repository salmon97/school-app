package com.example.maktab.controller;

import com.example.maktab.entity.Student;
import com.example.maktab.entity.User;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqAnswerHomeWork;
import com.example.maktab.repository.StudentRepository;
import com.example.maktab.security.CurrentUser;
import com.example.maktab.service.AnswerHomeWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/answer")
public class AnswerHomeworkController {

    @Autowired
    AnswerHomeWorkService answerHomeWorkService;

    @Autowired
    StudentRepository studentRepository;

    @PreAuthorize(value = "hasRole('ROLE_STUDENT')")
    @PostMapping("/add")
    public HttpEntity<?> addAnswerHomeWork(@RequestBody ReqAnswerHomeWork reqAnswerHomeWork, @CurrentUser User user) {
        Student student = studentRepository.findByUser_Id(user.getId());
        return ResponseEntity.ok(answerHomeWorkService.addAnswerHomeWork(reqAnswerHomeWork, student.getId()));
    }


    @DeleteMapping("/deleteFile/{id}")
    public HttpEntity<?> deleteFile(@PathVariable UUID id) {
        return ResponseEntity.ok(answerHomeWorkService.deleteFile(id));
    }

    @GetMapping("/check/{answerHomeWorkId}")
    public HttpEntity<?> getCheckAnswer(@PathVariable UUID answerHomeWorkId) {
        return ResponseEntity.ok(answerHomeWorkService.resAnswerHomeWork(answerHomeWorkId));
    }

    @PostMapping("/addCheckFile")
    public HttpEntity<?> addCheckAnswer(@RequestBody ReqAnswerHomeWork reqAnswerHomeWork) {
        return ResponseEntity.ok(answerHomeWorkService.checkedHomeWork(reqAnswerHomeWork));
    }

    @DeleteMapping("/deleteFileCheck/{id}")
    public HttpEntity<?> deleteFileCheck(@PathVariable UUID id) {
        return ResponseEntity.ok(answerHomeWorkService.deleteCheckFileHomeWrk(id));
    }

    @GetMapping("/rate")
    public HttpEntity<?> rateAnswerHomeWork(@RequestParam(value = "answerId") UUID answerId, @RequestParam("rate") int rate) {
        ApiResponse apiResponse = answerHomeWorkService.rateAnswerHomeWork(answerId, rate);
        return ResponseEntity.ok(apiResponse);
    }
}
