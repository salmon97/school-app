package com.example.maktab.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResWeekDays {
    private String weekdaysNameUz;
    private String weekdaysNameRu;
    private String weekdaysNameEng;
    private List<ResTimeTable> resTimeTables;
}
