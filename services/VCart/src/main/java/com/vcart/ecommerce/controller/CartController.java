package com.vcart.ecommerce.controller;

import com.vcart.ecommerce.entity.CartItem;
import com.vcart.ecommerce.service.CartService;
import com.vcart.ecommerce.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private FileUploadService fileUploadService;

    @GetMapping("/{userId}")
    public List<CartItem> getCart(@PathVariable String userId) {
        return cartService.getCartByUserId(userId);
    }

    @PostMapping("/add")
    public CartItem addToCart(
            @RequestParam String userId,
            @RequestParam String productId,
            @RequestParam int quantity,
            @RequestParam(required = false) MultipartFile file) throws IOException {

        String uploadedFileName = null;
        if (file != null && !file.isEmpty()) {
            uploadedFileName = file.getOriginalFilename();
            fileUploadService.uploadFile(file);
        }
        return cartService.addToCart(userId, productId, quantity, uploadedFileName);
    }

    @DeleteMapping("/remove")
    public void removeFromCart(@RequestParam String userId, @RequestParam String productId) {
        cartService.removeFromCart(userId, productId);
    }

    @GetMapping("/total/{userId}")
    public BigDecimal getTotal(@PathVariable String userId) {
        return cartService.calculateTotal(userId);
    }
}
