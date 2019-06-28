package com.example.repository;

import com.example.entity.Document;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

public interface DocumentRepository extends CrudRepository<Document, Long> {

    List<Document> findByOwnerAndPath(String owner,String path);

    List<Document> findBySharedWith(String sharedWith);

}

