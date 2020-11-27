package com.example.maktab.service;

import com.example.maktab.entity.Parent;
import com.example.maktab.entity.RatesTeacher;
import com.example.maktab.payload.ApiResponse;
import com.example.maktab.payload.ReqRateTeacher;
import com.example.maktab.payload.ResPageable;
import com.example.maktab.payload.ResRateTeacher;
import com.example.maktab.repository.RatesTeacherRepository;
import com.example.maktab.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RatesTeacherService {

    @Autowired
    RatesTeacherRepository ratesTeacherRepository;

    @Autowired
    TeacherRepository teacherRepository;

    public ApiResponse ratesTeacher(ReqRateTeacher reqRateTeacher, Parent parent) {
        if (!ratesTeacherRepository.existsByOneMonth(parent.getId())) {
            RatesTeacher ratesTeacher = new RatesTeacher();
            ratesTeacher.setRate(reqRateTeacher.getRate());
            ratesTeacher.setParent(parent);
            ratesTeacher.setTeacher(teacherRepository.findById(reqRateTeacher.getTeacherId()).orElseThrow(() -> new ResourceNotFoundException("getTeacher")));
            ratesTeacherRepository.save(ratesTeacher);
            return new ApiResponse("ok", true);
        } else {
            return new ApiResponse("exist rate", false);
        }

    }


    public ResPageable resPageable(int page, int size, UUID teacherId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "registerAt"));
        Page<RatesTeacher> rates = ratesTeacherRepository.findAllByTeacher_Id(teacherId, pageable);
        return new ResPageable(
                page,
                size,
                rates.getTotalElements(),
                rates.getTotalPages(),
                rates.getContent().stream().map(ratesTeacher -> new ResRateTeacher(
                        teacherId,
                        ratesTeacher.getParent().getUser().getFirstName() + " " + ratesTeacher.getParent().getUser().getLastName(),
                        ratesTeacher.getRate(),
                        ratesTeacher.getRegisterAt().toString().substring(0, 10))
                ).collect(Collectors.toList())
        );
    }
}