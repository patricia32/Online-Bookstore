package com.example.ps_proiect1.controller;

import com.example.ps_proiect1.dto.CreateProductDTO;
import com.example.ps_proiect1.dto.UpdateProductDTO;
import com.example.ps_proiect1.exception.ApiExceptionResponse;
import com.example.ps_proiect1.model.Book;
import com.example.ps_proiect1.service.AdminService;
import com.example.ps_proiect1.service.BookService;
import com.example.ps_proiect1.service.ClientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;


@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;
    private final BookService bookService;
    private final ClientService clientService;

    public AdminController(AdminService adminService, BookService bookService, ClientService clientService) {
        this.adminService = adminService;
        this.bookService = bookService;
        this.clientService = clientService;
    }

    @GetMapping("/getActiveUserNumber")
    public  ResponseEntity getActiveUserNumber(){
        return ResponseEntity.status(HttpStatus.OK).body(adminService.getActiveUserNumber());
    }

    @PostMapping("/productSave")
    public ResponseEntity productSave(@RequestBody CreateProductDTO createProductDTO) throws ApiExceptionResponse {
        Book bookResult = bookService.saveProduct(createProductDTO);
        if(bookResult == null)
            return  ResponseEntity.status(HttpStatus.CONFLICT).body("book already exists");
        return  ResponseEntity.status(HttpStatus.OK).body(bookResult);

    }


    @PutMapping("/productUpdate")
    public ResponseEntity productUpdate(@RequestBody UpdateProductDTO updateProductDTO) throws ApiExceptionResponse {
        Book bookResult = bookService.updateBook(updateProductDTO);
        if(bookResult == null){
            throw new ApiExceptionResponse("book not found", HttpStatus.NOT_FOUND, new ArrayList<>());
        }
        return  ResponseEntity.status(HttpStatus.OK).body(bookResult);

    }


    @DeleteMapping("/productDelete/{idProduct}")
    public ResponseEntity deleteProduct(@PathVariable Long idProduct ){
       bookService.deleteBookById(idProduct);
        return ResponseEntity.status(HttpStatus.OK).body("book deleted");
    }

    @GetMapping("/testFavs/{idClient}/{bookTitle}")
    public ResponseEntity testFavs(@PathVariable Long idClient, @PathVariable String bookTitle){
        Book bookResult = adminService.testFavs(idClient, bookTitle);
        if(bookResult == null)
            return  ResponseEntity.status(HttpStatus.CONFLICT).body("book already exists");
        return  ResponseEntity.status(HttpStatus.OK).body(bookResult);
    }
}
