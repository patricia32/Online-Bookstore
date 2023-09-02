package com.example.ps_proiect1.service;

import com.example.ps_proiect1.model.Author;
import org.springframework.stereotype.Component;

@Component
public interface AuthorService {
    Author findAuthorByName(String name);
    Author findAuthorById(Long id);
    void saveAuthor(Author author);
    void updateAuthor(Author author);
    void deleteAuthorById(Author author);
}
