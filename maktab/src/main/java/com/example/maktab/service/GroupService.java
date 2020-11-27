package com.example.maktab.service;

import com.example.maktab.entity.Group;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqGroup;
import com.example.maktab.payload.ResGroup;
import com.example.maktab.payload.ResPageable;
import com.example.maktab.repository.GroupRepository;
import com.example.maktab.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GroupService {

    @Autowired
    GroupRepository groupRepository;

    @Autowired
    TeacherRepository teacherRepository;

    //only admin vs director
    public ApiResponse addGroup(ReqGroup reqGroup) {
        Group group = new Group();
//        group.setTeacher(teacherRepository.findById(reqGroup.getTeacherId()).orElseThrow(() -> new ResourceNotFoundException("getTeacher")));
        group.setNameUz(reqGroup.getNameUz());
        group.setNameRu(reqGroup.getNameRu());
        group.setNameEng(reqGroup.getNameEng());
        groupRepository.save(group);
        return new ApiResponse("group added", true);
    }

    //only admin vs director
    public ApiResponse editGroup(ReqGroup reqGroup) {
        Group group = groupRepository.findById(reqGroup.getId()).orElseThrow(() -> new ResourceNotFoundException("getGroup"));
//        group.setTeacher(teacherRepository.findById(reqGroup.getTeacherId()).orElseThrow(() -> new ResourceNotFoundException("getTeacher")));
        group.setNameUz(reqGroup.getNameUz());
        group.setNameRu(reqGroup.getNameRu());
        group.setNameEng(reqGroup.getNameEng());
        groupRepository.save(group);
        return new ApiResponse("group edited", true);
    }

    //for admin vs director
    public ResPageable getGroups(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Group> all = groupRepository.findAll(pageable);
        return new ResPageable(
                page, size,
                all.getTotalElements(),
                all.getTotalPages(),
                all.getContent().stream().map(this::getGroup).collect(Collectors.toList())
        );
    }

    //delete Group
    public ApiResponse deleteGroup(UUID uuid) {
        groupRepository.deleteById(uuid);
        return new ApiResponse(uuid.toString(), true);
    }

    //groups for teacher
    public ApiResponse resGroupsForTeacher(UUID teacherId) {
        List<Group> byTeachersGroup = groupRepository.getByTeachersGroup(teacherId);
        List<ResGroup> resGroups = new ArrayList<>();
        byTeachersGroup.forEach(group -> resGroups.add(getGroup(group)));
        return new ApiResponse("ok", true, resGroups);
    }


    //template
    public ResGroup getGroup(Group group) {
        return new ResGroup(
                group.getId(),
                group.getNameUz(),
                group.getNameRu(),
                group.getNameEng(),
                group.getCreatedAt().toString().substring(0, 10)
//                group.getTeacher().getUser().getFirstName() + " " + group.getTeacher().getUser().getLastName()
        );
    }

}