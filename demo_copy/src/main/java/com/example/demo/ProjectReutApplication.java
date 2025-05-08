package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ProjectReutApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectReutApplication.class, args);
		System.out.println(new BCryptPasswordEncoder(8).encode("1212"));

	}

}
