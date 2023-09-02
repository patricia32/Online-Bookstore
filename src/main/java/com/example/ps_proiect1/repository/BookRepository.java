package com.example.ps_proiect1.repository;

import com.example.ps_proiect1.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {
    Book findByTitle(String title);
    Book findBookById(Long id);
    Book findBookByTitleAndAndAuthor_Name(String title, String author);
    ArrayList<Book> findAll();
    void deleteBookById(Long id);
}
