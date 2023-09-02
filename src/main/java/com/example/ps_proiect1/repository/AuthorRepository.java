package com.example.ps_proiect1.repository;

import com.example.ps_proiect1.model.Author;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends CrudRepository<Author, Long> {
    Author findAuthorByName(String name);
    Author findAuthorById(Long id);
}
