package com.example.maktab.repository;

import com.example.maktab.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;


public interface GroupRepository extends JpaRepository<Group, UUID> {

    @Query(value = "select g.* from groups g, time_table ti where g.id = ti.group_id and ti.teacher_id = :teacherId group by g.id ", nativeQuery = true)
    List<Group> getByTeachersGroup(UUID teacherId);

    @Query(value = "select count(*) from groups ", nativeQuery = true)
    int countGroup();

}
