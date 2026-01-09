package com.elysianmen.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "products")
public class Product {

    @Id
    private String id;

    private String name;
    private Double price;
    private Double originalPrice;
    private String category;
    private String description;
    private String image;
    private List<String> colors;
    private List<String> sizes;
    private String fit;
    private Boolean inStock;
    private Boolean onSale;
}
