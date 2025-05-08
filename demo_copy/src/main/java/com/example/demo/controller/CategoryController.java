package com.example.demo.controller;

import com.example.demo.dto.CategoryDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.model.Category;
import com.example.demo.model.Users;
import com.example.demo.server.CategoryRepository;
import com.example.demo.server.MapStruct;
import com.example.demo.server.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RequestMapping("api/Categorys")
@RestController
@CrossOrigin
public class CategoryController {
    private CategoryRepository categoryRepository;
    private MapStruct mapper;

    private static String DIRECTORY_URL=System.getProperty("user.dir")+"/images/";

    public CategoryController(CategoryRepository categoryRepository, MapStruct mapper){
        this.categoryRepository=categoryRepository;
        this.mapper=mapper;
    }

    @GetMapping("/getCategorys")
    public ResponseEntity<List<Category>> getCategorys(){
        return new ResponseEntity<>(categoryRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/getCategoryById/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") long id){
        Category category=categoryRepository.findById(id).orElse(null);
        if(category==null){
            return new ResponseEntity<>(category,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(category,HttpStatus.OK);
    }

    @PostMapping("/addCategory")
    public ResponseEntity<Category> addCategory(@RequestBody Category category){
        Category newCategory=categoryRepository.save(category);
            return new ResponseEntity<>(newCategory,HttpStatus.CREATED);
    }

    @PutMapping("/updateCategory/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable("id") long id,@RequestBody Category category){
        Category newCategory=categoryRepository.findById(id).orElse(null);
        if(newCategory==null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        if(category.getId()!=id)
            return new ResponseEntity<>(null,HttpStatus.CONFLICT);
        newCategory=categoryRepository.save(category);
        return new ResponseEntity<>(category,HttpStatus.CREATED);
    }
    @DeleteMapping("/deleteCategory/{id}")
    public ResponseEntity deleteCategory(@PathVariable("id") long id){
        Category newCategory=categoryRepository.findById(id).orElse(null);
        if(newCategory==null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        categoryRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PostMapping("/upload")
    public ResponseEntity<CategoryDTO> upload(@RequestPart("category") Category category,@RequestPart("image") MultipartFile file) throws IOException {
        String imageURL=DIRECTORY_URL+file.getOriginalFilename();
        Path filePath= Paths.get(imageURL);
        Files.write(filePath,file.getBytes());
        category.setImage(imageURL);
        Category newCategory=categoryRepository.save(category);
        CategoryDTO categoryDTO= mapper.CategoryToCategoryDTO(newCategory);
        return new ResponseEntity<>(categoryDTO,HttpStatus.CREATED);
    }
    @GetMapping("/getCategorysDTO")
    public ResponseEntity<List<CategoryDTO>> getCategorysDTO() {
        return new ResponseEntity<>(mapper.CategorysToCategorysDTO(categoryRepository.findAll()),HttpStatus.OK);
    }
    @GetMapping("/getCategoryDTO/{id}")
    public ResponseEntity<CategoryDTO> getCategoryDTO(@PathVariable("id") long id) throws IOException {
        return new ResponseEntity<>(mapper.CategoryToCategoryDTO(categoryRepository.findById(id).orElse(null)),HttpStatus.OK);
    }
    
}
