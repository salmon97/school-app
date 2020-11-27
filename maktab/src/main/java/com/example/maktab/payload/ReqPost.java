package com.example.maktab.payload;

import lombok.Data;

import java.util.UUID;

@Data
public class ReqPost {
    private UUID id;
    private String title;
    private String text;
}
