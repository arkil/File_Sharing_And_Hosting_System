package com.example.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String overview;

    private String work;

    private String education;

    private String contactInfo;

    private String lifeEvents;

    public User(){

    }

    public User(String firstName, String lastName, String email, String password, String overview, String work, String education, String contactInfo, String lifeEvents){
        this.firstName = firstName;
        this.lastName =lastName;
        this.email =email;
        this.password=password;
        this.overview=overview;
        this.work=work;
        this.education=education;
        this.contactInfo=contactInfo;
        this.lifeEvents=lifeEvents;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getWork() {
        return work;
    }

    public void setWork(String work) {
        this.work = work;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    public String getLifeEvents() {
        return lifeEvents;
    }

    public void setLifeEvents(String lifeEvents) {
        this.lifeEvents = lifeEvents;
    }

}