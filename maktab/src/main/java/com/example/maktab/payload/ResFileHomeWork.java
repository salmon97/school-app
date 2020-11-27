package com.example.maktab.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResFileHomeWork {
    private UUID id;
    private UUID fileId; //fileStorage Id
    private String text;
}
