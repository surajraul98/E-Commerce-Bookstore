package com.project.bookselling.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDetails {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private Long userID;
    @Column(nullable = false)
    private String userName;
    @Column(insertable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date insertionDate;
    @Column(insertable = false, updatable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;
    @Column(nullable = false)
    private String fullName;
    @Column(nullable = false)
    private String emailID;
    private String mobileNumber;
    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;
}
