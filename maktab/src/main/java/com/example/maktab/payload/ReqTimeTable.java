package com.example.maktab.payload;

import lombok.Data;

import java.util.UUID;

@Data
public class ReqTimeTable {
    private UUID timeTableId;
    private Long weekDaysId;
    private Long subjectId;
    private UUID teacherId;
    private UUID groupId;
    private String startHour;
    private String startHourMin;
    private String endHour;
    private String endHourMin;
    private String place;
}
