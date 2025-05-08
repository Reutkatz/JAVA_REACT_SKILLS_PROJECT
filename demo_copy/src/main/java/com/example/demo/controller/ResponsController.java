package com.example.demo.controller;

import com.example.demo.model.Respons;
import com.example.demo.server.ResponsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/Responses")
@RestController
@CrossOrigin
public class ResponsController {
    private ResponsRepository responsRepository;

    public ResponsController(ResponsRepository responsRepository){
        this.responsRepository=responsRepository;
    }

    @GetMapping("/getResponses")
    public ResponseEntity<List<Respons>> getResponses(){
        return new ResponseEntity<>(responsRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/getResponsById/{id}")
    public ResponseEntity<Respons> getResponsById(@PathVariable("id") long id){
        Respons respons=responsRepository.findById(id).orElse(null);
        if(respons==null){
            return new ResponseEntity<>(respons,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(respons,HttpStatus.OK);
    }

    @PostMapping("/addRespons")
    public ResponseEntity<Respons> addRespons(@RequestBody Respons respons){
        Respons newRespons=responsRepository.save(respons);
        return new ResponseEntity<>(newRespons,HttpStatus.CREATED);
    }

    @PutMapping("/updateRespons/{id}")
    public ResponseEntity<Respons> updateRespons(@PathVariable("id") long id,@RequestBody Respons respons){
        Respons newRespons=responsRepository.findById(id).orElse(null);
        if(newRespons==null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        if(respons.getId()!=id)
            return new ResponseEntity<>(null,HttpStatus.CONFLICT);
        newRespons=responsRepository.save(respons);
        return new ResponseEntity<>(respons,HttpStatus.CREATED);
    }
    @DeleteMapping("/deleteRespons/{id}")
    public ResponseEntity deleteRespons(@PathVariable("id") long id){
        Respons newRespons=responsRepository.findById(id).orElse(null);
        if(newRespons==null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        responsRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
