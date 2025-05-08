package com.example.demo.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Users {
    @Id
    @GeneratedValue
    private long id;
    @Column(nullable = false)
    private String userName;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String phoneNumber;
    @Column(nullable = false)
    private String country;
    private String image;
    @Column(length = 500)
    private String about;
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Skill> skills;
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Respons> responses;
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<InterestField> interestFields;

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }

    public List<Respons> getResponses() {
        return responses;
    }

    public void setResponses(List<Respons> responses) {
        this.responses = responses;
    }

    public List<InterestField> getInterestFields() {
        return interestFields;
    }

    public void setInterestFields(List<InterestField> interestFields) {
        this.interestFields = interestFields;
    }
}
