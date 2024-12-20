package com.vcart.ecommerce.service;

import com.vcart.ecommerce.entity.CartItem;
import com.vcart.ecommerce.entity.Product;
import com.vcart.ecommerce.exceptions.CartEmptyException;
import com.vcart.ecommerce.repository.CartItemRepository;
import com.vcart.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserRepository userRepository;

    // Get cart by user ID
    public List<CartItem> getCartByUserId(String userId) {
        boolean userExists = userRepository.findById(userId).isPresent();
        if (!userExists) {
            throw new IllegalArgumentException("User with ID " + userId + " does not exist.");
        }
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);

        if (cartItems.isEmpty()) {
            throw new CartEmptyException("Cart is empty for user with ID " + userId);
        }
        return cartItems;
    } 

    // Add to cart
    public CartItem addToCart(String userId, String productId, int quantity, String fileUploadedName) {
        Product product = productService.getProductById(productId);
        if (product == null) {
            throw new IllegalArgumentException("Product with ID " + productId + " does not exist.");
        }
        boolean userExists = userRepository.findById(userId).isPresent();
        if (!userExists) {
            throw new IllegalArgumentException("User with ID " + userId + " does not exist.");
        }

        Optional<CartItem> existingCartItemOpt = cartItemRepository.findByUserIdAndProductId(userId, productId);

        CartItem cartItem;
        if (existingCartItemOpt.isPresent()) {
            cartItem = existingCartItemOpt.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            // Update fileUploadedName only if a new valid value is provided
            if (fileUploadedName != null && !fileUploadedName.isEmpty()) {
                cartItem.setFileUploadedName(fileUploadedName);
            }
        } else {
            cartItem = new CartItem();
            cartItem.setUserId(userId);
            cartItem.setProductId(productId);
            cartItem.setProductName(product.getName());
            cartItem.setPrice(product.getPrice());
            cartItem.setQuantity(quantity);
            cartItem.setImageUrl(product.getImageUrl());
            cartItem.setFileUploadedName(fileUploadedName);
        }
    return cartItemRepository.save(cartItem);
    }   


    // Remove from cart
    public void removeFromCart(String userId, String productId) {
        // Validate User ID
        boolean userExists = userRepository.findById(userId).isPresent();
        if (!userExists) {
            throw new IllegalArgumentException("User with ID " + userId + " does not exist.");
        }

        // Validate Product ID exists in user's cart
        boolean productInCart = cartItemRepository.findByUserId(userId).stream()
                .anyMatch(item -> item.getProductId().equals(productId));
        if (!productInCart) {
            throw new IllegalArgumentException("Product with ID " + productId + " is not in the cart of user " + userId);
        }

        // Remove the product from the cart
        cartItemRepository.deleteByUserIdAndProductId(userId, productId);
    }

    // Calculate total cart value
    public BigDecimal calculateTotal(String userId) {
        // Validate User ID
        boolean userExists = userRepository.findById(userId).isPresent();
        if (!userExists) {
            throw new IllegalArgumentException("User with ID " + userId + " does not exist.");
        }

        // Get cart items
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        if (cartItems.isEmpty()) {
            throw new IllegalArgumentException("Cart is empty for user with ID " + userId);
        }

        // Calculate total
        return cartItems.stream()
            .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
