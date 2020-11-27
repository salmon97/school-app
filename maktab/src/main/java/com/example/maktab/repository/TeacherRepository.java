package com.example.maktab.repository;

import com.example.maktab.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;


public interface TeacherRepository extends JpaRepository<Teacher, UUID> {

    Teacher findByUser_Id(UUID user_id);


    @Query(value = "select count(*) from teacher ", nativeQuery = true)
    int countTeacher();
}
