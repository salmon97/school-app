package com.example.maktab.service;

import com.example.maktab.entity.Attendance;
import com.example.maktab.entity.Student;
import com.example.maktab.entity.Subject;
import com.example.maktab.payload.*;
import com.example.maktab.projection.CountRate;
import com.example.maktab.repository.AttendanceRepository;
import com.example.maktab.repository.StudentRepository;
import com.example.maktab.repository.SubjectRepository;
import com.example.maktab.repository.TimetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    @Autowired
    AttendanceRepository attendanceRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    StudentService studentService;

    @Autowired
    TimetableRepository timetableRepository;

    @Autowired
    SubjectRepository subjectRepository;

    public ApiResponse attend(List<ReqAttendance> reqAttendances) {
        for (ReqAttendance reqAttendance : reqAttendances) {
            Attendance attendanceByStudent = attendanceRepository.getAttendanceByStudent(reqAttendance.getStudentId(), reqAttendance.getTimeTableId());
            if (attendanceByStudent == null) {
                attendanceByStudent = new Attendance();
                attendanceByStudent.setStudent(studentRepository.findById(reqAttendance.getStudentId()).orElseThrow(() -> new ResourceNotFoundException("getStudent")));
                attendanceByStudent.setTimeTable(timetableRepository.findById(reqAttendance.getTimeTableId()).orElseThrow(() -> new ResourceNotFoundException("getTimeTable")));
            }
            attendanceByStudent.setAttendType(reqAttendance.getAttendType());
            attendanceRepository.save(attendanceByStudent);
        }
        return studentService.resStudents(reqAttendances.get(0).getTimeTableId());
    }

    public void rateStudent(ReqAttendance reqAttendance) {
        Attendance attendance = attendanceRepository.findById(reqAttendance.getAttendanceId()).orElseThrow(() -> new ResourceNotFoundException("getAttendance"));
        attendance.setRate(reqAttendance.getRate());
        attendanceRepository.save(attendance);
    }

    public ResPageable resDiary(UUID studentId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ResDiary> resDiaries = attendanceRepository.resDiary(studentId, pageable);
        return new ResPageable(
                page, size,
                resDiaries.getTotalElements(),
                resDiaries.getTotalPages(),
                resDiaries.getContent().stream().map(resDiary -> new ResJurnal(
                        resDiary.getRegisterat().toString().substring(0, 10),
                        resDiary.getAttend_type(),
                        resDiary.getAttendrate(),
                        resDiary.getName_uz(),
                        resDiary.getName_ru(),
                        resDiary.getName_eng(),
                        resDiary.getHomeworkrate()
                )).collect(Collectors.toList())
        );
    }

    public ApiResponse resCalculateRate(UUID studentId, Date dateFrom, Date dateTo) {
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new ResourceNotFoundException("getStudent"));
        List<Subject> subjects = subjectRepository.getAllByGroup(student.getGroup().getId());
        List<ResRateCalculate> resRateCalculates = new ArrayList<>();
        for (Subject subject : subjects) {
            int percent = 0;
            Integer lessonCount = attendanceRepository.getByLessonCount(studentId, dateFrom, dateTo, subject.getId());
            List<CountRate> countRates = attendanceRepository.getByRateCountStudentId(studentId, dateFrom, dateTo, subject.getId());
            ResRateCalculate resRateCalculate = new ResRateCalculate(subject.getNameUz(),
                    subject.getNameRu(),
                    subject.getNameEng());
            for (CountRate countRate : countRates) {
                percent = percent + countRate.getAlls();
                resRateCalculate.setRate5(5);
                resRateCalculate.setRate4(4);
                resRateCalculate.setRate3(3);
                resRateCalculate.setRate2(2);
                if (countRate.getRate() == 5)
                    resRateCalculate.setCountRate5(countRate.getCounts());
                if (countRate.getRate() == 4)
                    resRateCalculate.setCountRate4(countRate.getCounts());
                if (countRate.getRate() == 3)
                    resRateCalculate.setCountRate3(countRate.getCounts());
                if (countRate.getRate() == 2)
                    resRateCalculate.setCountRate2(countRate.getCounts());
            }
            double p = (double) lessonCount / 100;
            resRateCalculate.setPercent((int) (percent / p));
            resRateCalculates.add(resRateCalculate);
        }
        return new ApiResponse("ok", true, resRateCalculates);
    }
}