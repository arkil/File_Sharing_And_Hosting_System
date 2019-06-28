package com.example.repository;

import com.example.entity.Activity;
import org.springframework.data.repository.CrudRepository;
import java.util.List;


// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
public interface ActivityRepository extends CrudRepository<Activity, Long> {

    List<Activity> findByEmailId(String email);

}
