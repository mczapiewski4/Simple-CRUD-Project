package com.mczapiewski.fullstackproject.controller;

import com.mczapiewski.fullstackproject.model.User;
import com.mczapiewski.fullstackproject.service.UserService;
import com.mczapiewski.fullstackproject.service.UserServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/user")
@CrossOrigin

public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserServiceImplementation userServiceImplementation;

    @PostMapping("/add")
    public String add(@RequestBody User user) {
        userService.saveUser(user);
        return "New user is added";
    }

    @GetMapping("/getAll")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> get(@PathVariable Integer id) {
        try {
            User user = userService.getUser(id);
            return new ResponseEntity<User>(user, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@RequestBody User user, @PathVariable Integer id) {
        try {
            User existingUser = userService.getUser(id);
            userService.saveUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    // trochę na około z tym userServiceImplementation
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id) {
        userServiceImplementation.deleteUser(id);
        return "Deleted User with id " + id;
    }
}
