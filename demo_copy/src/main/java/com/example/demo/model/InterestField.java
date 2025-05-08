package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class InterestField {
    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    private Users user;
    @Column(nullable = false)
    private String fieldName;

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

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }
}
