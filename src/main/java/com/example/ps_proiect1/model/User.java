package com.example.ps_proiect1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@XmlAccessorType(value = XmlAccessType.FIELD)
public class User {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String username;

   // @Pattern(regexp = "[a-zA-Z0-9.]+", message = "Password must contain upper letters and lower letters.")
    private String password;

    @Email
    private String email;

    @Pattern(regexp = "[0-9]{10}", message = "Phone number must contain 10 digits.")
    private String phone;
    private String address;

}
