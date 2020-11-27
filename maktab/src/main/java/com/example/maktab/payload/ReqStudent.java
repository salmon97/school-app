package com.example.maktab.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.Date;
import java.util.UUID;

@Data
public class ReqStudent {
    private UUID id;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    private String username;
    private String address;
    private String birthDate;
    private String phoneNumber;
    @Pattern(regexp = "[a-zA-Z0-9]{6,16}", message = "Uzunligi 6-16 b'lishi oralig'ida shart.")
    private String password;
    @Pattern(regexp = "[a-zA-Z0-9]{6,16}", message = "Uzunligi 6-16 b'lishi oralig'ida shart.")
    private String prePassword;
    private UUID groupId; // for student register
    private String parentFirstName;
    private String parentLastName;
    private String parentUsername;
    private String parentPhoneNumber;
    @Pattern(regexp = "[a-zA-Z0-9]{6,16}", message = "Uzunligi 6-16 b'lishi oralig'ida shart.")
    private String parentPassword;
    @Pattern(regexp = "[a-zA-Z0-9]{6,16}", message = "Uzunligi 6-16 b'lishi oralig'ida shart.")
    private String parentPrePassword;
}
