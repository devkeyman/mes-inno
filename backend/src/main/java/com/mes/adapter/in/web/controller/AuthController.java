package com.mes.adapter.in.web.controller;

import com.mes.application.port.in.AuthUseCase;
import com.mes.common.dto.auth.LoginRequestDto;
import com.mes.common.dto.auth.LoginResponseDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {
    
    private final AuthUseCase authUseCase;
    
    public AuthController(AuthUseCase authUseCase) {
        this.authUseCase = authUseCase;
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto loginRequest) {
        LoginResponseDto response = authUseCase.login(loginRequest);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<LoginResponseDto> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        LoginResponseDto response = authUseCase.refreshToken(refreshToken);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        authUseCase.logout(email);
        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }
}