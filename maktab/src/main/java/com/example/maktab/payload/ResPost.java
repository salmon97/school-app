package com.example.maktab.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResPost {
    private UUID id;
    private String title;
    private String text;
    private String registerAt;
}
