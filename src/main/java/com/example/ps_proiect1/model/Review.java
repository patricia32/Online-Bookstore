package com.example.ps_proiect1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Entity
public class Review {
    @Id
    @GeneratedValue
    private Long idReview;
    String reviewInfo;

    @OneToOne
    Client client;
}
