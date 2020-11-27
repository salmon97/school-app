package com.example.maktab.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResRateTeacher {
    private UUID teacherId;
    private String parentName;
    private int rate;
    private String date;
}
