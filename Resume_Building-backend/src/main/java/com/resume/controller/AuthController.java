package com.resume.controller;

import com.resume.entity.User;
import com.resume.service.UserService;
import com.resume.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService,
                          AuthenticationManager authManager,
                          JwtUtil jwtUtil) {
        this.userService = userService;
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User saved = userService.register(user);
            String token = jwtUtil.generateToken(saved.getEmail(), saved.getId());
            return ResponseEntity.ok(token);
        } catch (Exception e) {
            String msg = e.getMessage();
            if (msg != null && msg.contains("Duplicate")) {
                return ResponseEntity.badRequest().body("Email already registered. Please use a different email or login.");
            }
            return ResponseEntity.badRequest().body("Registration failed. Please try again.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
    	System.out.println("Login attempt for email: " + user.getEmail());

        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        user.getPassword()
                )
        );

        User dbUser = userService.findByEmail(user.getEmail());

        String token =
                jwtUtil.generateToken(dbUser.getEmail(), dbUser.getId());

        return ResponseEntity.ok(token);
    }
}
