package com.example.ps_proiect1.repository;
import com.example.ps_proiect1.model.Book;
import com.example.ps_proiect1.model.Cart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface CartRepository extends CrudRepository<Cart, Long> {
    Cart findCartById(Long id);
}
