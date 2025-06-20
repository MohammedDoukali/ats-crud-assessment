package org.example.api.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.api.model.User;
import org.example.api.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

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


}
