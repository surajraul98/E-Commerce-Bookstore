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
public class Product {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long productID;
    @Column(insertable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date insertionDate;
    @Column(insertable = false, updatable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;
    @Column(nullable = false)
    private String productName;
    @Column(nullable = false)
    private String productType;
    @Column(nullable = false)
    private String productPrice;
    private String productDetails;
    private String productCompany;
    private String productImageUrl;
    private String publicId;
    private Long quantity;

    @Column(columnDefinition = "boolean default false")
    private Boolean isArchive;
    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;
}
