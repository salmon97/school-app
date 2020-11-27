package com.example.maktab.companent;

import com.example.maktab.entity.User;
import com.example.maktab.entity.enums.RoleName;
import com.example.maktab.repository.RoleRepository;
import com.example.maktab.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Date;

@Component
public class DataLoader implements CommandLineRunner {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;

    @Value("${spring.datasource.initialization-mode}")
    private String initMode;

    @Override
    public void run(String... args) throws Exception {
        if (initMode.equals("always")) {
            userRepository.save(
                    new User(
                            "Director",
                            "Directorov",
                            "director",
                            null,
                            "+998937837520",
                            passwordEncoder.encode("123456"),
                            Collections.singleton(roleRepository.findByRoleName(RoleName.ROLE_DIRECTOR))
                    )
            );
        }
    }
}
