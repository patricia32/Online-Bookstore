package com.example.ps_proiect1.service.impl;

import com.example.ps_proiect1.dto.AuthDTO;
import com.example.ps_proiect1.model.ActiveUser;
import com.example.ps_proiect1.model.User;
import com.example.ps_proiect1.repository.ActiveUserRepository;
import com.example.ps_proiect1.repository.ClientRepository;
import com.example.ps_proiect1.repository.UserRepository;
import com.example.ps_proiect1.service.UserService;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ActiveUserRepository activeUserRepository;
    private final ClientRepository clientRepository;

    public UserServiceImpl(UserRepository userRepository, ActiveUserRepository activeUserRepository, ClientRepository clientRepository) {
        this.userRepository = userRepository;
        this.activeUserRepository = activeUserRepository;
        this.clientRepository = clientRepository;
    }

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }

    @Override
    public User findUserById(Long id) {
       return  this.userRepository.findUserById(id);
    }

    @Override
    public User findUserByUsernameAndPassword(AuthDTO authDTO) {
        return userRepository.findUserByUsernameAndPassword(authDTO.getUsername(), authDTO.getPassword());
    }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    public User logout(Long idClient) {
        User user = userRepository.findUserById(idClient);
        ActiveUser activeUser = activeUserRepository.findActiveUserById(1L);
        activeUser.getActiveUsers().remove(user);
        activeUserRepository.save(activeUser);
        return user;
    }
}
