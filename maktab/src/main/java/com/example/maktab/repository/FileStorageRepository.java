package com.example.maktab.repository;

import com.example.maktab.entity.FileStorage;
import com.example.maktab.entity.enums.FileStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FileStorageRepository extends JpaRepository<FileStorage, UUID> {

    List<FileStorage> findAllByFileStatus(FileStatus fileStatus);
}

