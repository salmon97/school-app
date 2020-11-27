package com.example.maktab.repository;

import com.example.maktab.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    boolean existsByUsername(String username);

    boolean existsByUsernameAndIdNot(String username, UUID id);

    Optional<User> findByUsername(String username);

    @Query(value = "select * from users u inner join user_role ur on u.id = ur.user_id and ur.role_id = 'ROLE_ADMIN'", nativeQuery = true)
    List<User> getAdmins();
}