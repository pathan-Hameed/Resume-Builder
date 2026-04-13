package com.resume.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResumeResponse {

    private Long id;
    private String title;
    private String personalInfo;
    private String skills;
    private String education;
    private String experience;
    private String projects;
}
