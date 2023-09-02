package com.example.ps_proiect1.service;

import com.example.ps_proiect1.dto.AuthDTO;
import com.example.ps_proiect1.model.User;
import org.springframework.stereotype.Component;

@Component
public interface UserService {
    void saveUser(User user);
    User findUserById(Long id);
    User findUserByUsernameAndPassword(AuthDTO authDTO);
    User findUserByUsername(String username);
    User logout(Long idClient);
}
