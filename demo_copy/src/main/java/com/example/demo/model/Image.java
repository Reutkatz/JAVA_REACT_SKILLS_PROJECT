package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Image {
    @Id
    @GeneratedValue
    private long id;
    @Column(nullable = false)
    private String image;
    @ManyToOne
    private Skill skill;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }
}
