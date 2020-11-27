package com.example.maktab.payload;

import com.example.maktab.entity.enums.AttendType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResAttendance {
    private UUID studentId;
    private AttendType attendType;
    private UUID timeTableId;
    private String firstName;
    private String lastName;
    private Integer rateAttendance;
    private Integer rateHomeWork;
    private String date;
    private String subjectNameUz;
    private String subjectNameRu;
    private String subjectNameEng;

}