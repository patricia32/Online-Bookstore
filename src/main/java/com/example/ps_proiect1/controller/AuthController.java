package com.example.ps_proiect1.controller;

import com.example.ps_proiect1.dto.AddToCartDTO;
import com.example.ps_proiect1.dto.AuthDTO;
import com.example.ps_proiect1.dto.PlaceOrderDTO;
import com.example.ps_proiect1.dto.RegisterDTO;
import com.example.ps_proiect1.exception.ApiExceptionResponse;
import com.example.ps_proiect1.model.Client;
import com.example.ps_proiect1.model.User;
import com.example.ps_proiect1.service.AdminService;
import com.example.ps_proiect1.service.ClientService;
import com.example.ps_proiect1.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final ClientService clientService;
    private final AdminService adminService;

    public AuthController(UserService userService, ClientService clientService, AdminService adminService) {
        this.userService = userService;
        this.clientService = clientService;
        this.adminService = adminService;
    }

    @PostMapping("/admin/login")
    public ResponseEntity adminLogin(@Valid @RequestBody AuthDTO auth) throws Exception {
        User user = adminService.adminLogin(auth);
        if(user!= null)
            System.out.println("In loginContr " + user.getName());
        else {System.out.println("login controller client not found");
            throw new ApiExceptionResponse("user not found", HttpStatus.NOT_FOUND, new ArrayList<>());
        }
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody AuthDTO auth) throws Exception {
        User user = clientService.login(auth);
        if(user!= null)
            System.out.println("In loginContr " + user.getName());
        else {System.out.println("login controller client not found");
            throw new ApiExceptionResponse("user not found", HttpStatus.NOT_FOUND, new ArrayList<>());
        }
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @PostMapping("/findInfo")
    public ResponseEntity findInfo(@RequestBody AuthDTO auth) throws ApiExceptionResponse {
        User user = userService.findUserByUsernameAndPassword(auth);
        if(user== null)
            throw new ApiExceptionResponse("user not found", HttpStatus.NOT_FOUND, new ArrayList<>());
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody RegisterDTO registerDTO) throws Exception {
        System.out.println("Reg controller");
        try {
            Client client = clientService.createClient(registerDTO);
            return ResponseEntity.status(HttpStatus.OK).body(client);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/aboutUser")
    public ResponseEntity aboutUser(@RequestBody RegisterDTO registerDTO) throws ApiExceptionResponse {
        Client client = clientService.updateClient(registerDTO);
        if(client!= null)
            System.out.println("Found user and updated! " + client.getName());
        else {
            throw new ApiExceptionResponse("user not found", HttpStatus.NOT_FOUND, new ArrayList<>());
        }
        return ResponseEntity.status(HttpStatus.OK).body(client);
    }

    @PostMapping("/placeOrder")
    public ResponseEntity placeOrder(@RequestBody PlaceOrderDTO placeOrderDTO){
        Client client = clientService.placeOrder(placeOrderDTO);
        return ResponseEntity.status(HttpStatus.OK).body(client);
    }

    @DeleteMapping("/{idClient}/{idProduct}")
    public ResponseEntity deleteFromCart(@PathVariable Long idClient, @PathVariable Long idProduct ){
        AddToCartDTO addToCartDTO = new AddToCartDTO(idClient, idProduct);
        Client client = clientService.deleteFromCart(addToCartDTO);
        return ResponseEntity.status(HttpStatus.OK).body(client);
    }

    @GetMapping("/export/{idClient}")
    public ResponseEntity exportFavsListDetails(@PathVariable Long idClient){
        return ResponseEntity.ok(clientService.exportFavsListDetails(idClient));
    }

    @PutMapping("/logout/{idClient}")
    public ResponseEntity logout(@PathVariable Long idClient){
        return ResponseEntity.ok(userService.logout(idClient));
    }
}
