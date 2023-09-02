package com.example.ps_proiect1.controller;

import com.example.ps_proiect1.exception.ApiExceptionResponse;
import com.example.ps_proiect1.model.Client;
import com.example.ps_proiect1.service.ClientService;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping()
public class CartController {
    private final ClientService clientService;

    public CartController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/getCart/{idClient}")
    public  ResponseEntity getCart(@PathVariable Long idClient){
        return ResponseEntity.status(HttpStatus.OK).body(clientService.getCart(idClient));
    }

    @GetMapping("/getCartProducts/{idClient}")
    public ResponseEntity getCartProducts(@PathVariable Long idClient) throws ApiExceptionResponse {
        Client client = clientService.findClientById(idClient);
        return ResponseEntity.status(HttpStatus.OK).body(client.getCart().getBooks());
    }

    @ApiOperation(value = "Add to cart method")
    @PutMapping("/addToCart/{idClient}/{idProduct}")
    public ResponseEntity addToCart(@PathVariable Long idClient, @PathVariable Long idProduct) throws ApiExceptionResponse {
        return ResponseEntity.status(HttpStatus.OK).body(clientService.addToCart(idClient, idProduct));
    }

    @PutMapping("/addToFavorites/{idClient}/{idProduct}")
    public ResponseEntity addToFavorites(@PathVariable Long idClient, @PathVariable Long idProduct) throws ApiExceptionResponse {
        return ResponseEntity.status(HttpStatus.OK).body(clientService.addToFavorites(idClient, idProduct));
    }

    @GetMapping("/getFavoriteProducts/{idClient}")
    public ResponseEntity getFavoriteProducts(@PathVariable Long idClient) throws ApiExceptionResponse {
        return ResponseEntity.status(HttpStatus.OK).body(clientService.findClientById(idClient).getFavorites());
    }
    @DeleteMapping("/deleteFromFavorites/{idClient}/{idProduct}")
    public ResponseEntity deleteFromFavorites(@PathVariable Long idClient, @PathVariable Long idProduct ){
        return ResponseEntity.status(HttpStatus.OK).body(clientService.deleteFromFavorites(idClient, idProduct));
    }
}
