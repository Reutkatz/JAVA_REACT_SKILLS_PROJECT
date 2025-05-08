package com.example.demo.server;

import com.example.demo.model.Respons;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponsRepository extends JpaRepository<Respons,Long> {
}
