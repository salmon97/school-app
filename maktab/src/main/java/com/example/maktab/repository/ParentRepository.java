package com.example.maktab.repository;

import com.example.maktab.entity.Parent;
import com.example.maktab.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;


public interface ParentRepository extends JpaRepository<Parent, UUID> {

    Parent findByStudent_Id(UUID student_id);
    Parent findByUser_Id(UUID user_id);
}
