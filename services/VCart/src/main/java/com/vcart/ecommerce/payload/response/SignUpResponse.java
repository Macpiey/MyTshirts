package com.vcart.ecommerce.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor

@Data
public class SignUpResponse {
    private String message;
    private String userId;
}
