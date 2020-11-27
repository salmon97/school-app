package com.example.maktab.repository;

import com.example.maktab.entity.AnswerHomeWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Transactional
public interface AnswerHomeWorkRepository extends JpaRepository<AnswerHomeWork, UUID> {
//    @Query(value = "select * from answer_home_work ans where ans.home_work_id = :homeWorkId and ans.student_id =:studentId ", nativeQuery = true)
//    AnswerHomeWork getByHomeWorkId(UUID homeWorkId, UUID studentId);

    AnswerHomeWork findByHomeWork_IdAndStudent_Id(UUID homeWork_id, UUID student_id);

    @Modifying
    @Query(value = "DELETE FROM public.answer_home_work_file_hom_works WHERE file_hom_works_id = :fileHomeWorkId", nativeQuery = true)
    int deleteFileHomeWrk(UUID fileHomeWorkId);

    @Modifying
    @Query(value = "DELETE FROM public.answer_home_work_check_file_home_work WHERE check_file_home_work_id = :fileHomeWorkId", nativeQuery = true)
    int deleteCheckFileHomeWrk(UUID fileHomeWorkId);

    List<AnswerHomeWork> findAllByStudent_Id(UUID student_id);
}