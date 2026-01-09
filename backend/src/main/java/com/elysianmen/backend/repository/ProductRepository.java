package com.elysianmen.backend.repository;

import com.elysianmen.backend.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

    List<Product> findByCategory(String category);

    List<Product> findByInStock(Boolean inStock);

    @Query("{ 'price': { $gte: ?0, $lte: ?1 } }")
    List<Product> findByPriceRange(Double minPrice, Double maxPrice);

    @Query("{ 'category': ?0, 'price': { $gte: ?1, $lte: ?2 } }")
    List<Product> findByCategoryAndPriceRange(String category, Double minPrice, Double maxPrice);
}
