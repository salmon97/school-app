package com.example.maktab.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResRateCalculate {
    private String subNameUz;
    private String subNameRu;
    private String subNameEng;
    private int rate5;
    private int rate4;
    private int rate3;
    private int rate2;
    private int countRate5;
    private int countRate4;
    private int countRate3;
    private int countRate2;
    private int percent;

    public ResRateCalculate(String subNameUz, String subNameRu, String subNameEng) {
        this.subNameUz = subNameUz;
        this.subNameRu = subNameRu;
        this.subNameEng = subNameEng;
    }
}
