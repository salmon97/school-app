package com.example.maktab.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResTimeTable {
    private UUID timeTableId;
    private Long weekDaysId;
    private Long subjectId;
    private UUID teacherId;
    private UUID teacherId2;
    private UUID groupId;
    private String startHour;
    private String endHour;
    private String place;
    private String teacherName;
    private Long SubjectId;
    private String subjectNameUz;
    private String subjectNameRu;
    private String subjectNameEng;
    private String weekdaysNameUz;
    private String weekdaysNameRu;
    private String weekdaysNameEng;
    private boolean noRead;

    public ResTimeTable(UUID teacherId2,UUID teacherId, String teacherName, String subjectNameUz, String subjectNameRu, String subjectNameEng,boolean noRead) {
        this.teacherId2 = teacherId2;
        this.teacherId = teacherId;
        this.teacherName = teacherName;
        this.subjectNameUz = subjectNameUz;
        this.subjectNameRu = subjectNameRu;
        this.subjectNameEng = subjectNameEng;
        this.noRead = noRead;
    }
}
