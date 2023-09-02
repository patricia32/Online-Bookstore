package com.example.ps_proiect1.repository;

import com.example.ps_proiect1.model.ActiveUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActiveUserRepository extends CrudRepository<ActiveUser, Long> {
    ActiveUser findActiveUserById(Long id);
}