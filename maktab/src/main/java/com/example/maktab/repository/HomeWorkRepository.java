package com.example.maktab.repository;

import com.example.maktab.entity.HomeWork;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Transactional
public interface HomeWorkRepository extends JpaRepository<HomeWork, UUID> {
    @Query(value = "select * from home_work where time_table_id = :timeTableId and Date(created_at) = current_date", nativeQuery = true)
    HomeWork getByTimeTableId(UUID timeTableId);

    Page<HomeWork> findAllBySubject_Id(Long subject_id, Pageable pageable);

//    @Query(value = "select s.* from home_work where subject_id = :subjectId and date(created_at) = date(:givenDate)", nativeQuery = true)
//    Page<HomeWork> getByDateAndSubject(Long subjectId, Date givenDate, Pageable pageable);

    @Modifying
    @Query(value = "DELETE FROM public.home_work_file_hom_works WHERE file_hom_works_id = :fileHomeWorkId", nativeQuery = true)
    int deleteFileHomeWrk(UUID fileHomeWorkId);

    Page<HomeWork> findAllBySubject_IdAndCreatedAtBefore(Long subject_id, Timestamp createdAt, Pageable pageable);

    @Query(value = "select h.* from home_work h , time_table tim where h.time_table_id = tim.id " +
            "and tim.group_id = :groupId and date(h.created_at) = current_date ", nativeQuery = true)
    List<HomeWork> getTodayHomeWork(UUID groupId);

    List<HomeWork> findAllByTimeTable_Id(UUID timeTable_id);
}