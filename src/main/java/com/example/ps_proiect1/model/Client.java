package com.example.ps_proiect1.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
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
@Entity
@XmlRootElement(name = "book")
@XmlAccessorType(XmlAccessType.FIELD)
public class Client extends User {
    @OneToOne
    Cart cart ;

    private float points;

    private String verificationCode;
    private boolean enabled;


    @XmlElementWrapper(name="list-of-favorite-books")
    @ManyToMany
    private List<Book> favorites;

    @XmlElementWrapper(name="list-of-orders")
    @ManyToMany
    @JsonManagedReference
    private List<OrderClass> orderList;


}
