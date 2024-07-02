package com.syed.signuplogin.service;

import com.syed.signuplogin.dto.UserDto;
import com.syed.signuplogin.dto.UserResponseDto;
import com.syed.signuplogin.entity.AppUser;
import com.syed.signuplogin.repository.UserRepository;
import com.syed.signuplogin.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDto register(UserDto registrationRequestDto) {
        UserDto registrationResponseDto = new UserDto();

        try {
            AppUser appUser = new AppUser();
            appUser.setName(registrationRequestDto.getAppUserList().get(0).getName());
            appUser.setEmail(registrationRequestDto.getAppUserList().get(0).getEmail());
            appUser.setPassword(passwordEncoder.encode(registrationRequestDto.getAppUserList().get(0).getPassword()));
            appUser.setRole(registrationRequestDto.getAppUserList().get(0).getRole());

            AppUser createdAppUser = userRepository.save(appUser);
            if (createdAppUser.getId() > 0) {
                UserResponseDto userResponseDto = new UserResponseDto();
                userResponseDto.setId(createdAppUser.getId());
                userResponseDto.setName(createdAppUser.getName());
                userResponseDto.setEmail(createdAppUser.getEmail());
                userResponseDto.setRole(createdAppUser.getRole());

                registrationResponseDto.setAppUserList(List.of(userResponseDto));
                registrationResponseDto.setMessage("User saved successfully");
                registrationResponseDto.setStatusCode(200);
            }
        } catch (Exception e) {
            registrationResponseDto.setStatusCode(500);
            registrationResponseDto.setError("Error occurred: " + e.getMessage());
        }
        return registrationResponseDto;
    }

    public UserDto login(UserDto loginRequestDto) {
        UserDto loginResponseDto = new UserDto();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequestDto.getEmail(),
                            loginRequestDto.getPassword()
                    )
            );

            AppUser user = userRepository.findByEmail(loginRequestDto.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String token = jwtUtil.generateToken(user);
            String refreshToken = jwtUtil.generateRefreshToken(new HashMap<>(), user);

            loginResponseDto.setEmail(user.getEmail());
            loginResponseDto.setRole(user.getRole());
            loginResponseDto.setToken(token);
            loginResponseDto.setRefreshToken(refreshToken);
            loginResponseDto.setExpirationTime("24Hrs");
            loginResponseDto.setMessage("Successfully Logged In");
            loginResponseDto.setStatusCode(200);
        } catch (Exception e) {
            loginResponseDto.setStatusCode(500);
            loginResponseDto.setMessage("Error occurred: " + e.getMessage());
        }
        return loginResponseDto;
    }

    public UserDto refreshToken(UserDto refreshTokenRequestDto){
        UserDto responseTokenRequestDto = new UserDto();
        try{
            String userEmail = jwtUtil.extractUsername(refreshTokenRequestDto.getToken());
            AppUser user = userRepository.findByEmail(userEmail).orElseThrow();
            if (jwtUtil.isTokenValid(refreshTokenRequestDto.getToken(), user)) {
                var token = jwtUtil.generateToken(user);
                responseTokenRequestDto.setStatusCode(200);
                responseTokenRequestDto.setToken(token);
                responseTokenRequestDto.setRefreshToken(refreshTokenRequestDto.getToken());
                responseTokenRequestDto.setExpirationTime("24Hrs");
                responseTokenRequestDto.setMessage("Successfully Refresh Token Generated");
            }
            responseTokenRequestDto.setStatusCode(200);
            return responseTokenRequestDto;

        }catch (Exception e){
            responseTokenRequestDto.setStatusCode(500);
            responseTokenRequestDto.setMessage(e.getMessage());
            return responseTokenRequestDto;
        }
    }

    public UserDto getAllUsers() {
        UserDto usersDto = new UserDto();

        try {
            List<AppUser> userList = userRepository.findAll();
            if (!userList.isEmpty()) {
                List<UserResponseDto> userResponseList = userList.stream().map(user -> {
                    UserResponseDto userResponseDto = new UserResponseDto();
                    userResponseDto.setId(user.getId());
                    userResponseDto.setName(user.getName());
                    userResponseDto.setEmail(user.getEmail());
                    userResponseDto.setRole(user.getRole());
                    return userResponseDto;
                }).collect(Collectors.toList());
                usersDto.setAppUserList(userResponseList);
                usersDto.setStatusCode(200);
                usersDto.setMessage("Successful");
            } else {
                usersDto.setStatusCode(404);
                usersDto.setMessage("No users found");
            }
            return usersDto;
        } catch (Exception e) {
            usersDto.setStatusCode(500);
            usersDto.setMessage("Error occurred: " + e.getMessage());
            return usersDto;
        }
    }

    public UserDto getUserById(Integer id) {
        UserDto userByIdDto = new UserDto();
        try {
            AppUser userById = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            UserResponseDto userResponseDto = new UserResponseDto();
            userResponseDto.setId(userById.getId());
            userResponseDto.setName(userById.getName());
            userResponseDto.setEmail(userById.getEmail());
            userResponseDto.setRole(userById.getRole());

            userByIdDto.setAppUserList(List.of(userResponseDto));
            userByIdDto.setStatusCode(200);
            userByIdDto.setMessage("User with id '" + id + "' found successfully");
        } catch (Exception e) {
            userByIdDto.setStatusCode(500);
            userByIdDto.setMessage("Error occurred: " + e.getMessage());
        }
        return userByIdDto;
    }

    public UserDto updateUser(Integer userId, AppUser updatedUser) {
        UserDto updatedUserDto = new UserDto();
        try {
            Optional<AppUser> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent()) {
                AppUser existingUser = userOptional.get();
                existingUser.setName(updatedUser.getName());
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setRole(updatedUser.getRole());

                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }

                AppUser savedUser = userRepository.save(existingUser);

                UserResponseDto userResponseDto = new UserResponseDto();
                userResponseDto.setId(savedUser.getId());
                userResponseDto.setName(savedUser.getName());
                userResponseDto.setEmail(savedUser.getEmail());
                userResponseDto.setRole(savedUser.getRole());

                updatedUserDto.setAppUserList(List.of(userResponseDto));  // Adjust to use a list
                updatedUserDto.setStatusCode(200);
                updatedUserDto.setMessage("User updated successfully");
            } else {
                updatedUserDto.setStatusCode(404);
                updatedUserDto.setMessage("User not found for update");
            }
        } catch (Exception e) {
            updatedUserDto.setStatusCode(500);
            updatedUserDto.setMessage("Error occurred while updating user: " + e.getMessage());
        }
        return updatedUserDto;
    }

    public UserDto deleteUser(Integer userId) {
        UserDto deletedUserDto = new UserDto();
        try {
            Optional<AppUser> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent()) {
                userRepository.deleteById(userId);
                deletedUserDto.setStatusCode(200);
                deletedUserDto.setMessage("User deleted successfully");
            } else {
                deletedUserDto.setStatusCode(404);
                deletedUserDto.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            deletedUserDto.setStatusCode(500);
            deletedUserDto.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return deletedUserDto;
    }


    public UserDto getUserInfo(String email) {
        UserDto userInfoDto = new UserDto();
        try {
            Optional<AppUser> userOptional = userRepository.findByEmail(email);
            if (userOptional.isPresent()) {
                AppUser user = userOptional.get();
                userInfoDto.setName(user.getName());
                userInfoDto.setEmail(user.getEmail());
                userInfoDto.setRole(user.getRole());
                userInfoDto.setStatusCode(200);
                userInfoDto.setMessage("User found successfully");
            } else {
                userInfoDto.setStatusCode(404);
                userInfoDto.setMessage("User not found");
            }
        } catch (Exception e) {
            userInfoDto.setStatusCode(500);
            userInfoDto.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return userInfoDto;
    }

}
