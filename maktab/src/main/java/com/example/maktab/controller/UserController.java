package com.example.maktab.controller;


import com.example.maktab.entity.User;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqLogin;
import com.example.maktab.payload.ReqRegister;
import com.example.maktab.payload.ResToken;
import com.example.maktab.security.CurrentUser;
import com.example.maktab.security.JwtTokenProvider;
import com.example.maktab.service.UserService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    final
    JwtTokenProvider jwtTokenProvider;

    final
    UserService userService;

    final
    AuthenticationManager authenticationManager;


    public UserController(JwtTokenProvider jwtTokenProvider, UserService userService, AuthenticationManager authenticationManager) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @DeleteMapping("/delete/{id}")
    public HttpEntity<?> delete(@PathVariable UUID id) {
        ApiResponse delete = userService.deleteAdmin(id);
        return ResponseEntity.ok(delete);
    }

    @PutMapping("/edit")
    public HttpEntity<?> edit(@Valid @RequestBody ReqRegister reqRegister) {
        ApiResponse apiResponse = userService.editUser(reqRegister);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST).body(apiResponse);
    }

    @GetMapping("/admins")
    public HttpEntity<?> getUsers() {
        return ResponseEntity.ok(userService.resAdmin());
    }

    @PostMapping("/register")
    public HttpEntity<?> registerUser(@Valid @RequestBody ReqRegister reqRegister) {
        ApiResponse response = userService.registerAdmin(reqRegister);
        return ResponseEntity.status(response.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(response);
    }

    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody ReqLogin reqLogin) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                reqLogin.getUsername(),
                reqLogin.getPassword()
        ));
        String token = jwtTokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new ResToken(token));
    }


    @GetMapping("/userMe")
    public HttpEntity<?> userMe(@CurrentUser User user) {
        return ResponseEntity.status(user == null ? 409 : 200).body(user);
//        return ResponseEntity.status(user==null?HttpStatus.CONFLICT:HttpStatus.OK).body(user);
    }
}
