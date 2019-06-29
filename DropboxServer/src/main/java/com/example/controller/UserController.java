package com.example.controller;

import com.example.entity.Activity;
import com.example.entity.Document;
import com.example.entity.User;

import com.example.service.ActivityService;
import com.example.service.DocumentService;
import com.example.service.UserService;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/user") // This means URL's start with /demo (after Application path)
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private DocumentService documentService;
    @Autowired
    private ActivityService activityService;

    private String email = "";

    private String CurrentFolder = "";

    @PostMapping(path="/fileActions/uploadFile")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, HttpSession session) {
        System.out.println("In file upload -");
        if (file.isEmpty()) {
            System.out.println("!!No file selected!!");
            Map m = new HashMap();
            m.put("status", 401);
            System.out.println(m);
            return new ResponseEntity(m,HttpStatus.UNAUTHORIZED);
        }

        try {

            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            Path path = Paths.get(Paths.get("").toAbsolutePath().toString()+CurrentFolder+"\\"+ file.getOriginalFilename());
            Files.write(path, bytes);
            activityService.addActivity(new Activity("Uploaded File",file.getOriginalFilename(),email));
            documentService.addDocument(new Document(file.getOriginalFilename(),"file",email,CurrentFolder,false,"N/A"));
            System.out.println("message - You successfully uploaded '" + file.getOriginalFilename() + "'");

        }
        catch (IOException e) {
            e.printStackTrace();
        }

        Map m = new HashMap();
        m.put("status", 200);
        System.out.println(m);
        return new ResponseEntity(m,HttpStatus.OK);
    }

    @PostMapping(path="/folderAction/createFolder",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createFolder(@RequestBody String fldr, HttpSession session)
    {
        JSONObject jsonObject = new JSONObject(fldr);
        String folder= (jsonObject.getString("foldername"));
        System.out.println("Folder: "+folder);
        System.out.println("Folder - Name : "+folder);

//        Check whether folder exists or not

            try{

                File f;
                boolean bool;

                System.out.println("Path of folder - " +Paths.get("").toAbsolutePath().toString()+CurrentFolder+"\\"+ folder);

                // returns pathnames for files and directory
                f = new File(Paths.get("").toAbsolutePath().toString()+CurrentFolder+"\\"+ folder);

                // create
                bool = f.mkdir();

                // print
                System.out.print("Directory created ? "+bool);

            } catch(Exception e) {
                // if any error occurs
                e.printStackTrace();
            }
            activityService.addActivity(new Activity("Created File",folder,email));
            documentService.addDocument(new Document(folder,"folder",email,CurrentFolder,false,"N/A"));
            Map m = new HashMap();
            m.put("status", 201);
            System.out.println(m);
            return new ResponseEntity(m,HttpStatus.CREATED);
//        }
    }

    @PostMapping(path="/getDocs",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getDocs(@RequestBody String data)
    {
        System.out.println("In getDocs");
        System.out.println("Data: "+data);
        List<Document> l= documentService.getDocs(email,CurrentFolder);
        System.out.println("List "+ l);
        return new ResponseEntity(l,HttpStatus.OK);
    }

    @PostMapping(path="/shareDoc",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> shareDocs(@RequestBody String data)
    {
        System.out.println("In ShareDocs -");
        JSONObject jsonObject = new JSONObject(data);
        System.out.println("Document: "+jsonObject);
        String name = jsonObject.getString("name");
        String type = jsonObject.getString("type");
        String shareWith = jsonObject.getString("shareWith");
        String path = jsonObject.getString("path");
        System.out.println("ShareWith: "+shareWith);
        documentService.addDocument(new Document(name,type,email,path,false,shareWith));
        activityService.addActivity(new Activity("Shared "+name+" with"+shareWith,name,email));
//      List<Document> l= documentService.getDocs(email,CurrentFolder);
        Map m = new HashMap();
        m.put("message"," !! Shared "+name+" with "+shareWith+" !! ");
        m.put("status", 200);
        System.out.println(m);
        return new ResponseEntity(m,HttpStatus.OK);
    }

    @PostMapping(path="/getSharedDoc",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getShareDocs(@RequestBody String data)
    {
        System.out.println("In getShareDocs -");
        System.out.println("Data: "+data);
        List<Document> l= documentService.getSharedDocs(email);
        System.out.println("List "+ l);
        return new ResponseEntity(l,HttpStatus.OK);
    }

        @PostMapping(path="/createGroup",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createGroup(@RequestBody String data)
    {
        JSONObject jsonObject = new JSONObject(data);
        Map m = new HashMap();
        m.put("status", 200);
        System.out.println(m);
        return new ResponseEntity(m,HttpStatus.OK);
    }

    @PostMapping(path="/getActivity",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getActivity(HttpSession session)
    {
        System.out.println("User: "+(session.getAttribute("name")).toString());
        List<Activity> a= activityService.getUserActivity((session.getAttribute("name")).toString());
        System.out.println("Activities - "+ a);
        return new ResponseEntity(a,HttpStatus.OK);
    }

    @PostMapping(path="/signUp",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> signup(@RequestBody String user, HttpSession session)
    {
        JSONObject jsonObject = new JSONObject(user);
        System.out.println("User: "+user);
        List<User> l= userService.checkUserExists(jsonObject.getString("email"));
        System.out.println("List "+ l);
        if(l.size() >= 1){
            System.out.println("!!User Already Exists!!");
            Map m = new HashMap();
            m.put("status", 403);
            System.out.println(m);
            return new ResponseEntity(m,HttpStatus.FORBIDDEN);
        }
        else{
            email = jsonObject.getString("email");
            session.setAttribute("name",jsonObject.getString("email"));
            System.out.println("User Added");
            userService.addUser(new User(jsonObject.getString("firstName"),jsonObject.getString("lastName"),jsonObject.getString("email"),jsonObject.getString("password"),jsonObject.getString("overview"),jsonObject.getString("work"),jsonObject.getString("education"),jsonObject.getString("contactInfo"),jsonObject.getString("lifeEvents")));
            try {

                File f;
                boolean bool;

                Path currentRelativePath = Paths.get("");
                String s = currentRelativePath.toAbsolutePath().toString();
                System.out.println("Current relative path is: " + s+"\n Absolute path is"+s+"\\src\\public\\upload\\"+jsonObject.getString("email"));

                // returns pathnames for files and directory
                f = new File(s+"\\src\\public\\upload\\"+jsonObject.getString("email"));

                // create
                bool = f.mkdir();

                // print
                System.out.print("Directory created ? "+bool);

            } catch(Exception e) {

                // if any error occurs
                e.printStackTrace();
            }
            CurrentFolder = "\\src\\public\\upload\\"+email+"\\";
            activityService.addActivity(new Activity("Signed Up","N/A",jsonObject.getString("email")));
            Map m = new HashMap();
            m.put("email", jsonObject.getString("email"));
            m.put("username", jsonObject.getString("firstName"));
            m.put("status", 201);
            System.out.println(m);
            return new ResponseEntity(m,HttpStatus.CREATED);
        }
    }

    @PostMapping(path="/signIn",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody String user, HttpSession session)
    {
        JSONObject jsonObject = new JSONObject(user);
        System.out.println("User: "+user);
        email = jsonObject.getString("username");
        session.setAttribute("name",jsonObject.getString("username"));
        List<User> l= userService.login(jsonObject.getString("username"),jsonObject.getString("password"));
        System.out.println("List "+ l);
        String email = "";
        Map m = new HashMap();
        for(User u:l){
            email = u.getEmail();
            System.out.println(u.getEmail());
            System.out.println(u.getFirstName());
            m.put("email",u.getEmail());
            m.put("username", u.getFirstName());
            m.put("status", 200);
            System.out.println(m);
        }
        if(l.size() == 1){
            CurrentFolder = "\\src\\public\\upload\\"+email+"\\";
            activityService.addActivity(new Activity("Signed In","N/A",email));
            return new ResponseEntity(m,HttpStatus.OK);
        }
        else{
            m = new HashMap();
            m.put("status", 401);
            return new ResponseEntity(m,HttpStatus.UNAUTHORIZED);
        }
    }

    // check why session doesn't get deleted
    @GetMapping(value = "/signOut")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> logout(HttpSession session) {
        System.out.println(" In signOut "+session.getAttribute("name"));
        activityService.addActivity(new Activity("Signed Out","N/A",(session.getAttribute("name")).toString()));
        session.invalidate();
        Map m = new HashMap();
        m.put("status", 200);
        System.out.println(m);
        return new ResponseEntity(m,HttpStatus.OK);
    }

    @PostMapping(path="/loadTest")
    public ResponseEntity<?> loadTest()
    {
        System.out.println("In /user/loadTest for load testing");
        List<Activity> a= activityService.getUserActivity("mike@gmail.com");
        System.out.println("Activities - "+ a);
        return new ResponseEntity(a,HttpStatus.OK);
    }
}