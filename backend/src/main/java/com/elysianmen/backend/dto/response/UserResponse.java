package com.elysianmen.backend.dto.response;

import com.elysianmen.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private List<String> roles;
    private LocalDateTime createdAt;
    private Boolean isActive;
    private Boolean emailVerified;

    public static UserResponse fromUser(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setPhone(user.getPhone());
        response.setRoles(user.getRoles());
        response.setCreatedAt(user.getCreatedAt());
        response.setIsActive(user.getIsActive());
        response.setEmailVerified(user.getEmailVerified());
        return response;
    }
}
