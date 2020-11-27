package com.example.maktab.payload;

import lombok.Data;

import java.util.UUID;

@Data
public class ReqRateTeacher {
    private UUID teacherId;
    private int rate;
}
