package com.example.maktab.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResStudent {
    private UUID userId;
    private UUID parentUserId;
    private UUID studentPhotoId;
    private UUID attendanceId;
    private UUID studentId;
    private String firstName;
    private String lastName;
    private String username;
    private String phoneNumber;
    private String birthDate;
    private String address;
    private String attendType;
    private Integer rate;
    private List<ResDiary> resDiaries;
    private ResParent resParent;

    public ResStudent(UUID userId, UUID parentUserId, UUID studentPhotoId, UUID attendanceId, UUID studentId, String firstName, String lastName, String username, String phoneNumber, String address, String attendType, Integer rate) {
        this.userId = userId;
        this.parentUserId = parentUserId;
        this.studentPhotoId = studentPhotoId;
        this.attendanceId = attendanceId;
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.attendType = attendType;
        this.rate = rate;
    }

    public ResStudent(UUID studentPhotoId, UUID studentId, String firstName, String lastName, String username, String phoneNumber, String birthDate, String address, ResParent resParent) {
        this.studentPhotoId = studentPhotoId;
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.address = address;
        this.resParent = resParent;
    }
}