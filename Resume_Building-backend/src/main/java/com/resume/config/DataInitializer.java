package com.resume.config;

import com.resume.entity.User;
import com.resume.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedDemoUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String demoEmail = "demo@example.com";
            if (userRepository.findByEmail(demoEmail).isEmpty()) {
                User demo = new User();
                demo.setEmail(demoEmail);
                demo.setPassword(passwordEncoder.encode("demo123"));
                demo.setRole("USER");
                userRepository.save(demo);
                System.out.println("✔ Demo user seeded: " + demoEmail + " / demo123");
            } else {
                System.out.println("✔ Demo user already exists: " + demoEmail);
            }
        };
    }
}
