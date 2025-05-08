package com.example.demo.controller;

import com.example.demo.dto.UserDTO;
import com.example.demo.model.Users;
import com.example.demo.security.CustomUserDetails;
import com.example.demo.security.jwt.JwtUtils;
import com.example.demo.server.MapStruct;
import com.example.demo.server.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RequestMapping("api/Users")
@RestController
@CrossOrigin
public class UserController {
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private MapStruct mapper;
    private static String DIRECTORY_URL=System.getProperty("user.dir")+"/images/";
    public UserController(UserRepository userRepository, MapStruct mapper){

        this.userRepository=userRepository;
        this.mapper=mapper;
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<Users>> getUsers(){
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable("id") long id){
        Users user=userRepository.findById(id).orElse(null);
        if(user==null){
            return new ResponseEntity<>(user,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user,HttpStatus.OK);
    }
    @PostMapping("/LogIn")
    public ResponseEntity<?> LogIn(@RequestBody Users u){
        Authentication authentication=authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(u.getUserName(),u.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        CustomUserDetails userDetails=(CustomUserDetails)authentication.getPrincipal();
        ResponseCookie jwtCookie=jwtUtils.generateJwtCookie(userDetails);
        Users user=userRepository.findByUserName(u.getUserName());
        Long userId = user.getId();
        if(userId == null) {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND);
        }
        Users foundUser = userRepository.findById(userId).orElse(null);
        System.out.println("User found: " + foundUser.getPassword());
        if(foundUser == null || foundUser.getPassword().equals(u.getPassword())) {
            return new ResponseEntity<>( HttpStatus.UNAUTHORIZED);
        }
        System.out.println(u);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,jwtCookie.toString())
                .body(user);
    }

    @PostMapping("/addUser")
    public ResponseEntity<?> addUser(@RequestBody Users u) {
     try {
        System.out.println("in sign up");
        Users u1 = userRepository.findByUserName(u.getUserName());
        if (u1 != null){
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        u.setPassword(new BCryptPasswordEncoder(8).encode(u.getPassword()));
        userRepository.save(u);
        return ResponseEntity.ok(u);
    }catch (Exception e) {
        System.out.println("Error occurred: " + e.getMessage());
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }


    @PutMapping("/updateUser/{id}")
    public ResponseEntity<Users> updateUser(@PathVariable("id") long id,@RequestBody Users user){
        Users newUser=userRepository.findById(id).orElse(null);
        if(newUser==null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        if(user.getId()!=id)
            return new ResponseEntity<>(null,HttpStatus.CONFLICT);
        user.setImage(newUser.getImage());
        newUser=userRepository.save(user);
        return new ResponseEntity<>(user,HttpStatus.CREATED);
    }
    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity deleteUser(@PathVariable("id") long id){
        Users newUser=userRepository.findById(id).orElse(null);
        if(newUser==null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        userRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PostMapping("/upload")
    public ResponseEntity<UserDTO> upload(@RequestPart("user") Users user,@RequestPart("image") MultipartFile file) throws IOException {
        String imageURL=DIRECTORY_URL+file.getOriginalFilename();
        Path filePath= Paths.get(imageURL);
        Files.write(filePath,file.getBytes());
        user.setImage(imageURL);
        Users newUser=userRepository.save(user);
        UserDTO userDTO= mapper.UserToUserDTO(newUser);
        return new ResponseEntity<>(userDTO,HttpStatus.CREATED);
    }
    @GetMapping("/getUsersDTO")
    public ResponseEntity<List<UserDTO>> getUsersDTO() {
        return new ResponseEntity<>(mapper.UsersToUsersDTO(userRepository.findAll()),HttpStatus.OK);
    }
    @GetMapping("/getUserDTO/{id}")
    public ResponseEntity<UserDTO> getUserDTO(@PathVariable("id") long id) throws IOException {
        return new ResponseEntity<>(mapper.UserToUserDTO(userRepository.findById(id).orElse(null)),HttpStatus.OK);
    }
    @PostMapping("/signout")
    public ResponseEntity<?> signOut(){
        ResponseCookie cookie=jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString())
                .body("you've been signed out!");
    }
}
