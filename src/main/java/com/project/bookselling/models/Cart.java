package com.project.bookselling.models;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity @Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cardID;
    @Column(nullable = false)
    private Long userId;
    @Column(insertable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date insertionDate;
    @Column(nullable = false)
    private Long productID;
    @Column(columnDefinition = "boolean default false")
    private Boolean isOrder;
    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;
    private Boolean isPayment;
    private double Rating=0.0;
    private String PaymentType;
    private String CardNo;
    private String UpiId;
}
