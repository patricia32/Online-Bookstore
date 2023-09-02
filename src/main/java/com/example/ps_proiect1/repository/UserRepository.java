package com.example.ps_proiect1.repository;

import com.example.ps_proiect1.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User findUserByUsernameAndPassword(String username, String password);
    User findUserById(Long id);
    User findUserByUsername(String username);
}
