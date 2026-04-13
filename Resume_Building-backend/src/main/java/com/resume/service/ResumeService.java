package com.resume.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.resume.dto.ResumeRequest;
import com.resume.entity.Resume;
import com.resume.entity.User;
import com.resume.repository.ResumeRepository;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;

    public ResumeService(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    public Resume createResume(ResumeRequest req, User user) {

        Resume resume = new Resume();
        resume.setTitle(req.getTitle());
        resume.setSummary(req.getSummary());
        resume.setPersonalInfo(req.getPersonalInfo());
        resume.setSkills(req.getSkills());
        resume.setExperience(req.getExperience());
        resume.setEducation(req.getEducation());
        resume.setProjects(req.getProjects());
        resume.setUser(user);

        return resumeRepository.save(resume);
    }

    public List<Resume> getMyResumes(User user) {
        return resumeRepository.findByUser(user);
    }

    public Resume getResumeById(Long id, User user) {
        return resumeRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
    }

    public Resume updateResume(Long id, ResumeRequest req, User user) {

        Resume resume = resumeRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        resume.setTitle(req.getTitle());
        resume.setSummary(req.getSummary());
        resume.setPersonalInfo(req.getPersonalInfo());
        resume.setSkills(req.getSkills());
        resume.setExperience(req.getExperience());
        resume.setEducation(req.getEducation());
        resume.setProjects(req.getProjects());

        return resumeRepository.save(resume);
    }
    
    public byte[] generatePdf(Long id, User user) {

        Resume resume = resumeRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        return ResumePdfGenerator.generate(resume);
    }


    public void deleteResume(Long id, User user) {
        Resume resume = getResumeById(id, user);
        resumeRepository.delete(resume);
    }
}