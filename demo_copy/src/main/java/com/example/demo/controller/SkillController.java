package com.example.demo.controller;

import com.example.demo.model.Skill;
import com.example.demo.server.SkillRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/Skills")
@RestController
@CrossOrigin
public class SkillController {
    private SkillRepository skillRepository;

    public SkillController(SkillRepository skillRepository){
        this.skillRepository=skillRepository;
    }

    @GetMapping("/getSkills")
    public ResponseEntity<List<Skill>> getSkills(){
        return new ResponseEntity<>(skillRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/getSkillById/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable("id") long id){
        Skill skill=skillRepository.findById(id).orElse(null);
        if(skill==null){
            return new ResponseEntity<>(skill,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(skill,HttpStatus.OK);
    }

    @PostMapping("/addSkill")
    public ResponseEntity<Skill> addSkill(@RequestBody Skill skill){
        Skill newSkill=skillRepository.save(skill);
        return new ResponseEntity<>(newSkill,HttpStatus.CREATED);
    }

    @PutMapping("/updateSkill/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable("id") long id,@RequestBody Skill skill){
        Skill newSkill=skillRepository.findById(id).orElse(null);
        if(newSkill==null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        if(skill.getId()!=id)
            return new ResponseEntity<>(null,HttpStatus.CONFLICT);
        newSkill=skillRepository.save(skill);
        return new ResponseEntity<>(skill,HttpStatus.CREATED);
    }
    @DeleteMapping("/deleteSkill/{id}")
    public ResponseEntity deleteSkill(@PathVariable("id") long id){
        Skill newSkill=skillRepository.findById(id).orElse(null);
        if(newSkill==null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        skillRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("/addHeart/{id}")
    public ResponseEntity<Skill> addHeart(@PathVariable("id") long id){
        Skill newSkill=skillRepository.findById(id).orElse(null);
        if(newSkill==null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        newSkill.setHearts(newSkill.getHearts()+1);
        skillRepository.save(newSkill);
        return new ResponseEntity<>(newSkill,HttpStatus.CREATED);
    }
}

