package com.cdac.sarvam.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.cdac.sarvam.model.UserCredentials;
import com.cdac.sarvam.repository.UserCredentialsRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserCredentialsService {

    private final UserCredentialsRepository repository;

    public Optional<UserCredentials> validateLogin(Long prn, String password) {
        Optional<UserCredentials> user = repository.findById(prn);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty();
    }
    
    public UserCredentials saveUser(UserCredentials user) {
        return repository.save(user);
    }
}
