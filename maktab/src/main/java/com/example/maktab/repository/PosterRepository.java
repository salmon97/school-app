package com.example.maktab.repository;

import com.example.maktab.entity.Poster;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;


public interface PosterRepository extends JpaRepository<Poster, UUID> {
}