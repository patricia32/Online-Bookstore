package com.example.ps_proiect1.service.impl;

import com.example.ps_proiect1.model.Book;
import com.example.ps_proiect1.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class BookServiceImplTest {
    private static final String title = "Mindset";
    private static final String title_not = "Non existing title.";

    private BookServiceImpl bookServiceImpl;

    @Mock
    private BookRepository bookRepository;
    private AuthorRepository authorRepository;
    private PublisherRepository publisherRepository;
    private OrderRepository orderRepository;
    private UserRepository userRepository;
    private ReviewRepository reviewRepository;
    private ClientRepository clientRepository;

    private Book book;
    
    @BeforeEach
    void setUp(){
        initMocks(this);
        book = new Book();
        book.setTitle(title);
        when(bookRepository.findByTitle(title)).thenReturn(book);
    }

    @Test
    void givenExistingTitle_whenFindByTitle_thenFindOne(){
        //given
    //    bookServiceImpl = new BookServiceImpl(orderRepository, bookRepository, authorRepository, publisherRepository, userRepository, reviewRepository, clientRepository, template);

        //when
        Book book1 = bookServiceImpl.findByTitle(title);

        //then
        assertNotNull(book1);
        assertEquals(title, book1.getTitle());
    }


}
