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
public class AddressDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private Long userID;
    @Column(insertable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date insertionDate;
    @Column(insertable = false, updatable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;
    @Column(length = 1024)
    private String address1;
    @Column(length = 1024)
    private String address2;
    @Column(length = 100)
    private String city;
    @Column(length = 100)
    private String distict;
    @Column(length = 100)
    private String state;
    @Column(length = 100)
    private String country;
    @Column(length = 6)
    private String pincode;
    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;
}
