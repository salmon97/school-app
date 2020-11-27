package com.example.maktab.payload;

import lombok.Data;

import java.util.UUID;

@Data
public class ReqAnswerHomeWork {
    private UUID fileId;
    private UUID answerHomeWorkId;
    private UUID homeWorkId;
    private UUID studentId;
    private String text;
}
