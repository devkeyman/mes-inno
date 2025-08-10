package com.mes.application.service;

import com.mes.adapter.in.web.security.CustomUserDetailsService;
import com.mes.adapter.in.web.security.JwtTokenProvider;
import com.mes.adapter.out.persistence.entity.User;
import com.mes.adapter.out.persistence.repository.UserRepository;
import com.mes.application.port.in.AuthUseCase;
import com.mes.common.dto.auth.LoginRequestDto;
import com.mes.common.dto.auth.LoginResponseDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService implements AuthUseCase {
    
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public AuthService(AuthenticationManager authenticationManager,
                      JwtTokenProvider tokenProvider,
                      UserRepository userRepository,
                      PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Override
    public LoginResponseDto login(LoginRequestDto loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        String jwt = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(loginRequest.getEmail());
        
        CustomUserDetailsService.CustomUserDetails userDetails = 
            (CustomUserDetailsService.CustomUserDetails) authentication.getPrincipal();
        
        User user = userRepository.findByEmail(userDetails.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        return new LoginResponseDto(
            jwt,
            refreshToken,
            userDetails.getId(),
            userDetails.getUsername(),
            userDetails.getName(),
            user.getRole() != null ? user.getRole().name() : "WORKER"
        );
    }
    
    @Override
    public LoginResponseDto refreshToken(String refreshToken) {
        if (tokenProvider.validateToken(refreshToken)) {
            String username = tokenProvider.getUsernameFromToken(refreshToken);
            User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            String newAccessToken = tokenProvider.generateTokenFromUsername(username);
            String newRefreshToken = tokenProvider.generateRefreshToken(username);
            
            return new LoginResponseDto(
                newAccessToken,
                newRefreshToken,
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getRole() != null ? user.getRole().name() : "WORKER"
            );
        }
        throw new RuntimeException("Invalid refresh token");
    }
    
    @Override
    public void logout(String email) {
        // In JWT, logout is typically handled on the client side by removing the token
        // Here we can add additional logic if needed (e.g., token blacklisting)
        SecurityContextHolder.clearContext();
    }
}