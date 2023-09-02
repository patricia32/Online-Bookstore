package com.example.ps_proiect1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class RegularBook extends Book{
    private int stock;

    @ManyToOne
    @JoinColumn(name = "publisher_id")
    private Publisher publisher;

    public Publisher getPublisher() {
        return publisher;
    }

    public RegularBook(Publisher publisher, int stock){
        super();
        this.publisher = publisher;
        this.stock =stock;
    }

}
