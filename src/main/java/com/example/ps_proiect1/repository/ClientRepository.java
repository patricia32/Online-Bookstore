package com.example.ps_proiect1.repository;

import com.example.ps_proiect1.model.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends CrudRepository<Client, Long> {
    Client findClientByUsernameAndPassword(String username, String password);
    Client findClientByUsername(String username);
    Client findClientById(Long id);
}
