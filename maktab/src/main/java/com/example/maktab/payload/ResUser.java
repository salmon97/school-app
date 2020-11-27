package com.example.maktab.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResUser {
    private UUID photoId;
    private UUID id;
    private String firstName;
    private String lastName;
    private String username;
    private String phoneNumber;
    private String address;
}
