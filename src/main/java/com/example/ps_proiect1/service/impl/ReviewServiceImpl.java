package com.example.ps_proiect1.service.impl;

import com.example.ps_proiect1.model.Review;
import com.example.ps_proiect1.repository.ReviewRepository;
import com.example.ps_proiect1.service.ReviewService;
import org.springframework.stereotype.Service;

@Service
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public Review saveReview(Review review) {
        reviewRepository.save(review);
        return review;
    }
}
