package com.example.demo.dto;

import com.example.demo.model.InterestField;

import java.util.List;

public class UserDTO {
 private long id;
 private String userName;
 private String email;
 private String password;
 private String phoneNumber;
 private String country;
 private String about;
 private List<InterestField> interestFields;
 private byte[] image;

 public String getCountry() {
  return country;
 }

 public void setCountry(String country) {
  this.country = country;
 }

 public List<InterestField> getInterestFields() {
  return interestFields;
 }

 public long getId() {
  return id;
 }

 public void setId(long id) {
  this.id = id;
 }

 public String getUserName() {
  return userName;
 }

 public void setUserName(String userName) {
  this.userName = userName;
 }

 public String getEmail() {
  return email;
 }

 public void setEmail(String email) {
  this.email = email;
 }

 public String getPassword() {
  return password;
 }

 public void setPassword(String password) {
  this.password = password;
 }

 public String getAbout() {
  return about;
 }

 public void setAbout(String about) {
  this.about = about;
 }

 public List<InterestField> getInterestFields(List<InterestField> interestFields) {
  return this.interestFields;
 }

 public void setInterestFields(List<InterestField> interestFields) {
  this.interestFields = interestFields;
 }

 public String getPhoneNumber() {
  return phoneNumber;
 }

 public void setPhoneNumber(String phoneNumber) {
  this.phoneNumber = phoneNumber;
 }

 public byte[] getImage() {
  return image;
 }

 public void setImage(byte[] image) {
  this.image = image;
 }
}
