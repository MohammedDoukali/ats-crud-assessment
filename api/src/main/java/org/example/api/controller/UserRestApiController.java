package org.example.api.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.api.model.User;
import org.example.api.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequestMapping("/api/user")
@RestController
public class UserRestApiController {

    @Autowired
    private UserService userService;


    // Retrieve All Users
    @GetMapping(value = "/")
    public ResponseEntity<List<User>> getUsers() {
        System.out.println("invoked service");
        List<User> usersList = userService.findAll();
        if (usersList.isEmpty()) {
            log.error("Users  not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.emptyList());
        }
        return ResponseEntity.ok(usersList);
    }

    // Create User
    @PostMapping("/")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User savedUser = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
    
    // Delete User
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        System.out.println("invoked service");
        if (userService.findById(id).isPresent()) {
            userService.deleteById(id);
            log.info("Deleted User with Id: {}", id);
            return ResponseEntity.ok().build();
        }
        log.error("User not found.");
        return ResponseEntity.notFound().build();
    }

    // Get User by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        try {
            Optional<User> user = userService.findById(id);
            if (user.isPresent()) {
                return ResponseEntity.ok(user.get());
            } else {
                log.error("User with ID {} not found", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Error retrieving user with ID {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Update User
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @Valid @RequestBody User user) {
        Optional<User> existingUser = userService.findById(id);
        if (existingUser.isPresent()) {
            user.setId(id); // Ensure the ID is set correctly
            User updatedUser = userService.save(user);
            log.info("Updated User with ID: {}", id);
            return ResponseEntity.ok(updatedUser);
        } else {
            log.error("User with ID {} not found for update", id);
            return ResponseEntity.notFound().build();
        }
    }
}
