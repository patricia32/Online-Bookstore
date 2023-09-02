package com.example.ps_proiect1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlTransient;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@XmlAccessorType(value = XmlAccessType.FIELD)
public class Author {
    @Id
    @GeneratedValue
    private Long id;

    private String name;


    @OneToMany(fetch = FetchType.EAGER)
    @JsonBackReference
    @XmlTransient
    private List<Book> booksList;
}

