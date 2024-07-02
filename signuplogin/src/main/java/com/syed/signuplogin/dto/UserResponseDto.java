package com.syed.signuplogin.dto;

import lombok.Data;

@Data
public class UserResponseDto {
    private Integer id;
    private String name;
    private String email;
    private String role;
    private String password;
//    private String token;
//    private String refreshToken;
//    private String expirationTime;
}

