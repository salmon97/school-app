package com.example.maktab.payload;

import com.example.maktab.entity.Student;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.Date;
import java.util.UUID;

@Data
public class ReqRegister {
    private UUID id;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    private String username;
    private String roleName;
    private String address;
    private Date birthDate;

//    @Pattern(regexp = "^[+][9][9][8][0-9]{9}$", message = "Phone number must be 13 digits.")
    private String phoneNumber;
    @Pattern(regexp = "[a-zA-Z0-9]{6,16}", message = "Uzunligi 6-16 b'lishi oralig'ida shart.")
    private String password;
    @Pattern(regexp = "[a-zA-Z0-9]{6,16}", message = "Uzunligi 6-16 b'lishi oralig'ida shart.")
    private String prePassword;
    private UUID groupId; // for student register
    private UUID studentId; // for parent register
}
