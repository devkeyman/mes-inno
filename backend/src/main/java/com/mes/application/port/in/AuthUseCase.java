package com.mes.application.port.in;

import com.mes.common.dto.auth.LoginRequestDto;
import com.mes.common.dto.auth.LoginResponseDto;

public interface AuthUseCase {
    LoginResponseDto login(LoginRequestDto loginRequest);
    LoginResponseDto refreshToken(String refreshToken);
    void logout(String email);
}