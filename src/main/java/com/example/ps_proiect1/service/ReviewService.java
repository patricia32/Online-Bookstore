package com.example.ps_proiect1.service;

import com.example.ps_proiect1.model.Review;
import org.springframework.stereotype.Component;

@Component
public interface ReviewService {
    Review saveReview(Review review);
}
