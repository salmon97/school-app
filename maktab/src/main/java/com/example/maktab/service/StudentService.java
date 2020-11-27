package com.example.maktab.service;

import com.example.maktab.entity.*;
import com.example.maktab.entity.enums.FileStatus;
import com.example.maktab.entity.enums.RoleName;
import com.example.maktab.payload.*;
import com.example.maktab.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class StudentService {
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    GroupRepository groupRepository;

    @Autowired
    AnswerHomeWorkRepository answerHomeWorkRepository;

    @Autowired
    AttendanceRepository attendanceRepository;

    @Autowired
    TimetableRepository timetableRepository;

    @Autowired
    ParentRepository parentRepository;

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    HomeWorkService homeWorkService;

    @Autowired
    FileHomeWorkWorkRepository fileHomeWorkWorkRepository;

    @Autowired
    FileStorageRepository fileStorageRepository;

    public ApiResponse registerStudent(ReqStudent reqStudent) {
        if (!userRepository.existsByUsername(reqStudent.getUsername()) && !userRepository.existsByUsername(reqStudent.getParentUsername())) {
            if (reqStudent.getPrePassword().equals(reqStudent.getPassword()) && reqStudent.getParentPassword().equals(reqStudent.getParentPrePassword())) {
                User user = new User();
                user.setFirstName(reqStudent.getFirstName());
                user.setLastName(reqStudent.getLastName());
                user.setUsername(reqStudent.getUsername());
                user.setPhoneNumber(reqStudent.getPhoneNumber());
                user.setPassword(passwordEncoder.encode(reqStudent.getPassword()));
                user.setBirthDate(reqStudent.getBirthDate());
                user.setRoles(Collections.singleton(roleRepository.roleName("ROLE_STUDENT")));
                user.setAddress(reqStudent.getAddress());
                userRepository.save(user);
                Student student = new Student();
                student.setGroup(groupRepository.findById(reqStudent.getGroupId()).orElseThrow(() -> new ResourceNotFoundException("getGroup")));
                student.setUser(user);
                studentRepository.save(student);
                User user1 = new User();
                user1.setFirstName(reqStudent.getParentFirstName());
                user1.setLastName(reqStudent.getParentLastName());
                user1.setUsername(reqStudent.getParentUsername());
                user1.setPhoneNumber(reqStudent.getParentPhoneNumber());
                user1.setPassword(passwordEncoder.encode(reqStudent.getParentPassword()));
                user1.setRoles(Collections.singleton(roleRepository.findByRoleName(RoleName.ROLE_PARENT)));
                userRepository.save(user1);
                Parent parent = new Parent();
                parent.setStudent(student);
                parent.setUser(user1);
                parentRepository.save(parent);
                return new ApiResponse("saved", true);
            }
            return new ApiResponse("password prePassword not equals", false);
        }
        return new ApiResponse("username already exist", false);
    }

    public ApiResponse editStudent(ReqStudent reqStudent) {
        Student student = studentRepository.findById(reqStudent.getId()).orElseThrow(() -> new ResourceNotFoundException("getStudent"));
        Parent parent = parentRepository.findByStudent_Id(student.getId());
        if (!userRepository.existsByUsernameAndIdNot(reqStudent.getUsername(), student.getUser().getId()) && !userRepository.existsByUsernameAndIdNot(reqStudent.getParentUsername(), parent.getUser().getId())) {
            if (reqStudent.getPrePassword().equals(reqStudent.getPassword()) && reqStudent.getParentPassword().equals(reqStudent.getParentPrePassword())) {
                student.getUser().setFirstName(reqStudent.getFirstName());
                student.getUser().setLastName(reqStudent.getLastName());
                student.getUser().setUsername(reqStudent.getUsername());
                student.getUser().setPhoneNumber(reqStudent.getPhoneNumber());
                student.getUser().setPassword(passwordEncoder.encode(reqStudent.getPassword()));
                student.getUser().setAddress(reqStudent.getAddress());
                userRepository.save(student.getUser());
                student.setGroup(groupRepository.findById(reqStudent.getGroupId()).orElseThrow(() -> new ResourceNotFoundException("getGroup")));
                studentRepository.save(student);
                parent.getUser().setFirstName(reqStudent.getParentFirstName());
                parent.getUser().setLastName(reqStudent.getParentLastName());
                parent.getUser().setUsername(reqStudent.getParentUsername());
                parent.getUser().setPhoneNumber(reqStudent.getParentPhoneNumber());
                parent.getUser().setPassword(passwordEncoder.encode(reqStudent.getParentPassword()));
                userRepository.save(parent.getUser());
                parentRepository.save(parent);
                return new ApiResponse("saved", true);
            }
            return new ApiResponse("password prePassword not equals", false);
        }
        return new ApiResponse("username already exist", false);
    }

    public ApiResponse deleteStudent(UUID id) {
        List<AnswerHomeWork> allByStudent_id = answerHomeWorkRepository.findAllByStudent_Id(id);
        for (AnswerHomeWork answerHomeWork : allByStudent_id) {
            for (FileHomWork fileHomWork : answerHomeWork.getFileHomWorks()) {
                answerHomeWorkRepository.deleteFileHomeWrk(fileHomWork.getId());
                fileHomeWorkWorkRepository.delete(fileHomWork);
                fileStorageService.delete(fileHomWork.getFileStorage().getId());
            }
            for (FileHomWork fileHomWork : answerHomeWork.getCheckFileHomeWork()) {
                answerHomeWorkRepository.deleteCheckFileHomeWrk(fileHomWork.getId());
                fileHomeWorkWorkRepository.delete(fileHomWork);
                fileStorageService.delete(fileHomWork.getFileStorage().getId());
            }
            answerHomeWorkRepository.delete(answerHomeWork);
        }
        Student student = studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getStudent"));
        FileStorage fileStorage = student.getUser().getFileStorage();
        studentRepository.deleteById(id);
        fileStorageService.delete(fileStorage.getId());
        return new ApiResponse("deleted", true);
    }

    public ApiResponse studentByGroupId(UUID groupId) {
        List<Student> allByGroup_id = studentRepository.findAllByGroup_Id(groupId);
        List<ResStudent> resStudents = new ArrayList<>();
        for (Student student : allByGroup_id) {
            resStudents.add(new ResStudent(
                    student.getUser().getFileStorage() != null ? student.getUser().getFileStorage().getId() : null,
                    student.getId(),
                    student.getUser().getFirstName(),
                    student.getUser().getLastName(),
                    student.getUser().getUsername(),
                    student.getUser().getPhoneNumber(),
                    student.getUser().getBirthDate(),
                    student.getUser().getAddress(),
                    new ResParent(
                            student.getParent().getId(),
                            student.getParent().getUser().getFirstName(),
                            student.getParent().getUser().getLastName(),
                            student.getParent().getUser().getUsername(),
                            student.getParent().getUser().getPhoneNumber())
            ));
        }
        return new ApiResponse("students", true, resStudents);
    }

    //get students by group
    public ApiResponse resStudents(UUID timeTableId) {
        TimeTable timeTable = timetableRepository.findById(timeTableId).orElseThrow(() -> new ResourceNotFoundException("getTimeTable"));
        List<Student> allByGroup_id = studentRepository.findAllByGroup_Id(timeTable.getGroup().getId());
        List<ResStudent> resStudents = new ArrayList<>();
        for (Student student : allByGroup_id) {
            Attendance attendance = attendanceRepository.getAttendanceByStudent(student.getId(), timeTableId);
            resStudents.add(new ResStudent(
                    student.getUser().getId(),
                    student.getParent().getUser().getId(),
                    student.getUser().getFileStorage() != null ? student.getUser().getFileStorage().getId() : null,
                    attendance != null ? attendance.getId() : null,
                    student.getId(),
                    student.getUser().getFirstName(),
                    student.getUser().getLastName(),
                    student.getUser().getUsername(),
                    student.getUser().getPhoneNumber(),
                    student.getUser().getAddress(),
                    attendance != null ? attendance.getAttendType() : null,
                    attendance != null ? attendance.getRate() : null
            ));
        }
        return new ApiResponse("students", true, resStudents);
    }


    public ApiResponse studentTeacher(User user) {
        Student student = studentRepository.findByUser_Id(user.getId());
        List<TimeTable> timeTables = timetableRepository.getByGroupForMsg(student.getGroup().getId());
        List<ResTimeTable> resTimeTables = new ArrayList<>();
        for (TimeTable timeTable : timeTables) {
            User user1 = timeTable.getTeacher().getUser();
            Subject subject = timeTable.getSubject();
            resTimeTables.add(new ResTimeTable(
                    timeTable.getTeacher().getId(),
                    user1.getId(),
                    user1.getFirstName() + " " + user1.getLastName(),
                    subject.getNameUz(),
                    subject.getNameRu(),
                    subject.getNameEng(),
                    messageRepository.existsBySentTo_IdAndSentFrom_IdAndRead(user.getId(), user1.getId(), false)
            ));
        }
        return new ApiResponse("resSubject and Teacher", true, resTimeTables);
    }


    public ApiResponse parentTeacher(User user) {
        Parent parent = parentRepository.findByUser_Id(user.getId());
        List<TimeTable> timeTables = timetableRepository.getByGroupForMsg(parent.getStudent().getGroup().getId());
        List<ResTimeTable> resTimeTables = new ArrayList<>();
        for (TimeTable timeTable : timeTables) {
            User user1 = timeTable.getTeacher().getUser();
            Subject subject = timeTable.getSubject();
            resTimeTables.add(new ResTimeTable(
                    timeTable.getTeacher().getId(),
                    user1.getId(),
                    user1.getFirstName() + " " + user1.getLastName(),
                    subject.getNameUz(),
                    subject.getNameRu(),
                    subject.getNameEng(),
                    messageRepository.existsBySentTo_IdAndSentFrom_IdAndRead(user.getId(), user1.getId(), false)
            ));
        }
        return new ApiResponse("resSubject and Teacher", true, resTimeTables);
    }


    public ApiResponse savePhoto(UUID fileId, User user) {
        fileStorageRepository.findById(fileId).ifPresent(fileStorage -> {
            user.setFileStorage(fileStorage);
            fileStorage.setFileStatus(FileStatus.FINISHED);
        });
        userRepository.save(user);
        return new ApiResponse("ok", true);
    }

//    public ResAttendance resAttendance(){
//
//    }
}