package com.resume.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET =
            "this_is_a_very_long_secure_secret_key_for_jwt_resume_builder_2026";

    private static final long EXPIRATION = 1000 * 60 * 60 * 24; // 1 day

    private SecretKey key() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(String email, Long userId) {
        return Jwts.builder()
                .setSubject(email)
                .claim("userId", userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    public Long extractUserId(String token) {
        return getClaims(token).get("userId", Long.class);
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(key())          // ✅ REQUIRED in 0.12.x
                .build()
                .parseSignedClaims(token)   // ✅ NOT parseClaimsJws
                .getPayload();              // ✅ payload, not body
    }
    public String extractUsername(String token) {
        String username = getClaims(token).getSubject();

        if (username == null) {
            throw new RuntimeException("JWT does not contain subject");
        }

        return username;
    }


    
    
}
