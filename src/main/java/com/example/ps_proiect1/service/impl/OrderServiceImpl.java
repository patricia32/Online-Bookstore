package com.example.ps_proiect1.service.impl;

import com.example.ps_proiect1.model.Book;
import com.example.ps_proiect1.model.OrderClass;
import com.example.ps_proiect1.repository.BookRepository;
import com.example.ps_proiect1.repository.OrderRepository;
import com.example.ps_proiect1.service.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;

    public OrderServiceImpl(OrderRepository orderRepository, BookRepository bookRepository) {
        this.orderRepository = orderRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public void saveOrder(OrderClass orderClass) {
        this.orderRepository.save(orderClass);
    }


    @Override
    public void updateOrder(OrderClass order) {
        if(this.orderRepository.findById(order.getId()).isPresent())
            this.orderRepository.save(order);
    }

    @Override
    public void deleteOrderById(OrderClass order) {
        if(orderRepository.findById(order.getId()).isPresent()) {
            order.setBookList(null);
            orderRepository.delete(order);
        }
    }
}
