package com.example.ps_proiect1.service.impl;

import com.example.ps_proiect1.model.Author;
import com.example.ps_proiect1.model.Book;
import com.example.ps_proiect1.model.Publisher;
import com.example.ps_proiect1.repository.AuthorRepository;
import com.example.ps_proiect1.repository.BookRepository;
import com.example.ps_proiect1.repository.PublisherRepository;
import com.example.ps_proiect1.service.AuthorService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;
    private final BookRepository bookRepository;
    private final PublisherRepository publisherRepository;
    private BookServiceImpl bookServiceImpl;

    public AuthorServiceImpl(AuthorRepository authorRepository, BookRepository bookRepository, PublisherRepository publisherRepository) {
        this.authorRepository = authorRepository;
        this.bookRepository = bookRepository;
        this.publisherRepository = publisherRepository;
    }


    @Override
    public void saveAuthor(Author author) {
        this.authorRepository.save(author);
    }

    @Override
    public Author findAuthorByName(String name) {
        return this.authorRepository.findAuthorByName(name);
    }

    @Override
    public Author findAuthorById(Long id) {
        return this.authorRepository.findAuthorById(id);
    }

    @Override
    public void updateAuthor(Author author) {
        if(authorRepository.findById(author.getId()).isPresent())
            authorRepository.save(author);
    }

    @Override
    @Transactional
    public void deleteAuthorById(Author author) {
        if(authorRepository.findById(author.getId()).isPresent()) {
            List<Book> bookList = author.getBooksList();
            author.setBooksList(new ArrayList<>());
            authorRepository.save(author);
            for(Book book:bookList) {
                Publisher publisher = book.getPublisher();
                publisher.getBooksList().remove(book);
                publisherRepository.save(publisher);

                book.setAuthor(null);
                book.setPublisher(null);
                bookRepository.save(book);
                bookRepository.delete(book);
            }
            authorRepository.delete(author);
        }
    }
}
