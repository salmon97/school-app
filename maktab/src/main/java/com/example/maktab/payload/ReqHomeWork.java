package com.example.maktab.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class ReqHomeWork {
    @NotNull(message = "not be null")
    private UUID homeWorkId;
    private UUID fileId;
    private UUID timeTableId;
    private UUID attendanceId;
    private String text;


}
