package com.example.maktab.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
public class ReqLogin {
    @NotBlank
    private String username;
    @NotBlank
    private String password;

}
