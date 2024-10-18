package tech.getarrays.EventManager.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import tech.getarrays.EventManager.model.User;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
  void deleteUserById(Long id);

  Optional<User> findUserById(Long id);

  Optional<User> findUserByEmail(String email);

}
