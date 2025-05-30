package com.example.springblog.controllers;

import com.example.springblog.AppConstants;
import com.example.springblog.payload.UserDto;
import com.example.springblog.payload.UserUpdateDto;
import com.example.springblog.response.ApiResponse;
import com.example.springblog.response.UserDetailResponse;
import com.example.springblog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.springblog.payload.UserUpdateDto;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = AppConstants.USER_PATH)
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;


    //    GET - get all users
    @GetMapping(AppConstants.USER_BASE)
    public ResponseEntity<List<UserDetailResponse>> getListOfUsers() {
        return ResponseEntity.ok(userService.getAllUserList()); // another way to send response with body and HttpStatus
    }


    //    GET - get single user by userId
    @GetMapping("/{userId}")
    public ResponseEntity<UserDetailResponse> getUserByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserByUserId(userId));
    }


    //    PUT - update user by userId
    @PutMapping("/{userId}")
public ResponseEntity<UserDto> updateUserByUserId(@Valid @RequestBody UserUpdateDto userUpdateDto,
                                                  @PathVariable("userId") Long uId) {
    UserDto updatedUser = userService.updateUserFromUpdateDto(userUpdateDto, uId);
    return ResponseEntity.ok(updatedUser);
}

    //    DELETE - Delete single user by userId
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse> deleteUserByUserId(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok(new ApiResponse("User with User id " + userId + " has been deleted", true));
    }

}
