package com.example.maktab.repository;

import com.example.maktab.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;


public interface MessageRepository extends JpaRepository<Message, UUID> {

    @Query(value = "select * from message where (sent_to_id = :sentFromId and sent_from_id = :sentToId) or (sent_to_id = :sentToId and sent_from_id = :sentFromId) order by created_at desc ", nativeQuery = true)
    Page<Message> getByMessage(UUID sentFromId, UUID sentToId, Pageable pageable);

//    List<Message> findAllBySentTo_IdAndRead(UUID sentTo_id, boolean read);

    @Query(value = "select distinct on(sent_from_id) * from message m where sent_to_id = :userId and read = false",nativeQuery = true)
    List<Message> getBySentTo_IdAndRead(UUID userId);

    boolean existsBySentTo_IdAndSentFrom_IdAndRead(UUID sentTo_id, UUID sentFrom_id, boolean read);
}

//    @Query(value = "SELECT * FROM message_stu_teac WHERE teacher_id = :teacherId  ORDER BY created_at asc ", nativeQuery = true)
//    Page<MessageStuTeac> getByMessage(UUID teacherId, Pageable pageable);
//
//    @Query(value = "SELECT * FROM message_stu_teac WHERE student_id = :studentId  ORDER BY created_at asc ", nativeQuery = true)
//    Page<MessageStuTeac> getByMessageSt(UUID studentId, Pageable pageable);