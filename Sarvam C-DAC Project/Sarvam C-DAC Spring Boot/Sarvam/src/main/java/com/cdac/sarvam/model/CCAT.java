package com.cdac.sarvam.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "ccats")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CCAT {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment for primary key
    @Column(name = "id", nullable = false, unique = true)
    private Integer id;

    @Column(name = "form_number", nullable = false, unique = true)
    private String formNumber;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "first_name", nullable = false)
    private String firstName;
    
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "dob", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dob;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "nationality", nullable = false)
    private String nationality;

    @Column(name = "aadhar_card", nullable = false, unique = true, length = 20)
    private String aadharCard;

    @Column(name = "ccatrank", nullable = false)
    private Integer ccatRank;

    @Column(name = "mobile_number", nullable = false, unique = true, length = 15)
    private String mobileNumber;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "status", nullable = false)
    private String status;
}
