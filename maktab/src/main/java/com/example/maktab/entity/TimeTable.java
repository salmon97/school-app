package com.example.maktab.entity;

import com.example.maktab.entity.template.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

//@Table(uniqueConstraints = {
//        @UniqueConstraint(columnNames = {"subject","teacher", "group","weekDays","startHour","endHour"})
//})
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TimeTable extends AbsEntity {

    @ManyToOne(optional = false)
    private Subject subject;

    @ManyToOne(optional = false)
    private Teacher teacher;

    @ManyToOne(optional = false)
    private Group group;

    @ManyToOne
    private WeekDays weekDays;

    private String startHour;

    private String endHour;

    private String place;

}