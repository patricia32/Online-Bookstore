package com.example.ps_proiect1.service;
import com.example.ps_proiect1.model.OrderClass;
import org.springframework.stereotype.Component;


@Component
public interface OrderService {
    void saveOrder(OrderClass order);
    void updateOrder(OrderClass order);
    void deleteOrderById(OrderClass order);
}
