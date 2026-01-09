package com.elysianmen.backend.service.impl;

import com.elysianmen.backend.model.Product;
import com.elysianmen.backend.repository.ProductRepository;
import com.elysianmen.backend.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    private ProductRepository productRepository;

    /**
     * Get all products with optional filters and sorting
     */
    @Override
    public List<Product> getProducts(String category, String availability, Double minPrice, Double maxPrice,
            String sortBy) {
        List<Product> products = productRepository.findAll();

        // Apply category filter
        if (category != null && !category.equals("All")) {
            products = products.stream()
                    .filter(p -> p.getCategory().equals(category))
                    .collect(Collectors.toList());
        }

        // Apply availability filter
        if (availability != null && !availability.equals("All")) {
            if (availability.equals("In Stock")) {
                products = products.stream()
                        .filter(Product::getInStock)
                        .collect(Collectors.toList());
            } else if (availability.equals("Out of Stock")) {
                products = products.stream()
                        .filter(p -> !p.getInStock())
                        .collect(Collectors.toList());
            }
        }

        // Apply price range filter
        if (minPrice != null) {
            products = products.stream()
                    .filter(p -> p.getPrice() >= minPrice)
                    .collect(Collectors.toList());
        }

        if (maxPrice != null) {
            products = products.stream()
                    .filter(p -> p.getPrice() <= maxPrice)
                    .collect(Collectors.toList());
        }

        // Apply sorting
        if (sortBy != null && !sortBy.equals("Default")) {
            switch (sortBy) {
                case "Price: Low to High":
                    products.sort(Comparator.comparing(Product::getPrice));
                    break;
                case "Price: High to Low":
                    products.sort(Comparator.comparing(Product::getPrice).reversed());
                    break;
                case "Newest":
                    // Assuming the default order is newest first
                    break;
            }
        }

        return products;
    }

    /**
     * Get a single product by ID
     */
    @Override
    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    /**
     * Save a product (useful for data initialization)
     */
    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    /**
     * Save multiple products (useful for data initialization)
     */
    @Override
    public List<Product> saveAllProducts(List<Product> products) {
        return productRepository.saveAll(products);
    }

    /**
     * Delete all products (useful for data reset)
     */
    @Override
    public void deleteAllProducts() {
        productRepository.deleteAll();
    }

    /**
     * Get product count
     */
    @Override
    public long getProductCount() {
        return productRepository.count();
    }
}
