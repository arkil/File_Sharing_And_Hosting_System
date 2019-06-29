package com.example.service;

import com.example.entity.Groups;
import com.example.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;

    public List<Groups> getAllMembers(String name){
        return groupRepository.findByGroupName(name);
    }

    public void addMember(Groups groupsMember){
        groupRepository.save(groupsMember);
    }

    public List<Groups> checkMemberExists(String email){
        return groupRepository.findByEmail(email);
    }

}