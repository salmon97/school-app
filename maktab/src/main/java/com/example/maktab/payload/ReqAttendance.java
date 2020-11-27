package com.example.maktab.payload;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class ReqAttendance {
    private UUID attendanceId;
    private UUID studentId;
    private String attendType;
    private UUID timeTableId;
    private Integer rate;
}