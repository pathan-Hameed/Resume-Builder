package com.resume.controller;

import org.springframework.http.MediaType;

import com.resume.dto.ResumeRequest;
import com.resume.entity.Resume;
import com.resume.entity.User;
import com.resume.service.ResumeService;
import com.resume.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeController {

    private final ResumeService resumeService;
    private final UserService userService;

    public ResumeController(ResumeService resumeService, UserService userService) {
        this.resumeService = resumeService;
        this.userService = userService;
    }

    private User currentUser(Authentication auth) {
        return userService.findByEmail(auth.getName());
    }

    @PostMapping
    public Resume create(@RequestBody ResumeRequest req, Authentication auth) {
        return resumeService.createResume(req, currentUser(auth));
    }

    @GetMapping
    public List<Resume> myResumes(Authentication auth) {
        return resumeService.getMyResumes(currentUser(auth));
    }

    @GetMapping("/{id}")
    public Resume get(@PathVariable Long id, Authentication auth) {
        return resumeService.getResumeById(id, currentUser(auth));
    }

    @PutMapping("/{id}")
    public Resume update(
            @PathVariable Long id,
            @RequestBody ResumeRequest req,
            Authentication auth
    ) {
        return resumeService.updateResume(id, req, currentUser(auth));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, Authentication auth) {
        resumeService.deleteResume(id, currentUser(auth));
    }
    
    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> downloadPdf(
            @PathVariable Long id,
            Authentication auth
    ) {
        User user = userService.findByEmail(auth.getName());
        byte[] pdf = resumeService.generatePdf(id, user);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=resume.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

}
