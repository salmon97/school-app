package com.example.maktab.repository;

import com.example.maktab.entity.RatesTeacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Transactional
public interface RatesTeacherRepository extends JpaRepository<RatesTeacher, UUID> {

    @Query(value = "select exists(select * from rates_teacher where parent_id= :parentId" +
            " and date(register_at) > current_date - 30)", nativeQuery = true)
    boolean existsByOneMonth(UUID parentId);

    Page<RatesTeacher> findAllByTeacher_Id(UUID teacher_id, Pageable pageable);
}