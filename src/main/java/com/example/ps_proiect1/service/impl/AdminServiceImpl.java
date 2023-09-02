package com.example.ps_proiect1.service.impl;

import com.example.ps_proiect1.dto.AuthDTO;
import com.example.ps_proiect1.model.Admin;
import com.example.ps_proiect1.model.Book;
import com.example.ps_proiect1.model.Client;
import com.example.ps_proiect1.repository.ActiveUserRepository;
import com.example.ps_proiect1.repository.AdminRepository;
import com.example.ps_proiect1.repository.BookRepository;
import com.example.ps_proiect1.repository.ClientRepository;
import com.example.ps_proiect1.service.AdminService;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    private final ActiveUserRepository activeUserRepository;
    private final AdminRepository adminRepository;
    private final ClientRepository clientRepository;
    private final BookRepository bookRepository;

    public AdminServiceImpl(ActiveUserRepository activeUserRepository, AdminRepository adminRepository, ClientRepository clientRepository, BookRepository bookRepository) {
        this.activeUserRepository = activeUserRepository;
        this.adminRepository = adminRepository;
        this.clientRepository = clientRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public int getActiveUserNumber() {
        return activeUserRepository.findActiveUserById(1L).getActiveUsers().size();
    }

    @Override
    public Admin adminLogin(AuthDTO auth) throws Exception {
        return adminRepository.findAdminByUsernameAndPassword(auth.getUsername(),auth.getPassword());
    }

    @Override
    public Book testFavs(Long idClient, String bookTitle) {
        Client client = clientRepository.findClientById(idClient);
        Book book = bookRepository.findByTitle(bookTitle);
        if(client.getFavorites().contains(book))
            return book;
        return null;
    }
}
