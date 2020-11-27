package com.example.maktab.repository;

import com.example.maktab.entity.Role;
import com.example.maktab.entity.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findByRoleName(RoleName roleName);

    @Query(value = "select * from role where role_name = :roleName",nativeQuery = true)
    Role roleName(String roleName);
}
