package com.example.ps_proiect1.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddReviewDTO {
    private Long idProduct;
    private Long idClient;
    private String review;

}
