package com.example.ps_proiect1.service;

import com.example.ps_proiect1.dto.AddToCartDTO;
import com.example.ps_proiect1.dto.AuthDTO;
import com.example.ps_proiect1.dto.PlaceOrderDTO;
import com.example.ps_proiect1.dto.RegisterDTO;
import com.example.ps_proiect1.model.Cart;
import com.example.ps_proiect1.model.Client;
import org.springframework.stereotype.Component;

@Component
public interface ClientService {

    Client login(AuthDTO auth) throws Exception;
    Client updateClient(RegisterDTO registerDTO);
    Client addToCart(Long idClient, Long idProduct);
    Client deleteFromCart(AddToCartDTO addToCartDTO);
    Client addToFavorites(Long idClient, Long idProduct);
    Client deleteFromFavorites(Long idClient, Long idProduct);
    Client placeOrder(PlaceOrderDTO placeOrderDTO);
    Cart getCart(Long id);
    Client createClient(RegisterDTO registerDTO) throws Exception;
    Client findByUsernameAndPassword(String username, String password);
    Client findClientById(Long id);
    String exportFavsListDetails(Long idClient);

}

