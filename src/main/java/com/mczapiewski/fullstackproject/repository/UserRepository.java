package com.mczapiewski.fullstackproject.repository;

import com.mczapiewski.fullstackproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
