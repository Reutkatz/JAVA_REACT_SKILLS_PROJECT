package com.example.demo.controller;


import com.example.demo.dto.ImageDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.model.Category;
import com.example.demo.model.Image;
import com.example.demo.model.Users;
import com.example.demo.server.CategoryRepository;
import com.example.demo.server.ImageRepository;
import com.example.demo.server.MapStruct;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RequestMapping("api/Images")
@RestController
@CrossOrigin
public class ImageController {
    private ImageRepository imageRepository;
    private MapStruct mapper;
    private static String DIRECTORY_URL=System.getProperty("user.dir")+"/images/";
    public ImageController(ImageRepository imageRepository, MapStruct mapper){

        this.imageRepository=imageRepository;
        this.mapper=mapper;
    }

    @GetMapping("/getImages")
    public ResponseEntity<List<Image>> getImages(){
        return new ResponseEntity<>(imageRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/getImageById/{id}")
    public ResponseEntity<Image> getImageById(@PathVariable("id") long id){
        Image image=imageRepository.findById(id).orElse(null);
        if(image==null){
            return new ResponseEntity<>(image,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(image,HttpStatus.OK);
    }

    @PostMapping("/addImage")
    public ResponseEntity<Image> addImage(@RequestBody Image image){
        Image newImage=imageRepository.save(image);
        return new ResponseEntity<>(newImage,HttpStatus.CREATED);
    }

    @PutMapping("/updateImage/{id}")
    public ResponseEntity<Image> updateImage(@PathVariable("id") long id,@RequestBody Image image){
        Image newImage=imageRepository.findById(id).orElse(null);
        if(newImage==null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        if(image.getId()!=id)
            return new ResponseEntity<>(null,HttpStatus.CONFLICT);
        newImage=imageRepository.save(image);
        return new ResponseEntity<>(image,HttpStatus.CREATED);
    }
    @DeleteMapping("/deleteImage/{id}")
    public ResponseEntity deleteImage(@PathVariable("id") long id){
        Image newImage=imageRepository.findById(id).orElse(null);
        if(newImage==null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        imageRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping(value = "/upload")
    public ResponseEntity<ImageDTO> upload(@RequestPart("image") Image image, @RequestPart("file") MultipartFile file) throws IOException {
        String imageURL=DIRECTORY_URL+file.getOriginalFilename();
        Path filePath= Paths.get(imageURL);
        Files.write(filePath,file.getBytes());
        image.setImage(imageURL);
        Image newImage=imageRepository.save(image);
        ImageDTO imageDTO= mapper.ImageToImageDTO(newImage);
        return new ResponseEntity<>(imageDTO,HttpStatus.CREATED);
    }
    @GetMapping("/getImagesDTO")
    public ResponseEntity<List<ImageDTO>> getImagesDTO() {
        return new ResponseEntity<>(mapper.ImagesToImagesDTO(imageRepository.findAll()),HttpStatus.OK);
    }
    @GetMapping("/getImageDTO/{id}")
    public ResponseEntity<ImageDTO> getUserDTO(@PathVariable("id") long id) throws IOException {
        return new ResponseEntity<>(mapper.ImageToImageDTO(imageRepository.findById(id).orElse(null)),HttpStatus.OK);
    }
}
