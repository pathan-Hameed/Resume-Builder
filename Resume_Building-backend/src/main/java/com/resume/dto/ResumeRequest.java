package com.resume.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResumeRequest {

    private String title;
    private String summary;
    private String personalInfo;
    private String skills;
    private String experience;
    private String education;
    private String projects;

    // getters & setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getPersonalInfo() { return personalInfo; }
    public void setPersonalInfo(String personalInfo) { this.personalInfo = personalInfo; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getProjects() { return projects; }
    public void setProjects(String projects) { this.projects = projects; }
}
