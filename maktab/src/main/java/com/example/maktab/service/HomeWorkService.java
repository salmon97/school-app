package com.example.maktab.service;

import com.example.maktab.entity.*;
import com.example.maktab.entity.enums.FileStatus;
import com.example.maktab.payload.*;
import com.example.maktab.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class HomeWorkService {

    @Autowired
    HomeWorkRepository homeWorkRepository;

    @Autowired
    TimetableRepository timetableRepository;

    @Autowired
    FileHomeWorkWorkRepository fileHomeWorkWorkRepository;

    @Autowired
    AnswerHomeWorkRepository answerHomeWorkRepository;

    @Autowired
    AttendanceRepository attendanceRepository;

    @Autowired
    FileStorageRepository fileStorageRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    CommentRepository commentRepository;

    public ApiResponse addHomeWork(ReqHomeWork reqHomeWork) {
        HomeWork byTimeTableId = homeWorkRepository.getByTimeTableId(reqHomeWork.getTimeTableId());
        FileHomWork fileHomWork = new FileHomWork();
        fileStorageRepository.findById(reqHomeWork.getFileId()).ifPresent(fileStorage -> {
            fileHomWork.setFileStorage(fileStorage);
            fileStorage.setFileStatus(FileStatus.FINISHED);
        });
        fileHomWork.setText(reqHomeWork.getText());
        fileHomeWorkWorkRepository.save(fileHomWork);
        if (byTimeTableId == null) {
            byTimeTableId = new HomeWork();
            byTimeTableId.setTimeTable(timetableRepository.findById(reqHomeWork.getTimeTableId()).orElseThrow(() -> new ResourceNotFoundException("getTimeTable")));
            byTimeTableId.setSubject(timetableRepository.findById(reqHomeWork.getTimeTableId()).orElseThrow(() -> new ResourceNotFoundException("getTimeTable")).getSubject());
            byTimeTableId.setFileHomWorks(Collections.singleton(fileHomWork));
        } else {
            byTimeTableId.getFileHomWorks().add(fileHomWork);
//            byTimeTableId.setFileHomWorks();
        }
        homeWorkRepository.save(byTimeTableId);
        return new ApiResponse("ok", true);
    }

    public ApiResponse addFileHomeWork(ReqHomeWork reqHomeWork) {
        HomeWork getHmeWork = homeWorkRepository.findById(reqHomeWork.getHomeWorkId()).orElseThrow(() -> new ResourceNotFoundException("getHmeWork"));
        FileHomWork fileHomWork = new FileHomWork();
        fileStorageRepository.findById(reqHomeWork.getFileId()).ifPresent(fileStorage -> {
            fileHomWork.setFileStorage(fileStorage);
            fileStorage.setFileStatus(FileStatus.FINISHED);
        });
        fileHomWork.setText(reqHomeWork.getText());
        fileHomeWorkWorkRepository.save(fileHomWork);
        getHmeWork.getFileHomWorks().add(fileHomWork);
        homeWorkRepository.save(getHmeWork);
        return new ApiResponse("ok", true, new ResFileHomeWork(fileHomWork.getId(), fileHomWork.getFileStorage().getId(), fileHomWork.getText()));
    }

    //forStudent
    public ResPageable resHowWorkForStudent(Long subjectId, String givenDate, int page, UUID studentId) throws ParseException {
        Pageable pageable = PageRequest.of(page, 1, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<HomeWork> homeWorks;
        if (givenDate.isEmpty()) {
            homeWorks = homeWorkRepository.findAllBySubject_Id(subjectId, pageable);
        } else {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            Date date = formatter.parse(givenDate);
            Timestamp timestamp = new Timestamp(date.getTime());
//            Date date = Date.valueOf(givenDate);
            homeWorks = homeWorkRepository.findAllBySubject_IdAndCreatedAtBefore(subjectId, timestamp, pageable);
        }
        return new ResPageable(
                page,
                pageable.getPageSize(),
                homeWorks.getTotalElements(),
                homeWorks.getTotalPages(),
                homeWorks.getContent().stream().map(homeWork -> resHowWorkForStudent(homeWork, studentId)).collect(Collectors.toList())
        );
    }

    //get hom works by groupId
    public ResPageable resHomWorksByTimeTable(UUID timeTableId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<HomeWork> homeWorks = homeWorkRepository.findAllBySubject_Id(timetableRepository.findById(timeTableId).orElseThrow(() -> new ResourceNotFoundException("getTimeTable")).getSubject().getId(), pageable);
        return new ResPageable(
                page,
                size,
                homeWorks.getTotalElements(),
                homeWorks.getTotalPages(),
                homeWorks.getContent().stream().map(this::resHowWork).collect(Collectors.toList())
        );
    }


    //template
    protected ResHowWork resHowWork(HomeWork homeWork) {
        List<Student> allByGroup_id = studentRepository.findAllByGroup_Id(homeWork.getTimeTable().getGroup().getId());
        List<ResAnswerHomeWork> resAnswerHomeWorks = new ArrayList<>();
        List<ResFileHomeWork> resFileHomeWorks = new ArrayList<>();

        Set<FileHomWork> fileHomWorks = homeWork.getFileHomWorks();
        for (FileHomWork fileHomeWork : fileHomWorks) {
            resFileHomeWorks.add(new ResFileHomeWork(fileHomeWork.getId(), fileHomeWork.getFileStorage().getId(), fileHomeWork.getText()));
        }
        for (Student student : allByGroup_id) {
            AnswerHomeWork answerHomeWork = answerHomeWorkRepository.findByHomeWork_IdAndStudent_Id(homeWork.getId(), student.getId());
            resAnswerHomeWorks.add(new ResAnswerHomeWork(
                    student.getUser().getFileStorage() != null ? student.getUser().getFileStorage().getId() : null,
                    student.getUser().getFirstName() + " " + student.getUser().getLastName(),
                    answerHomeWork != null ? answerHomeWork.getId() : null
            ));
        }

        List<Comment> allByHomeWorkId = commentRepository.getAllByHomeWorkId(homeWork.getId(), 20);
        List<ResComment> resComments = new ArrayList<>();
        allByHomeWorkId.forEach(comment -> resComments.add(new ResComment(homeWork.getId(), comment.getUser().getFirstName() + " " + comment.getUser().getLastName(), comment.getUser().getId(), comment.getText())));
        return new ResHowWork(
                homeWork.getId(),
                homeWork.getCreatedAt().toString().substring(0, 10),
                resFileHomeWorks,
                resAnswerHomeWorks,
                resComments
        );
    }


    public ApiResponse deleteFile(UUID id) {
        Optional<FileHomWork> byId = fileHomeWorkWorkRepository.findById(id);
        if (byId.isPresent()) {
            System.out.println(homeWorkRepository.deleteFileHomeWrk(id));
            fileHomeWorkWorkRepository.delete(byId.get());
            fileStorageService.delete(byId.get().getFileStorage().getId());
        }
        return new ApiResponse(id.toString(), true);
    }

    //home work id
    public ApiResponse getHomeWorkId(UUID homeWorkId, UUID studentId) {
        HomeWork homeWork = homeWorkRepository.findById(homeWorkId).orElseThrow(() -> new ResourceNotFoundException("homeWork"));
        return new ApiResponse("ok", true, resHowWorkForStudent(homeWork, studentId));
    }

    //template for student
    protected ResHowWork resHowWorkForStudent(HomeWork homeWork, UUID studentId) {
        List<ResFileHomeWork> resFileHomeWorks = new ArrayList<>();
        homeWork.getFileHomWorks().forEach(fileHomWork -> resFileHomeWorks.add(new ResFileHomeWork(fileHomWork.getId(), fileHomWork.getFileStorage().getId(), fileHomWork.getText())));
        List<Comment> allByHomeWorkId = commentRepository.getAllByHomeWorkId(homeWork.getId(), 20);
        List<ResComment> resComments = new ArrayList<>();
        allByHomeWorkId.forEach(comment -> resComments.add(new ResComment(homeWork.getId(), comment.getUser().getFirstName() + " " + comment.getUser().getLastName(), comment.getUser().getId(), comment.getText())));
        return new ResHowWork(
                homeWork.getDeadline(),
                homeWork.getId(),
                homeWork.getCreatedAt().toString().substring(0, 10),
                resFileHomeWorks,
                resAnswerHomeWork(homeWork.getId(), studentId),
                resComments
        );
    }


    private ResAnswerHomeWork resAnswerHomeWork(UUID homeWorkId, UUID studentId) {
        AnswerHomeWork answerHomeWork = answerHomeWorkRepository.findByHomeWork_IdAndStudent_Id(homeWorkId, studentId);
        if (answerHomeWork == null) {
            return null;
        } else {
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
    }

    public ApiResponse addComment(ReqHomeWork reqHomeWork, User user) {
        Comment comment = new Comment();
        comment.setHomeWork(homeWorkRepository.findById(reqHomeWork.getHomeWorkId()).orElseThrow(() -> new ResourceNotFoundException("getHomeWork")));
        comment.setUser(user);
        comment.setText(reqHomeWork.getText());
        commentRepository.save(comment);
        return resPageableComment(20, reqHomeWork.getHomeWorkId());
    }

    public ApiResponse resPageableComment(int size, UUID homeWorkId) {
        List<Comment> allByHomeWorkId = commentRepository.getAllByHomeWorkId(homeWorkId, size);
        List<ResComment> resComments = new ArrayList<>();
        allByHomeWorkId.forEach(comment -> resComments.add(new ResComment(comment.getId(), comment.getUser().getFirstName() + " " + comment.getUser().getLastName(), comment.getUser().getId(), comment.getText())));
        return new ApiResponse("resComment", true, resComments, size);
    }

    public ApiResponse resTodayHomeWork(UUID groupId) {
        List<HomeWork> todayHomeWork = homeWorkRepository.getTodayHomeWork(groupId);
        List<ResHowWork> resHowWorks = new ArrayList<>();
        for (HomeWork homeWork : todayHomeWork) {
            resHowWorks.add(new ResHowWork(
                    homeWork.getId(),
                    homeWork.getSubject().getNameUz(),
                    homeWork.getSubject().getNameRu(),
                    homeWork.getSubject().getNameEng(),
                    homeWork.getCreatedAt().toString().substring(0, 10),
                    homeWork.getDeadline()
            ));
        }
        return new ApiResponse("reshomeWork", true, resHowWorks);
    }

    public void deleteHomeWork(UUID timetableId) {
        List<HomeWork> allByTimeTable_id = homeWorkRepository.findAllByTimeTable_Id(timetableId);
        for (HomeWork homeWork : allByTimeTable_id) {
            for (FileHomWork fileHomWork : homeWork.getFileHomWorks()) {
                System.out.println(homeWorkRepository.deleteFileHomeWrk(fileHomWork.getId()));
                fileHomeWorkWorkRepository.delete(fileHomWork);
                fileStorageService.delete(fileHomWork.getFileStorage().getId());
            }
            homeWorkRepository.delete(homeWork);
        }
    }

}