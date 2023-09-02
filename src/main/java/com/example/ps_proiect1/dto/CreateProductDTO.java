package com.example.ps_proiect1.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreateProductDTO {
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
    private String authorName;
    private String publisherName;
}
