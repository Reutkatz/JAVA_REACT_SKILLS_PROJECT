package com.example.demo.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;
@Entity
public class Respons {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private Users user;
    @ManyToOne
    private Skill skill;
    @Column(nullable = false,length = 500)
    private String respons;
    private LocalDateTime uploadDate;

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public String getRespons() {
        return respons;
    }

    public void setRespons(String respons) {
        this.respons = respons;
    }

    public LocalDateTime getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDateTime uploadDate) {
        this.uploadDate = uploadDate;
    }
}

