package com.example.ps_proiect1.controller;

import com.example.ps_proiect1.dto.AddReviewDTO;
import com.example.ps_proiect1.exception.ApiExceptionResponse;
import com.example.ps_proiect1.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping()
public class ProductController {
    private final AuthorService authorService;
    private final BookService bookService;
    private final ClientService clientService;
    private final CartService cartService;
    private final ReviewService reviewService;

    public ProductController(BookService bookService, AuthorService authorService, ClientService clientService, CartService cartService, ReviewService reviewService) {
        this.authorService = authorService;
        this.bookService = bookService;
        this.clientService = clientService;
        this.cartService = cartService;
        this.reviewService = reviewService;
    }
   @GetMapping("/getProducts")
    public ResponseEntity getProducts() throws ApiExceptionResponse {
        return ResponseEntity.status(HttpStatus.OK).body(bookService.getAll());
    }


    @GetMapping ("/auth/{idProduct}")
    public ResponseEntity getProductDetails(@PathVariable Long idProduct){
         return ResponseEntity.status(HttpStatus.OK).body(bookService.findBookById(idProduct));
    }

    @PostMapping ("/auth/addReview")
    public ResponseEntity addReview(@RequestBody AddReviewDTO addReviewDTO){
        return ResponseEntity.status(HttpStatus.OK).body(bookService.addReview(addReviewDTO));
    }
}
