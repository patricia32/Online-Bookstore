package com.example.ps_proiect1.service;

import com.example.ps_proiect1.model.Author;
import com.example.ps_proiect1.model.Book;
import com.example.ps_proiect1.model.Cart;
import org.springframework.stereotype.Component;

@Component
public interface CartService {
   Cart findCartById(Long id);
}
