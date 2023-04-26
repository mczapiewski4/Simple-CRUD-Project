package com.mczapiewski.fullstackproject.service;

import com.mczapiewski.fullstackproject.model.User;

import java.util.List;

public interface UserService {
    public User saveUser(User user);
    public List<User> getAllUsers();
    public User getUser(Integer id);
}
