package com.example.demo.controller;

import com.example.demo.model.InterestField;
import com.example.demo.model.Users;
import com.example.demo.server.InterestFieldRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("api/InterestFields")
@RestController
@CrossOrigin
public class InterestFieldController {
    private InterestFieldRepository interestFieldRepository;

    public InterestFieldController(InterestFieldRepository interestFieldRepository){
        this.interestFieldRepository=interestFieldRepository;
    }

    @GetMapping("/getInterestFields")
    public ResponseEntity<List<InterestField>> getInterestFields(){
        return new ResponseEntity<>(interestFieldRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/getInterestFieldById/{id}")
    public ResponseEntity<InterestField> getInterestFieldById(@PathVariable("id") long id){
        InterestField interestField=interestFieldRepository.findById(id).orElse(null);
        if(interestField==null){
            return new ResponseEntity<>(interestField,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(interestField,HttpStatus.OK);
    }

    @GetMapping("/getInterestFieldByName/{name}")
    public ResponseEntity<InterestField> getInterestFieldByName(@PathVariable("name") String name, @RequestParam("userName") String userName) {
        InterestField interestField=interestFieldRepository.findByfieldName(name);
        if(interestField.getUser().getUserName().equals(userName)){
             return new ResponseEntity<>(interestField, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PostMapping("/addInterestField")
    public ResponseEntity<InterestField> addInterestField(@RequestBody InterestField interestField){
        InterestField newInterestField=interestFieldRepository.save(interestField);
        return new ResponseEntity<>(newInterestField,HttpStatus.CREATED);
    }

    @PutMapping("/updateInterestField/{id}")
    public ResponseEntity<InterestField> updateInterestField(@PathVariable("id") long id,@RequestBody InterestField interestField){
        InterestField newInterestField=interestFieldRepository.findById(id).orElse(null);
        if(newInterestField==null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        if(interestField.getId()!=id)
            return new ResponseEntity<>(null,HttpStatus.CONFLICT);
        newInterestField=interestFieldRepository.save(interestField);
        return new ResponseEntity<>(interestField,HttpStatus.CREATED);
    }
    @DeleteMapping("/deleteInterestField/{id}")
    public ResponseEntity deleteInterestField(@PathVariable("id") long id){
        InterestField newInterestField=interestFieldRepository.findById(id).orElse(null);
        if(newInterestField==null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        interestFieldRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
