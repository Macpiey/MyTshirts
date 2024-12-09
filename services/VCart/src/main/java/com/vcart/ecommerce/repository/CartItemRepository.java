package com.vcart.ecommerce.repository;

import com.vcart.ecommerce.entity.CartItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends MongoRepository<CartItem, String> {
    List<CartItem> findByUserId(String userId);
    void deleteByUserIdAndProductId(String userId, String productId);
    Optional<CartItem> findByUserIdAndProductId(String userId, String productId);
}
