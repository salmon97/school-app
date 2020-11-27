package com.example.maktab.repository;

import com.example.maktab.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

//@CrossOrigin
//@RepositoryRestResource(path = "subject", collectionResourceRel = "list", excerptProjection = CustomSubject.class)
public interface SubjectRepository extends JpaRepository<Subject, Long> {

    @Query(value = "select s.id,s.name_uz , s.name_ru,s.name_eng from time_table t, subject s where t.group_id = :groupId and " +
            " t.subject_id = s.id group by s.id,s.name_eng,s.name_ru,s.name_uz",nativeQuery = true)
    List<Subject> getAllByGroup(UUID groupId);
}