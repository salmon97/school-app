package com.example.maktab.service;

import com.example.maktab.entity.Teacher;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqRegister;
import com.example.maktab.payload.ResUser;
import com.example.maktab.repository.TeacherRepository;
import com.example.maktab.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class TeacherService {

    @Autowired
    TeacherRepository teacherRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    public ApiResponse resTeachers() {
        List<Teacher> teachers = teacherRepository.findAll();
        List<ResUser> resTeachers = new ArrayList<>();
        for (Teacher teacher : teachers) {
            resTeachers.add(new ResUser(
                    teacher.getUser().getFileStorage() != null ? teacher.getUser().getFileStorage().getId() : null,
                    teacher.getId(),
                    teacher.getUser().getFirstName(),
                    teacher.getUser().getLastName(),
                    teacher.getUser().getUsername(),
                    teacher.getUser().getPhoneNumber(),
                    teacher.getUser().getAddress()
            ));
        }
        return new ApiResponse("teachers", true, resTeachers);
    }

    public ApiResponse editTeacher(ReqRegister reqRegister) {
        Teacher teacher = teacherRepository.findById(reqRegister.getId()).orElseThrow(() -> new ResourceNotFoundException("getTeacher"));
        if (!userRepository.existsByUsernameAndIdNot(reqRegister.getUsername(), teacher.getUser().getId())) {
            if (reqRegister.getPrePassword().equals(reqRegister.getPassword())) {
                teacher.getUser().setFirstName(reqRegister.getFirstName());
                teacher.getUser().setLastName(reqRegister.getLastName());
                teacher.getUser().setUsername(reqRegister.getUsername());
                teacher.getUser().setPhoneNumber(reqRegister.getPhoneNumber());
                teacher.getUser().setPassword(passwordEncoder.encode(reqRegister.getPassword()));
                teacher.getUser().setAddress(reqRegister.getAddress());
                userRepository.save(teacher.getUser());
//                teacher.setUser(teacher.getUser());
//                teacherRepository.save(teacher);
                return new ApiResponse("saved", true);
            }
            return new ApiResponse("password prePassword not equals", false);
        }
        return new ApiResponse("username already exist", false);
    }

    public ApiResponse deleteTeacher(UUID id) {
        teacherRepository.deleteById(id);
        return new ApiResponse("deleted", true);
    }
}
