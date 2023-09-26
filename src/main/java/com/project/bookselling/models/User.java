package com.project.bookselling.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;

    private String userName;
    private String password;
    @Column(columnDefinition = "VARCHAR(10) NOT NULL CHECK (Role IN('customer', 'admin', 'seller'))")
    private String role;
    @Temporal(TemporalType.TIMESTAMP)
    private Date insertionDate;
    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;
}
