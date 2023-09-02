package com.example.ps_proiect1.service.impl;

import com.example.ps_proiect1.constants.NotificationEndpoints;
import com.example.ps_proiect1.dto.AddReviewDTO;
import com.example.ps_proiect1.dto.AddToCartDTO;
import com.example.ps_proiect1.dto.CreateProductDTO;
import com.example.ps_proiect1.dto.UpdateProductDTO;
import com.example.ps_proiect1.model.*;
import com.example.ps_proiect1.repository.*;
import com.example.ps_proiect1.service.BookService;
import com.example.ps_proiect1.service.ClientService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    //@Autowired
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final PublisherRepository publisherRepository;
    private final ClientService clientService;
    private final ReviewRepository reviewRepository;
    private final ClientRepository clientRepository;

    private final SimpMessagingTemplate template;

    public BookServiceImpl( BookRepository bookRepository, AuthorRepository authorRepository, PublisherRepository publisherRepository, ClientService clientService, ReviewRepository reviewRepository, ClientRepository clientRepository, SimpMessagingTemplate template) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.publisherRepository = publisherRepository;
        this.clientService = clientService;
        this.reviewRepository = reviewRepository;
        this.clientRepository = clientRepository;
        this.template = template;
    }

    @Override
    public ArrayList<Book> getAll() {
        return this.bookRepository.findAll();
    }

    @Override
    public Book findBookById(Long id) {
        return this.bookRepository.findBookById(id);
    }

    @Override
    public void saveBook(Book book) {
        this.bookRepository.save(book);
    }

    @Override
    public Book saveProduct(CreateProductDTO createProductDTO) {

        if(bookRepository.findBookByTitleAndAndAuthor_Name(createProductDTO.getTitle(), createProductDTO.getAuthorName()) != null)
            return null;

        Book book = new Book();

        book.setTitle(createProductDTO.getTitle());
        book.setTitleRo(createProductDTO.getTitleRo());
        book.setCategory(createProductDTO.getCategory());
        book.setCategoryRo(createProductDTO.getCategoryRo());
        book.setPrice(createProductDTO.getPrice());
        book.setReleaseYear(createProductDTO.getReleaseYear());
        book.setPagesNo(createProductDTO.getPagesNo());
        book.setDescription(createProductDTO.getDescription());
        book.setDescriptionRo(createProductDTO.getDescriptionRo());
        book.setImage(createProductDTO.getImage());
        book.setStock(createProductDTO.getStock());

        Publisher publisher = publisherRepository.findPublisherByName(createProductDTO.getPublisherName());
        if(publisher == null){
            publisher = new Publisher(null, createProductDTO.getPublisherName(), new ArrayList<>());
            publisherRepository.save(publisher);
        }
        book.setPublisher(publisher);

        Author author = authorRepository.findAuthorByName(createProductDTO.getAuthorName());
        if(author == null){
            author = new Author(null, createProductDTO.getAuthorName(), new ArrayList<>());
            authorRepository.save(author);
        }
        book.setAuthor(author);

        author.getBooksList().add(book);
        publisher.getBooksList().add(book);

        bookRepository.save(book);

        authorRepository.save(book.getAuthor());
        publisherRepository.save(book.getPublisher());

        return book;
    }

    @Override
    public int createBook(String title, String titleRo, String author, String publisher, String category, String categoryRo, int releaseYear, int price, int stock, int pagesNo, String image, String description, String descriptionRo) {
        if(bookRepository.findBookByTitleAndAndAuthor_Name(title,author) == null){
        Book book = new Book();
        book.setTitle(title);
        book.setTitleRo(titleRo);
        Author author2 = authorRepository.findAuthorByName(author);
            if(author2 == null){
                author2= new Author(null, author, new ArrayList<>());
                this.authorRepository.save(author2);
            }

        book.setImage(image);
        book.setAuthor(author2);

        Publisher publisher1 = new Publisher(null, publisher, new ArrayList<>());
        this.publisherRepository.save(publisher1);
        book.setPublisher(publisher1);

        book.setCategory(category);
        book.setCategoryRo(categoryRo);
        book.setPrice(price);
        book.setStock(stock);
        book.setPagesNo(pagesNo);
        book.setReleaseYear(releaseYear);
        book.setDescription(description);
        book.setDescriptionRo(descriptionRo);
        book.setReviews(new ArrayList<>());

        bookRepository.save(book);
        author2.getBooksList().add(book);

        authorRepository.save(author2);

        publisher1.getBooksList().add(book);
        this.publisherRepository.save(publisher1);
        saveBook(book);
        return 1;
        }
        return 0;
    }

    @Override
    public Book findByTitle(String title) {
        return bookRepository.findByTitle(title);
    }

    @Override
    @Transactional
    public Book updateBook(UpdateProductDTO updateProductDTO) {
       Book book = bookRepository.findBookById(updateProductDTO.getId());
        int oldStock = book.getStock();
        book.setTitle(updateProductDTO.getTitle());
        book.setTitleRo(updateProductDTO.getTitleRo());
        book.setCategory(updateProductDTO.getCategory());
        book.setCategoryRo(updateProductDTO.getCategoryRo());
        book.setPagesNo(updateProductDTO.getPagesNo());
        book.setPrice(updateProductDTO.getPrice());
        book.setReleaseYear(updateProductDTO.getReleaseYear());
        book.setDescription(updateProductDTO.getDescription());
        book.setDescriptionRo(updateProductDTO.getDescriptionRo());
        book.setImage(updateProductDTO.getImage());
        book.setStock(updateProductDTO.getStock());

        Author author = authorRepository.findAuthorById(updateProductDTO.getAuthorId());
        if(author == null){
            author = authorRepository.findAuthorByName(updateProductDTO.getAuthorName());
            if(author != null){
                book.getAuthor().getBooksList().remove(book);
                authorRepository.save(book.getAuthor());
            }
            else {
                book.getAuthor().getBooksList().remove(book);
                authorRepository.save(book.getAuthor());
                author = new Author(null, updateProductDTO.getAuthorName(), new ArrayList<>());
                authorRepository.save(author);
                book.setAuthor(author);
            }
        }

        Publisher publisher = publisherRepository.findPublisherById(updateProductDTO.getPublisherId());
        if(publisher == null){
            publisher  =publisherRepository.findPublisherByName(updateProductDTO.getPublisherName());
            if (publisher != null){
                book.getPublisher().getBooksList().remove(book);
                publisherRepository.save(book.getPublisher());
            }
            else {
                book.getPublisher().getBooksList().remove(book);
                publisherRepository.save(book.getPublisher());
                publisher = new Publisher(null, updateProductDTO.getPublisherName(), new ArrayList<>());
                publisherRepository.save(publisher);
                book.setPublisher(publisher);
            }
        }

        if(updateProductDTO.getAuthorId() == null){
            author.getBooksList().add(book);
            authorRepository.save(author);
            book.setAuthor(author);
        }
        if(updateProductDTO.getPublisherId() == null) {
            publisher.getBooksList().add(book);
            publisherRepository.save(publisher);
            book.setPublisher(publisher);
        }
       bookRepository.save(book);

        if(oldStock <= 0 && book.getStock() > 0 )
         this.template.convertAndSend(NotificationEndpoints.ADMIN_PRODUCT_UPDATE,
                book.getTitle() + " is back in stock!");

        return book;

    }

    @Override
    public Book addReview(AddReviewDTO addReviewDTO) {
        Book book = bookRepository.findBookById(addReviewDTO.getIdProduct());
        Client client = clientRepository.findClientById(addReviewDTO.getIdClient());
        Review review = new Review(null, addReviewDTO.getReview(), client);
        reviewRepository.save(review);

        book.getReviews().add(review);
        bookRepository.save(book);
        return book;
    }

    @Override
    @Transactional
    public void deleteBookById(Long id){
        Book book = bookRepository.findBookById(id);

        Author author = book.getAuthor();
        author.getBooksList().remove(book);
        authorRepository.save(author);

        Publisher publisher = book.getPublisher();
        publisher.getBooksList().remove(book);
        publisherRepository.save(publisher);

        List<Client> clientList = (List<Client>) clientRepository.findAll();
        for(Client client: clientList){
            client.getFavorites().remove(book);

            AddToCartDTO addToCartDTO = new AddToCartDTO();
            addToCartDTO.setIdClient(client.getId());
            addToCartDTO.setIdProduct(book.getId());
            clientService.deleteFromCart(addToCartDTO);

            client.getCart().getBooks().remove(book);
            clientRepository.save(client);
        }
        bookRepository.delete(book);
    }

    @Service
    public static class EmailService {

        @Autowired
        private JavaMailSender mailSender;

        public void sendEmail(String to, String subject, String body) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("teocan.patricia03@gmail.com");
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);
            System.out.println("mail sent");
        }
    }
}
