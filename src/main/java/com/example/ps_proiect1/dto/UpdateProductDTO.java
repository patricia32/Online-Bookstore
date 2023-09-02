package com.example.ps_proiect1.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateProductDTO {
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
    private Long authorId;
    private String authorName;
    private Long publisherId;
    private String publisherName;

}
