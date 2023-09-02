package com.example.ps_proiect1.service.impl;

import com.example.ps_proiect1.dto.AddToCartDTO;
import com.example.ps_proiect1.dto.AuthDTO;
import com.example.ps_proiect1.dto.PlaceOrderDTO;
import com.example.ps_proiect1.dto.RegisterDTO;
import com.example.ps_proiect1.exception.ApiExceptionResponse;
import com.example.ps_proiect1.model.*;
import com.example.ps_proiect1.repository.*;
import com.example.ps_proiect1.service.ClientService;
import com.example.ps_proiect1.utils.exporter.FileExporter;
import com.example.ps_proiect1.utils.exporter.XMLFileExporter;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Set;


@Service
public class ClientServiceImpl implements ClientService {
    private final ClientRepository clientRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final ActiveUserRepository activeUserRepository;

    @Autowired
    private BookServiceImpl.EmailService emailService;

    public ClientServiceImpl(ClientRepository clientRepository, BookRepository bookRepository, UserRepository userRepository, CartRepository cartRepository, OrderRepository orderRepository, ActiveUserRepository activeUserRepository) {
        this.clientRepository = clientRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.activeUserRepository = activeUserRepository;
    }

    @Override
    public Client login(AuthDTO auth) throws Exception {
        Client client = clientRepository.findClientByUsernameAndPassword(auth.getUsername(),auth.getPassword());
        ActiveUser activeUser = activeUserRepository.findActiveUserById(1L);
        activeUser.getActiveUsers().add(client);
        activeUserRepository.save(activeUser);
        return client;
    }

    @Override
    public Client createClient(RegisterDTO registerDTO) throws Exception {
        if (this.clientRepository.findClientByUsername(registerDTO.getUsername()) != null)
            throw new ApiExceptionResponse("user not found", HttpStatus.NOT_FOUND, new ArrayList<>());
        Client client = new Client();
        client.setName(registerDTO.getName());
        client.setUsername(registerDTO.getUsername());
        client.setPassword(registerDTO.getPassword());
        client.setEmail(registerDTO.getEmail());
        client.setPhone(registerDTO.getPhone());
        client.setAddress(registerDTO.getAddress());
        client.setFavorites(new ArrayList<>());

        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<Client>> violations = validator.validate(client);
        if (!violations.isEmpty())
           throw new Exception(violations.stream().findFirst().get().getMessage());

        Cart cart = new Cart(null, 0,0L, new ArrayList<>());
        cartRepository.save(cart);
        client.setCart(cart);
        client.setPoints(0);

        this.clientRepository.save(client);
        cart.setClientId(client.getId());
        cartRepository.save(cart);
        client.setCart(cart);

        String randomCode = new Random().toString();
        client.setVerificationCode(randomCode);
        client.setEnabled(false);
        clientRepository.save(client);

        User user = client;
        ActiveUser activeUser = activeUserRepository.findActiveUserById(1L);
        activeUser.getActiveUsers().add(user);
        activeUserRepository.save(activeUser);

        emailService.sendEmail(client.getEmail(), "LAMA Website", "Congratulations! Your account has been registered!");
            return client;
    }

    @Override
    public Client updateClient(RegisterDTO registerDTO) {
        Client client = this.clientRepository.findClientByUsernameAndPassword(registerDTO.getUsername(), registerDTO.getPassword());
        if(client != null) {
            client.setName(registerDTO.getName());
            client.setUsername(registerDTO.getUsername());
            client.setAddress(registerDTO.getAddress());
            client.setPassword(registerDTO.getPassword());
            client.setEmail(registerDTO.getEmail());
            client.setPhone(registerDTO.getPhone());
            this.clientRepository.save(client);


            return client;
        }
        return null;
    }

    @Override
    public Client addToCart(Long idClient, Long idProduct) {
        Book book  = bookRepository.findBookById(idProduct);
        Client client = clientRepository.findClientById(idClient);
        if(!(client.getCart().getBooks().contains(book)))
            client.getCart().getBooks().add(book);

        client.getCart().setValue(client.getCart().getValue()+book.getPrice());
        clientRepository.save(client);
        cartRepository.save(client.getCart());
        return client;
    }

    @Override
    public Client deleteFromCart(AddToCartDTO addToCartDTO) {
        Book book  = bookRepository.findBookById(addToCartDTO.getIdProduct());
        Client client = clientRepository.findClientById(addToCartDTO.getIdClient());
        client.getCart().getBooks().remove(book);

        client.getCart().setValue(client.getCart().getValue()-book.getPrice());
        clientRepository.save(client);
        cartRepository.save(client.getCart());
        return client;
    }

    @Override
    public Client addToFavorites(Long idClient, Long idProduct ) {
        Book book = bookRepository.findBookById(idProduct);
        Client client = clientRepository.findClientById(idClient);
        if(client.getFavorites().contains(book))
            return client;
        client.getFavorites().add(book);
        return clientRepository.save(client);
    }

    @Override
    public Client deleteFromFavorites(Long idClient, Long idProduct) {
         Client client = clientRepository.findClientById(idClient);
         Book book = bookRepository.findBookById(idProduct);
         client.getFavorites().remove(book);
         return clientRepository.save(client);
    }

    @Override
    public Client placeOrder(PlaceOrderDTO placeOrderDTO) {
        Client client = clientRepository.findClientById(placeOrderDTO.getIdClient());
        OrderClass orderClass = new OrderClass(null, 0, client, new ArrayList<>());
        Cart cart = client.getCart();
        orderClass.setClient(client);
        orderClass.setValue(cart.getValue());
        orderClass.getBookList().addAll(cart.getBooks());
        orderRepository.save(orderClass);

        List<Book> books = cart.getBooks();
        for(Book book1: books){
            book1.setStock(book1.getStock()-1);
            bookRepository.save(book1);
        }
        cart.getBooks().removeAll(books);
        cart.setValue(0);
        cartRepository.save(cart);

        client.setCart(cart);
        client.setPoints(client.getPoints() + orderClass.getValue() / 10f);
        client.getOrderList().add(orderClass);
        clientRepository.save(client);

        orderClass.setClient(client);
        orderRepository.save(orderClass);

        return client;
    }

    @Override
    public Cart getCart(Long id) {
       return clientRepository.findClientById(id).getCart();
    }

    @Override
    public Client findByUsernameAndPassword(String username, String password) {
        return clientRepository.findClientByUsernameAndPassword(username, password);
    }

    @Override
    public Client findClientById(Long id) {
        return clientRepository.findClientById(id);
    }

    @Override
    public String exportFavsListDetails(Long idClient) {

        Client client = clientRepository.findClientById(idClient);
        FileExporter fileExporter;
        fileExporter = new XMLFileExporter();
        ListBooks listBooks = new ListBooks(client.getCart().getBooks());
        listBooks.setBooksList(client.getFavorites());
        return fileExporter.exportData(listBooks);
    }


}
