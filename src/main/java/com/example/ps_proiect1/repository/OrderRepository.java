package com.example.ps_proiect1.repository;
import com.example.ps_proiect1.model.Book;
import com.example.ps_proiect1.model.OrderClass;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends CrudRepository<OrderClass, Long>{

}


