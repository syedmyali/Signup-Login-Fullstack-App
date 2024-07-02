package com.syed.signuplogin.controller;

import com.syed.signuplogin.dto.UserDto;
import com.syed.signuplogin.entity.AppUser;
import com.syed.signuplogin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/auth/register")
    public ResponseEntity<UserDto> regeister(@RequestBody UserDto regDto){
        return ResponseEntity.ok(userService.register(regDto));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<UserDto> login(@RequestBody UserDto loginDto){
        return ResponseEntity.ok(userService.login(loginDto));
    }

    @PostMapping("/auth/refresh-token")
    public ResponseEntity<UserDto> refreshToken(@RequestBody UserDto refreshTokenDto){
        return ResponseEntity.ok(userService.refreshToken(refreshTokenDto));
    }

    @GetMapping("/adminuser/users")
    public ResponseEntity<UserDto> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());

    }

    @GetMapping("/adminuser/user/{userId}")
    public ResponseEntity<UserDto> getUSerByID(@PathVariable Integer userId){
        return ResponseEntity.ok(userService.getUserById(userId));

    }

    @PutMapping("/adminuser/update/{userId}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Integer userId, @RequestBody AppUser updatedUser){
        return ResponseEntity.ok(userService.updateUser(userId, updatedUser));
    }

    @GetMapping("/adminuser/profile")
    public ResponseEntity<UserDto> getUserProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        UserDto responseUserDto = userService.getUserInfo(email);
        return  ResponseEntity.status(responseUserDto.getStatusCode()).body(responseUserDto);
    }

    @DeleteMapping("/adminuser/delete/{userId}")
    public ResponseEntity<UserDto> deleteUser(@PathVariable Integer userId){
        return ResponseEntity.ok(userService.deleteUser(userId));
    }

}
