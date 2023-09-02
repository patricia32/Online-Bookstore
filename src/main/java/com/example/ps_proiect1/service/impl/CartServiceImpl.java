package com.example.ps_proiect1.service.impl;

import com.example.ps_proiect1.model.Cart;
import com.example.ps_proiect1.repository.CartRepository;
import com.example.ps_proiect1.service.CartService;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;

    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public Cart findCartById(Long id) {
        return cartRepository.findCartById(id);
    }
}
