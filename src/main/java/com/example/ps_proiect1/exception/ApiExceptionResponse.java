package com.example.ps_proiect1.exception;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
@JsonIgnoreProperties(value = {"stackTrace", "suppressed", "cause", "localizedMessage"})
//scoatem field-urile mostenite care nu ne intereseaza
public class ApiExceptionResponse extends Exception {
    //mosteneste atributul "message" de la Exception
    private final HttpStatus status;
    private final List<String> errors;

    @Builder
    public ApiExceptionResponse(String message, HttpStatus status, List<String> errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
}
