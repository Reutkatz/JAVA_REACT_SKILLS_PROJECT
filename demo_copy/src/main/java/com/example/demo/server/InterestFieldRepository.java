package com.example.demo.server;

import com.example.demo.model.InterestField;
import com.example.demo.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterestFieldRepository extends JpaRepository<InterestField,Long> {
    InterestField findByfieldName(String fieldName);
}
