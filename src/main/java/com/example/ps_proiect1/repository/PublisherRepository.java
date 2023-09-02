package com.example.ps_proiect1.repository;

import com.example.ps_proiect1.model.Publisher;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublisherRepository extends CrudRepository<Publisher, Long> {
    Publisher findPublisherById(Long id);
    Publisher findPublisherByName(String name);
}
