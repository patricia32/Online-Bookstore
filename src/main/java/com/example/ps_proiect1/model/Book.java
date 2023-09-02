package com.example.ps_proiect1.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Entity
@XmlRootElement(name = "book")
@XmlAccessorType(XmlAccessType.FIELD)
public class Book {
    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String titleRo;
    private int price;
    private int pagesNo;
    private String category;
    private String categoryRo;
    private int releaseYear;
    private int stock;
    private String image;
    private String description;
    private String descriptionRo;

    @OneToMany
    @JsonManagedReference
    private List<Review> reviews = new ArrayList<>();


    @ManyToOne(fetch = FetchType.EAGER)
    @JsonManagedReference
    private Author author;


    @ManyToOne(fetch = FetchType.EAGER)
    @JsonManagedReference
    private Publisher publisher;

}
