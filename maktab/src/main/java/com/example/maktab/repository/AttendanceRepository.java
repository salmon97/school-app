package com.example.maktab.repository;

import com.example.maktab.entity.Attendance;
import com.example.maktab.payload.ResDiary;
import com.example.maktab.projection.CountRate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;
import java.util.UUID;


public interface AttendanceRepository extends JpaRepository<Attendance, UUID> {

    @Query(value = "select * from attendance a where a.student_id = :studentId and a.time_table_id =:timeTableId and Date(a.created_at) = current_date", nativeQuery = true)
    Attendance getAttendanceByStudent(UUID studentId, UUID timeTableId);

    @Query(value = "select * from attendance a where a.time_table_id = :timeTableId and Date(created_at) = current_date", nativeQuery = true)
    List<Attendance> getAllByAttendances(UUID timeTableId);

    @Query(value = "select ate.created_at as registerat, ate.attend_type as attend_type,  ate.rate as attendrate, s.name_uz as name_uz,s.name_ru as name_ru,s.name_eng as name_eng,an.rate as homeworkrate " +
            "from attendance ate  " +
            "inner join time_table tim on ate.time_table_id = tim.id " +
            "inner join subject s on tim.subject_id = s.id " +
            "left join home_work hm on hm.time_table_id = ate.time_table_id " +
            "left join answer_home_work an on an.home_work_id = hm.id " +
            "where ate.student_id = :studentId order by registerat desc", nativeQuery = true)
    Page<ResDiary> resDiary(UUID studentId, Pageable pageable);


    @Query(value = "select count(a.rate) as counts , a.rate as rate, sum(a.rate) as alls from attendance a ,time_table tim , subject s where a.time_table_id = tim.id and " +
            " s.id = tim.subject_id and a.student_id = :studentId and a.rate > 1 and s.id = :subjectId and " +
            "date(a.created_at) between :dateFrom and :dateTo " +
            "group by a.rate ", nativeQuery = true)
    List<CountRate> getByRateCountStudentId(UUID studentId, Date dateFrom, Date dateTo, long subjectId);


    @Query(value = "select sum((select count(a.*) from attendance a ,time_table tim , subject s where a.time_table_id = tim.id and " +
            "s.id = tim.subject_id and a.student_id = :studentId and s.id = :subjectId " +
            "and date(a.created_at) between :dateFrom and :dateTo) * 5)", nativeQuery = true)
    Integer getByLessonCount(UUID studentId, Date dateFrom, Date dateTo, long subjectId);

    @Query(value = "select date(created_at) as DATE from attendance where student_id = :studentId " +
            " order by created_at desc limit 1", nativeQuery = true)
    Date getByLastStudentId(UUID studentId);

    @Query(value = "select date(created_at) from attendance where student_id = :studentId " +
            "order by created_at asc limit 1", nativeQuery = true)
    Date getByBeginStudentId(UUID studentId);
}