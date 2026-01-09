package com.elysianmen.backend.service;

import com.elysianmen.backend.dto.request.LoginRequest;
import com.elysianmen.backend.dto.request.RegisterRequest;
import com.elysianmen.backend.dto.response.AuthResponse;
import com.elysianmen.backend.dto.response.UserResponse;

public interface IAuthService {

    AuthResponse login(LoginRequest loginRequest);

    AuthResponse register(RegisterRequest registerRequest);

    UserResponse getCurrentUser(String email);
}
