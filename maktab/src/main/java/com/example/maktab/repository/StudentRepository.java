package com.example.maktab.repository;

import com.example.maktab.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;


public interface StudentRepository extends JpaRepository<Student, UUID> {

    List<Student> findAllByGroup_Id(UUID group_id);

    Student findByUser_Id(UUID user_id);


    @Query(value = "select count(*) from student", nativeQuery = true)
    int countStudent();

}