package com.example.maktab.service;

import com.example.maktab.entity.AnswerHomeWork;
import com.example.maktab.entity.FileHomWork;
import com.example.maktab.entity.HomeWork;
import com.example.maktab.entity.enums.FileStatus;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqAnswerHomeWork;
import com.example.maktab.payload.ResAnswerHomeWork;
import com.example.maktab.payload.ResFileHomeWork;
import com.example.maktab.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class AnswerHomeWorkService {

    @Autowired
    AnswerHomeWorkRepository answerHomeWorkRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    HomeWorkRepository homeWorkRepository;

    @Autowired
    FileStorageRepository fileStorageRepository;

    @Autowired
    FileHomeWorkWorkRepository fileHomeWorkWorkRepository;

    @Autowired
    HomeWorkService homeWorkService;

    @Autowired
    FileStorageService fileStorageService;

    public ApiResponse addAnswerHomeWork(ReqAnswerHomeWork reqAnswerHomeWork, UUID studentId) {
        HomeWork homeWork = homeWorkRepository.findById(reqAnswerHomeWork.getHomeWorkId()).orElseThrow(() -> new ResourceNotFoundException("getHomeWork"));
        LocalDateTime localDateTime = LocalDateTime.now();
        if (homeWork.getCreatedAt().toLocalDateTime().toLocalDate().equals(localDateTime.toLocalDate()) && homeWork.getDeadline() >= localDateTime.getHour()) {
            AnswerHomeWork answerHomeWork = answerHomeWorkRepository.findByHomeWork_IdAndStudent_Id(reqAnswerHomeWork.getHomeWorkId(), studentId);
            FileHomWork fileHomWork = new FileHomWork();
            fileStorageRepository.findById(reqAnswerHomeWork.getFileId()).ifPresent(fileStorage -> {
                fileHomWork.setFileStorage(fileStorage);
                fileStorage.setFileStatus(FileStatus.FINISHED);
            });
            fileHomWork.setText(reqAnswerHomeWork.getText());
            fileHomeWorkWorkRepository.save(fileHomWork);
            if (answerHomeWork == null) {
                answerHomeWork = new AnswerHomeWork();
                answerHomeWork.setStudent(studentRepository.findById(studentId).orElseThrow(() -> new ResourceNotFoundException("getStudent")));
                answerHomeWork.setHomeWork(homeWorkRepository.findById(reqAnswerHomeWork.getHomeWorkId()).orElseThrow(() -> new ResourceNotFoundException("getHomeWork")));
                answerHomeWork.setFileHomWorks(Collections.singleton(fileHomWork));
            } else {
                answerHomeWork.getFileHomWorks().add(fileHomWork);
//            answerHomeWork.setFileHomWorks();
            }
            answerHomeWorkRepository.save(answerHomeWork);
            return new ApiResponse("ok", true, resAnswerHomeById(answerHomeWork));
        } else {
            return new ApiResponse("deadline finish", false);
        }
    }


    //res answer home work
    public ResAnswerHomeWork resAnswerHomeById(AnswerHomeWork answerHomeWork) {
        List<ResFileHomeWork> answerFile = new ArrayList<>();
        List<ResFileHomeWork> answerCheckFile = new ArrayList<>();
        answerHomeWork.getFileHomWorks().forEach(fileHomWork -> answerFile.add(new ResFileHomeWork(fileHomWork.getId(), fileHomWork.getFileStorage().getId(), fileHomWork.getText())));
        answerHomeWork.getCheckFileHomeWork().forEach(fileHomWork -> answerCheckFile.add(new ResFileHomeWork(fileHomWork.getId(), fileHomWork.getFileStorage().getId(), fileHomWork.getText())));
        return new ResAnswerHomeWork(
                answerHomeWork.getId(),
                answerHomeWork.getRate(),
                answerFile,
                answerCheckFile,
                answerHomeWork.getCreatedAt().toString().substring(0, 10)

        );
    }

    public ApiResponse deleteFile(UUID id) {
        Optional<FileHomWork> byId = fileHomeWorkWorkRepository.findById(id);
        if (byId.isPresent()) {
            System.out.println(answerHomeWorkRepository.deleteFileHomeWrk(id));//
            fileHomeWorkWorkRepository.delete(byId.get());
            fileStorageService.delete(byId.get().getFileStorage().getId());
        }
        return new ApiResponse(id.toString(), true);
    }

    //answer home work
    public ApiResponse resAnswerHomeWork(UUID answerHomeWorkId) {
        AnswerHomeWork answerHomeWork = answerHomeWorkRepository.findById(answerHomeWorkId).orElseThrow(() -> new ResourceNotFoundException("getAnswerHomeWork"));
        return new ApiResponse("answerHomeWork", true, resAnswerHomeById(answerHomeWork));
    }

    //check homework and send right answer
    public ApiResponse checkedHomeWork(ReqAnswerHomeWork reqAnswerHomeWork) {
        AnswerHomeWork answerHomeWork = answerHomeWorkRepository.findById(reqAnswerHomeWork.getAnswerHomeWorkId()).orElseThrow(() -> new ResourceNotFoundException("getAnswerHomeWork"));
        FileHomWork fileHomWork = new FileHomWork();
        fileStorageRepository.findById(reqAnswerHomeWork.getFileId()).ifPresent(fileStorage -> {
            fileHomWork.setFileStorage(fileStorage);
            fileStorage.setFileStatus(FileStatus.FINISHED);
        });
        fileHomWork.setText(reqAnswerHomeWork.getText());
        fileHomeWorkWorkRepository.save(fileHomWork);
        answerHomeWork.getCheckFileHomeWork().add(fileHomWork);
//        answerHomeWork.setCheckFileHomeWork();
        answerHomeWorkRepository.save(answerHomeWork);
        return new ApiResponse("resCheckAnswer", true, resAnswerHomeById(answerHomeWork));
    }


    public ApiResponse deleteCheckFileHomeWrk(UUID id) {
        Optional<FileHomWork> byId = fileHomeWorkWorkRepository.findById(id);
        if (byId.isPresent()) {
            System.out.println(answerHomeWorkRepository.deleteCheckFileHomeWrk(id));
            fileHomeWorkWorkRepository.delete(byId.get());
            fileStorageService.delete(byId.get().getFileStorage().getId());
        }
        return new ApiResponse(id.toString(), true);
    }

    public ApiResponse rateAnswerHomeWork(UUID answerHomeWokId, int rate) {
        AnswerHomeWork answerHomeWork = answerHomeWorkRepository.findById(answerHomeWokId).orElseThrow(() -> new ResourceNotFoundException("getAnswerHomeWork"));
        answerHomeWork.setRate(rate);
        answerHomeWorkRepository.save(answerHomeWork);
        return new ApiResponse("ok", true);
    }
}
