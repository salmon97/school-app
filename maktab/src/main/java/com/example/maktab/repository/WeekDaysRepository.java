package com.example.maktab.repository;

import com.example.maktab.entity.WeekDays;
import com.example.maktab.projection.CustomWeekDays;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(path = "weekdays", collectionResourceRel = "list", excerptProjection = CustomWeekDays.class)
public interface WeekDaysRepository extends JpaRepository<WeekDays, Long> {
}