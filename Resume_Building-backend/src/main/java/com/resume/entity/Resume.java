package com.resume.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "resume")
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String summary;

    @Column(name = "personal_info", length = 2000)
    private String personalInfo;

    private String skills;

    @Column(length = 2000)
    private String experience;

    @Column(length = 2000)
    private String education;

    @Column(length = 2000)
    private String projects;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // getters & setters
    public Long getId() { return id; }

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

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}