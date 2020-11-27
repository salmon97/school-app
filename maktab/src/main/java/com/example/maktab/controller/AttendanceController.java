package com.example.maktab.controller;

import com.example.maktab.entity.Parent;
import com.example.maktab.entity.Role;
import com.example.maktab.entity.Student;
import com.example.maktab.entity.User;
import com.example.maktab.entity.enums.RoleName;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqAttendance;
import com.example.maktab.repository.AttendanceRepository;
import com.example.maktab.repository.ParentRepository;
import com.example.maktab.repository.StudentRepository;
import com.example.maktab.security.CurrentUser;
import com.example.maktab.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    AttendanceService attendanceService;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    ParentRepository parentRepository;

    @Autowired
    AttendanceRepository attendanceRepository;


    @PostMapping("/add")
    public HttpEntity<?> add(@RequestBody List<ReqAttendance> attendances) {
        return ResponseEntity.ok(attendanceService.attend(attendances));
    }

    @PostMapping("/rate")
    public HttpEntity<?> rate(@RequestBody ReqAttendance reqAttendance) {
        attendanceService.rateStudent(reqAttendance);
        return ResponseEntity.ok("ok");
    }

    //admin and teacher
    @GetMapping("/resDiary/{studentId}")
    public HttpEntity<?> get(@PathVariable UUID studentId, @RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok(attendanceService.resDiary(studentId, page, size));
    }

    //student parent
    @GetMapping("/resDiarySt")
    public HttpEntity<?> getForStudent(@CurrentUser User user, @RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value = "size", defaultValue = "10") int size) {
        for (Role role : user.getRoles()) {
            if (role.getRoleName().equals(RoleName.ROLE_STUDENT)) {
                Student student = studentRepository.findByUser_Id(user.getId());
                return ResponseEntity.ok(attendanceService.resDiary(student.getId(), page, size));
            } else {
                Parent parent = parentRepository.findByUser_Id(user.getId());
                return ResponseEntity.ok(attendanceService.resDiary(parent.getStudent().getId(), page, size));
            }
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/calculate/date")
    public HttpEntity<?> resCalculate(@RequestParam(value = "studentId") UUID studentId,
                                      @RequestParam(value = "from") Date from,
                                      @RequestParam(value = "to") Date to) {
        ApiResponse apiResponse = attendanceService.resCalculateRate(studentId, from, to);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/calculate")
    public HttpEntity<?> resCalculate(@RequestParam(value = "studentId") UUID studentId) {
        Date to = attendanceRepository.getByLastStudentId(studentId);
        Date from = attendanceRepository.getByBeginStudentId(studentId);
        ApiResponse apiResponse = attendanceService.resCalculateRate(studentId, from, to);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/calculateforst")
    public HttpEntity<?> resCalculate(@CurrentUser User user) {
        UUID studentId = null;
        for (Role role : user.getRoles()) {
            if (role.getRoleName().equals(RoleName.ROLE_STUDENT)){
                studentId = studentRepository.findByUser_Id(user.getId()).getId();
                break;
            }
            if (role.getRoleName().equals(RoleName.ROLE_PARENT)) {
                studentId = parentRepository.findByUser_Id(user.getId()).getStudent().getId();
                break;
            }
        }
        Date to = attendanceRepository.getByLastStudentId(studentId);
        Date from = attendanceRepository.getByBeginStudentId(studentId);
        ApiResponse apiResponse = attendanceService.resCalculateRate(studentId, from, to);
        assert studentId != null;
        apiResponse.setMessage(studentId.toString());
        return ResponseEntity.ok(apiResponse);
    }
}