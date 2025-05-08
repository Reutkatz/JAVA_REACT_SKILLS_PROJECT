package com.example.demo.server;//package com.example.demo.server;

import com.example.demo.dto.CategoryDTO;
import com.example.demo.dto.ImageDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.model.Category;
import com.example.demo.model.Image;
import com.example.demo.model.Users;
import org.mapstruct.Mapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Mapper(componentModel="spring")
public interface MapStruct {
    List<UserDTO> UsersToUsersDTO(List<Users> users);
    default UserDTO UserToUserDTO(Users user) throws IOException {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUserName(user.getUserName());
        userDTO.setPassword(user.getPassword());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setCountry(user.getCountry());
        userDTO.setAbout(user.getAbout());
        userDTO.setInterestFields(user.getInterestFields());
        if (user.getImage() != null && Files.exists(Paths.get(user.getImage()))) {
        Path filePath= Paths.get(user.getImage());
        userDTO.setImage(Files.readAllBytes(filePath));
        } else {
            userDTO.setImage(new byte[0]);
        }
        return userDTO;
    }
    List<CategoryDTO> CategorysToCategorysDTO(List<Category> users);
    default CategoryDTO CategoryToCategoryDTO(Category category) throws IOException {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());
        categoryDTO.setDescription(category.getDescription());
        if (category.getImage() != null && Files.exists(Paths.get(category.getImage()))) {
            Path filePath= Paths.get(category.getImage());
            categoryDTO.setImage(Files.readAllBytes(filePath));
        } else {
            categoryDTO.setImage(new byte[0]);
        }
        return categoryDTO;
    }
    List<ImageDTO> ImagesToImagesDTO(List<Image> users);
    default ImageDTO ImageToImageDTO(Image image) throws IOException {
        ImageDTO imageDTO = new ImageDTO();
        imageDTO.setId(image.getId());
        imageDTO.setSkill(image.getSkill());
        if (image.getImage() != null && Files.exists(Paths.get(image.getImage()))) {
            Path filePath= Paths.get(image.getImage());
            imageDTO.setImage(Files.readAllBytes(filePath));
        } else {
            imageDTO.setImage(new byte[0]);
        }
        return imageDTO;
    }


}
