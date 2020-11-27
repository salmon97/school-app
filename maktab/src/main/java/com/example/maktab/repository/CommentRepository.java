package com.example.maktab.repository;

import com.example.maktab.entity.Comment;
import com.example.maktab.entity.HomeWork;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {

    @Query(value = "select * from comment where home_work_id = :homeWorkId order by created_at desc limit :limitNum",nativeQuery = true)
    List<Comment> getAllByHomeWorkId(UUID homeWorkId,int limitNum);

}
