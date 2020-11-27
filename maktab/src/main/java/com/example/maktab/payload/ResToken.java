package com.example.maktab.payload;

import lombok.Data;

@Data
public class ResToken {
    private String token;
    private String tokenType = "Bearer ";

    public ResToken(String token) {
        this.token = token;
    }
}
