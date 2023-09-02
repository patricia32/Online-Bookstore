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
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Entity
@XmlRootElement(name = "list-of-books")
@XmlAccessorType(XmlAccessType.FIELD)

public class Cart {
    @Id
    @GeneratedValue
    private Long id;

    private int value;
    private Long clientId;

    @ManyToMany(fetch = FetchType.EAGER)

    @XmlElementWrapper(name="list-of-books")
    @JsonBackReference
    List<Book> books;

}
