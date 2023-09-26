package com.project.bookselling.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity @Data
@NoArgsConstructor
@AllArgsConstructor
public class WishList {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long wishListID;
    @Column(nullable = false)
    private Long userId;
    @Column(insertable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date insertionDate;
    private Long productID;
    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;
}
