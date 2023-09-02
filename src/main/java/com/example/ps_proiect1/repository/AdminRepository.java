package com.example.ps_proiect1.repository;

import com.example.ps_proiect1.model.Admin;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends CrudRepository<Admin, Long> {
    Admin findAdminById(Long id);
    Admin findAdminByUsernameAndPassword(String username, String password);
}
