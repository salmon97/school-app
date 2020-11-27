package com.example.maktab.service;

import com.example.maktab.entity.Teacher;
import com.example.maktab.entity.User;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqRegister;
import com.example.maktab.payload.ResUser;
import com.example.maktab.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TeacherRepository teacherRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    ParentRepository parentRepository;

    @Autowired
    FileStorageService fileStorageService;

    public ApiResponse registerAdmin(ReqRegister reqRegister) {
        if (!userRepository.existsByUsername(reqRegister.getUsername())) {
            if (reqRegister.getPrePassword().equals(reqRegister.getPassword())) {
                User user = new User();
                user.setFirstName(reqRegister.getFirstName());
                user.setLastName(reqRegister.getLastName());
                user.setUsername(reqRegister.getUsername());
                user.setPhoneNumber(reqRegister.getPhoneNumber());
                user.setPassword(passwordEncoder.encode(reqRegister.getPassword()));
                if (reqRegister.getRoleName().equals("TEACHER")) {
                    user.setRoles(Collections.singleton(roleRepository.roleName("ROLE_TEACHER")));
                }
                if (reqRegister.getRoleName().equals("ADMIN")) {
                    user.setRoles(Collections.singleton(roleRepository.roleName("ROLE_ADMIN")));
                }
                user.setAddress(reqRegister.getAddress());
                userRepository.save(user);
                if (reqRegister.getRoleName().equals("TEACHER")) {
                    Teacher teacher = new Teacher();
                    teacher.setUser(user);
                    teacherRepository.save(teacher);
                }
                return new ApiResponse("saved", true);
            }
            return new ApiResponse("password prePassword not equals", false);
        }
        return new ApiResponse("username already exist", false);
    }

    public ApiResponse resAdmin() {
        List<User> admins = userRepository.getAdmins();
        List<ResUser> resUsers = new ArrayList<>();
        for (User admin : admins) {
            resUsers.add(new ResUser(
                    admin.getFileStorage() != null ? admin.getFileStorage().getId() : null,
                    admin.getId(),
                    admin.getFirstName(),
                    admin.getLastName(),
                    admin.getUsername(),
                    admin.getPhoneNumber(),
                    admin.getAddress())
            );
        }
        return new ApiResponse("Admins", true, resUsers);
    }

    public ApiResponse editUser(ReqRegister reqRegister) {
        User user = userRepository.findById(reqRegister.getId()).orElseThrow(() -> new ResourceNotFoundException("getUser"));
        if (!userRepository.existsByUsernameAndIdNot(reqRegister.getUsername(), user.getId())) {
            if (reqRegister.getPrePassword().equals(reqRegister.getPassword())) {
                user.setFirstName(reqRegister.getFirstName());
                user.setLastName(reqRegister.getLastName());
                user.setUsername(reqRegister.getUsername());
                user.setPhoneNumber(reqRegister.getPhoneNumber());
                user.setPassword(passwordEncoder.encode(reqRegister.getPassword()));
                user.setAddress(reqRegister.getAddress());
                userRepository.save(user);
                return new ApiResponse("saved", true);
            }
            return new ApiResponse("password prePassword not equals", false);
        }
        return new ApiResponse("username already exist", false);
    }

    public ApiResponse deleteAdmin(UUID id) {
        userRepository.deleteById(id);
        return new ApiResponse("deleted", true);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userRepository.findByUsername(s).orElseThrow(() -> new UsernameNotFoundException("getUser"));
    }
}