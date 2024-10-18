package tech.getarrays.EventManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tech.getarrays.EventManager.exception.UserNotFoundException;
import tech.getarrays.EventManager.model.User;
import tech.getarrays.EventManager.repo.UserRepo;
import tech.getarrays.EventManager.util.PasswordUtil;

import java.util.List;

@Service
public class UserService {
  private final UserRepo userRepo;
  private final PasswordUtil passwordUtil;

  
  @Autowired
  public UserService(UserRepo userRepo, PasswordUtil passwordUtil) {
      this.userRepo = userRepo;
      this.passwordUtil = passwordUtil;
  }

  public User addUser(User user) {
    // Hash the password before saving
    String hashedPassword = passwordUtil.hashPassword(user.getPassword());
    user.setPassword(hashedPassword);
    return userRepo.save(user);
  }

  public User loginUser(String email, String password) {
    User user = userRepo.findUserByEmail(email)
      .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
    if (user != null && passwordUtil.verifyPassword(password, user.getPassword())) {
        return user; // Login successful
    }
    throw new UserNotFoundException("Invalid credentials");
  }

  public List<User> findaAllUsers() {
    return userRepo.findAll();
  }

  public User updateUser(User user) {
    return userRepo.save(user); 
  }

  public User findUserByEmail(String email) throws Throwable {
    return userRepo.findUserByEmail(email)
        .orElseThrow(() -> new UserNotFoundException("User with email " + email + " was not found"));
  }

  public User findUserById(Long id) throws Throwable {
    return userRepo.findUserById(id)
        .orElseThrow(() -> new UserNotFoundException("User with id " + id + " was not found"));
  }

  public void deleteUser(Long id) {
    userRepo.deleteUserById(id);
  }
}
