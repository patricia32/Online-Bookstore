package com.example.ps_proiect1.service;

import com.example.ps_proiect1.dto.AuthDTO;
import com.example.ps_proiect1.model.Admin;
import com.example.ps_proiect1.model.Book;
import org.springframework.stereotype.Component;

@Component
public interface AdminService {
    int getActiveUserNumber();
    Admin adminLogin(AuthDTO auth) throws Exception;
    Book testFavs(Long idClient, String bookTitle);
}
