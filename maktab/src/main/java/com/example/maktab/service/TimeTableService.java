package com.example.maktab.service;

import com.example.maktab.entity.TimeTable;
import com.example.maktab.entity.WeekDays;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqTimeTable;
import com.example.maktab.payload.ResTimeTable;
import com.example.maktab.payload.ResWeekDays;
import com.example.maktab.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class TimeTableService {

    @Autowired
    TimetableRepository timetableRepository;

    @Autowired
    SubjectRepository subjectRepository;

    @Autowired
    GroupRepository groupRepository;

    @Autowired
    TeacherRepository teacherRepository;

    @Autowired
    WeekDaysRepository weekDaysRepository;

    @Autowired
    HomeWorkService homeWorkService;

    public ApiResponse addTimeTable(ReqTimeTable reqTimeTable) {
        if (!timetableRepository.checkExistTimeTable(reqTimeTable.getTeacherId(), reqTimeTable.getWeekDaysId(), reqTimeTable.getStartHour() + ":" + reqTimeTable.getStartHourMin(), reqTimeTable.getEndHour() + ":" + reqTimeTable.getEndHourMin())) {
            TimeTable timeTable = new TimeTable();
            timeTable.setSubject(subjectRepository.findById(reqTimeTable.getSubjectId()).orElseThrow(() -> new ResourceNotFoundException("getSubject")));
            timeTable.setWeekDays(weekDaysRepository.findById(reqTimeTable.getWeekDaysId()).orElseThrow(() -> new ResourceNotFoundException("getWeek")));
            timeTable.setTeacher(teacherRepository.findById(reqTimeTable.getTeacherId()).orElseThrow(() -> new ResourceNotFoundException("getTeacher")));
            timeTable.setGroup(groupRepository.findById(reqTimeTable.getGroupId()).orElseThrow(() -> new ResourceNotFoundException("getGroup")));
            timeTable.setStartHour(reqTimeTable.getStartHour() + ":" + reqTimeTable.getStartHourMin());
            timeTable.setEndHour(reqTimeTable.getEndHour() + ":" + reqTimeTable.getEndHourMin());
            timeTable.setPlace(reqTimeTable.getPlace());
            timetableRepository.save(timeTable);
            return new ApiResponse("save", true);
        } else {
            return new ApiResponse("like is time table exists", false);
        }
    }

    public ApiResponse editTimeTable(ReqTimeTable reqTimeTable) {
        TimeTable timeTable = timetableRepository.findById(reqTimeTable.getTimeTableId()).orElseThrow(() -> new ResourceNotFoundException("getTimeTable"));
        if (!timetableRepository.checkExistTimeTable(reqTimeTable.getTeacherId(), reqTimeTable.getWeekDaysId(), reqTimeTable.getStartHour(), reqTimeTable.getEndHour())) {
            timeTable.setSubject(subjectRepository.findById(reqTimeTable.getSubjectId()).orElseThrow(() -> new ResourceNotFoundException("getSubject")));
            timeTable.setWeekDays(weekDaysRepository.findById(reqTimeTable.getWeekDaysId()).orElseThrow(() -> new ResourceNotFoundException("getWeek")));
            timeTable.setTeacher(teacherRepository.findById(reqTimeTable.getTeacherId()).orElseThrow(() -> new ResourceNotFoundException("getTeacher")));
            timeTable.setGroup(groupRepository.findById(reqTimeTable.getGroupId()).orElseThrow(() -> new ResourceNotFoundException("getGroup")));
            timeTable.setStartHour(reqTimeTable.getStartHour() + ":" + reqTimeTable.getStartHourMin());
            timeTable.setEndHour(reqTimeTable.getEndHour() + ":" + reqTimeTable.getEndHourMin());
            timeTable.setPlace(reqTimeTable.getPlace());
            timetableRepository.save(timeTable);
            return new ApiResponse("save", true);
        } else {
            return new ApiResponse("like is time table exists", false);
        }
    }

    //get time-table by for taecher
    public ApiResponse getGroupById(UUID groupId, UUID teacherId) {
        List<TimeTable> allByGroup_id = timetableRepository.findAllByGroup_IdAndTeacher_Id(groupId, teacherId);
        List<ResTimeTable> resTimeTables = new ArrayList<>();
        for (TimeTable timeTable : allByGroup_id) {
            resTimeTables.add(getTimeTableTemp(timeTable));
        }
        return new ApiResponse("resTimeTable", true, resTimeTables);
    }


    //template
    private ResTimeTable getTimeTableTemp(TimeTable timeTable) {
        return new ResTimeTable(
                timeTable.getId(),
                null, null, null,null,
                timeTable.getGroup().getId(),
                timeTable.getStartHour(),
                timeTable.getEndHour(),
                timeTable.getPlace(),
                timeTable.getTeacher().getUser().getLastName() + " " + timeTable.getTeacher().getUser().getLastName().substring(0, 1),
                timeTable.getSubject().getId(),
                timeTable.getSubject().getNameUz(),
                timeTable.getSubject().getNameRu(),
                timeTable.getSubject().getNameEng(),
                timeTable.getWeekDays().getNameUz(),
                timeTable.getWeekDays().getNameRu(),
                timeTable.getWeekDays().getNameEng(), false
        );
    }

    //for Student end admin
    public ApiResponse timeTale(UUID groupId) {
        List<WeekDays> all = weekDaysRepository.findAll();
        List<ResWeekDays> resWeekDays = new ArrayList<>();
        for (WeekDays weekDays : all) {
            List<ResTimeTable> resTimeTables = new ArrayList<>();
            List<TimeTable> allByGroup_idAndWeekDays_id = timetableRepository.findAllByGroup_IdAndWeekDays_Id(groupId, weekDays.getId());
            for (TimeTable timeTable : allByGroup_idAndWeekDays_id) {
                resTimeTables.add(new ResTimeTable(
                        timeTable.getId(),
                        timeTable.getWeekDays().getId(),
                        timeTable.getSubject().getId(),
                        timeTable.getTeacher().getId(),null,
                        timeTable.getGroup().getId(),
                        timeTable.getStartHour(),
                        timeTable.getEndHour(),
                        timeTable.getPlace(),
                        timeTable.getTeacher().getUser().getLastName() + " " + timeTable.getTeacher().getUser().getLastName().substring(0, 1),
                        timeTable.getSubject().getId(),
                        timeTable.getSubject().getNameUz(),
                        timeTable.getSubject().getNameRu(),
                        timeTable.getSubject().getNameEng(),
                        timeTable.getWeekDays().getNameUz(),
                        timeTable.getWeekDays().getNameRu(),
                        timeTable.getWeekDays().getNameEng(), false
                ));
            }
            resWeekDays.add(new ResWeekDays(
                    weekDays.getNameUz(),
                    weekDays.getNameRu(),
                    weekDays.getNameEng(),
                    resTimeTables
            ));
        }
        return new ApiResponse("timeTable", true, resWeekDays);
    }

    public ApiResponse deleteTimeTable(UUID id) {
        homeWorkService.deleteHomeWork(id);
        timetableRepository.deleteById(id);
        return new ApiResponse(id.toString(), true);
    }
}