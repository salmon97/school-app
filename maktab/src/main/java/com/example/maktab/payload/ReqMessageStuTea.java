package com.example.maktab.payload;

import lombok.Data;

import java.util.UUID;

@Data
public class ReqMessageStuTea {
    private UUID sentToId;
    private String text;
}