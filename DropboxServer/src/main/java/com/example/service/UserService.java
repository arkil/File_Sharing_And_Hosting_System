package com.example.service;

import com.example.entity.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }

    public void addUser(User user){
        userRepository.save(user);
    }

    public List<User> checkUserExists(String email){
        return userRepository.findByEmail(email);
    }

    public List<User> login(String email,String password){
        return userRepository.findByEmailAndPassword(email,password);
    }
}