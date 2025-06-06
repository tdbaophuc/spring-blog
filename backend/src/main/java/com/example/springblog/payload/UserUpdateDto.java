package com.example.springblog.payload;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@NoArgsConstructor
@Getter
@Setter
public class UserUpdateDto {
    @NotBlank
    @Size(min = 3, max = 100, message = "User name must be minimum 4 characters and max 100 characters")
    private String name;

    @NotBlank
    @Size(min = 4, max = 500, message = "About must be minimum 4 characters and max 500 characters")
    private String about;

    @Email(message = "Valid email required!")
    private String email;

    // Không có trường password, tức là client không cần gửi password khi cập nhật
}
