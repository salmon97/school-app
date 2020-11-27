package com.example.maktab.repository;

import com.example.maktab.entity.FileHomWork;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;


public interface FileHomeWorkWorkRepository extends JpaRepository<FileHomWork, UUID> {

}
