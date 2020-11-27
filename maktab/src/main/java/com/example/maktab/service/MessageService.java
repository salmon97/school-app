package com.example.maktab.service;

import com.example.maktab.entity.Message;
import com.example.maktab.entity.User;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqMessageStuTea;
import com.example.maktab.payload.ResMessage;
import com.example.maktab.payload.ResPageable;
import com.example.maktab.repository.MessageRepository;
import com.example.maktab.repository.TeacherRepository;
import com.example.maktab.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MessageService {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TeacherRepository teacherRepository;

    public ResPageable messageSave(ReqMessageStuTea reqMessageStuTea, User user) {
        User getUser = userRepository.findById(reqMessageStuTea.getSentToId()).orElseThrow(() -> new ResourceNotFoundException("getUser"));
        Message message = new Message();
        message.setSentTo(getUser);
        message.setSentFrom(user);
        message.setText(reqMessageStuTea.getText());
        messageRepository.save(message);
        return resPageable(user.getId(),reqMessageStuTea.getSentToId(),20);
    }


    public ResPageable resPageable(UUID sendFromId, UUID sentToId, int size) {
        Pageable pageable = PageRequest.of(0, size);
        Page<Message> byMessage = messageRepository.getByMessage(sendFromId, sentToId, pageable);
        return new ResPageable(
                0,
                size,
                byMessage.getTotalElements(),
                byMessage.getTotalPages(),
                byMessage.getContent().stream().map(message -> resMessage(message,sendFromId)).collect(Collectors.toList())
        );
    }

    public ResMessage resMessage(Message message, UUID sendFromId) {
        if (message.getSentTo().getId().equals(sendFromId)) {
            message.setRead(true);
            messageRepository.save(message);
        }
        return new ResMessage(
                message.getId(),
                message.getSentTo().getId(),
                message.getSentTo().getUsername(),
                message.getText(),
                message.getSentFrom().getId(),
                message.getSentFrom().getUsername(),
                message.getSentFrom().getFirstName() + " " + message.getSentFrom().getLastName()
        );
    }

    //for teacher
    public ApiResponse noRead(UUID userId) {
        List<Message> messageList = messageRepository.getBySentTo_IdAndRead(userId);
        List<ResMessage> resMessages = new ArrayList<>();
        for (Message message : messageList) {
            resMessages.add(new ResMessage(
                    message.getSentTo().getId(),
                    message.getSentFrom().getId(),
                    message.getSentFrom().getFirstName() + " " + message.getSentFrom().getLastName()
            ));
        }
        return new ApiResponse("res", true, resMessages);
    }
}
