package com.example.ps_proiect1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlTransient;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@XmlAccessorType(XmlAccessType.FIELD)
public class OrderClass {
    @Id
    @GeneratedValue
    private Long id;

    private int value = 0;

    @OneToOne
    @XmlTransient
    @JsonBackReference
    private Client client;


    @XmlElementWrapper(name="list-of-books")
    @ManyToMany(fetch = FetchType.EAGER)
    @JsonBackReference
    private List<Book> bookList;

}

