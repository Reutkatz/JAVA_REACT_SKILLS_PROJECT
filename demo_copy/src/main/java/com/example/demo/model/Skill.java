package com.example.demo.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Skill {
    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    private Users user;
    @Column(nullable = false)
    private String name;
    @ManyToOne
    private Category category;
    private int level;
    @Column(nullable = false)
    private LocalDateTime uploadDate;
    @Column(nullable = false)
    private int hearts;
    private String description;
    @JsonIgnore
    @OneToMany(mappedBy = "skill")
    private List<Image> images;
    @JsonIgnore
    @OneToMany(mappedBy = "skill")
    private List<Respons> responses;

    public List<Respons> getResponses() {
        return responses;
    }

    public void setResponses(List<Respons> responses) {
        this.responses = responses;
    }

    public LocalDateTime getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDateTime uploadDate) {
        this.uploadDate = uploadDate;
    }

    public int getHearts() {
        return hearts;
    }

    public void setHearts(int hearts) {
        this.hearts = hearts;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }
}
