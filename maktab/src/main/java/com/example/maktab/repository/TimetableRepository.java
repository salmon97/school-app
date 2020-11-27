package com.example.maktab.repository;

import com.example.maktab.entity.TimeTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface TimetableRepository extends JpaRepository<TimeTable, UUID> {

    @Query(value = "select exists (select id from time_table where teacher_id = :teacherId and week_days_id = :weekDayId and start_hour = :startHour and end_hour =:endHour)",nativeQuery = true)
    boolean checkExistTimeTable(UUID teacherId, Long weekDayId, String startHour, String endHour);

    List<TimeTable> findAllByGroup_IdAndTeacher_Id(UUID group_id, UUID teacher_id);

    List<TimeTable> findAllByGroup_IdAndWeekDays_Id(UUID group_id, Long weekDays_id);

    @Query(value = "select distinct on(subject_id,teacher_Id) * from time_table t where t.group_id = :groupId",nativeQuery = true)
    List<TimeTable> getByGroupForMsg(UUID groupId);
}
