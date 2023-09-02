package com.example.ps_proiect1.service;

import com.example.ps_proiect1.dto.AddReviewDTO;
import com.example.ps_proiect1.dto.CreateProductDTO;
import com.example.ps_proiect1.dto.UpdateProductDTO;
import com.example.ps_proiect1.model.Book;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public interface BookService {
    ArrayList<Book> getAll();
    Book findBookById(Long id);
    void saveBook(Book book);
    Book saveProduct(CreateProductDTO createProductDTO);
    int createBook(String title, String titleRo, String author, String publisher, String category, String categoryRo, int releaseYear, int price, int stock, int pagesNo, String image, String description, String descriptionRo);
    Book findByTitle(String title);
    Book updateBook(UpdateProductDTO updateProductDTO);
    Book addReview(AddReviewDTO addReviewDTO);
    void deleteBookById(Long id);
}
