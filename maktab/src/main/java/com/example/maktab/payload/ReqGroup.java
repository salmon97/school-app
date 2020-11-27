package com.example.maktab.payload;

import lombok.Data;

import java.util.UUID;

@Data
public class ReqGroup {
    private UUID id;
    private UUID teacherId;
    private String nameUz;
    private String nameRu;
    private String nameEng;
}