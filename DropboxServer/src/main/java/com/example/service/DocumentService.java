package com.example.service;

import com.example.entity.Document;
import com.example.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentService {
    @Autowired
    private DocumentRepository documentRepository;

    public void addDocument(Document document){
        documentRepository.save(document);
    }

    public List<Document> getDocs(String owner, String path){
        return documentRepository.findByOwnerAndPath(owner,path);
    }

    public List<Document> getSharedDocs(String sharedWith){
        return documentRepository.findBySharedWith(sharedWith);
    }
}