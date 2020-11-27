package com.example.maktab.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResJurnal {
    private String registerAt;

    private String attendType;

    private Integer attendRate;

    private String subjectNameUz;

    private String subjectNameRu;

    private String subjectNameEng;

    private Integer homeworkRate;
}
