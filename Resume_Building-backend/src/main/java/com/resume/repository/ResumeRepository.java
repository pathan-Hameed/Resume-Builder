package com.resume.repository;

import com.resume.entity.Resume;
import com.resume.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

import com.resume.entity.Resume;
import com.resume.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    List<Resume> findByUser(User user);

    Optional<Resume> findByIdAndUser(Long id, User user);
}
