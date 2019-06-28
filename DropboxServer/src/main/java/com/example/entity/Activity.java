package com.example.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity // This tells Hibernate to make a table out of this class
public class Activity {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String activityName;

    private String docName;

    private Timestamp timeStamp;

    private String emailId;

    public Activity(){

    }

    public Activity(String activityName, String docName, String emailId){
        this.activityName = activityName;
        this.docName = docName;
        this.timeStamp = new Timestamp(System.currentTimeMillis());
        this.emailId = emailId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public String getDocName() {
        return docName;
    }

    public void setDocName(String docName) {
        this.docName = docName;
    }

    public Timestamp getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Timestamp timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }
}
