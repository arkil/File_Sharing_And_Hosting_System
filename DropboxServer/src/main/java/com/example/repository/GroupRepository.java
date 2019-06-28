package com.example.repository;

import com.example.entity.Groups;
import org.springframework.data.repository.CrudRepository;
import java.util.List;


// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
public interface GroupRepository extends CrudRepository<Groups, Long> {

    List<Groups> findByEmail(String email);

    List<Groups> findByGroupName(String name);

}
