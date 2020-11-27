package com.example.maktab.entity;

import com.example.maktab.entity.enums.AttendType;
import com.example.maktab.entity.template.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Attendance extends AbsEntity {

    @ManyToOne
    private Student student;

    private String attendType;

    @ManyToOne
    private TimeTable timeTable;

    private Integer rate;

//    @OneToMany(mappedBy = "attendance", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<RateHomeWork> rateHomeWorks;
}