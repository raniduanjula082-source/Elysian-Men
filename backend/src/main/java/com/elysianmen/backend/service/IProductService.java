package com.elysianmen.backend.service;

import com.elysianmen.backend.model.Product;

import java.util.List;
import java.util.Optional;

public interface IProductService {

    List<Product> getProducts(String category, String availability, Double minPrice, Double maxPrice, String sortBy);

    Optional<Product> getProductById(String id);

    Product saveProduct(Product product);

    List<Product> saveAllProducts(List<Product> products);

    void deleteAllProducts();

    long getProductCount();
}
