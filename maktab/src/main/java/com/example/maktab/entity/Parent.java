package com.example.maktab.entity;

import com.example.maktab.entity.template.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Parent extends AbsEntity {

    @ManyToOne(cascade = CascadeType.REMOVE)
    private User user;

    @OneToOne
    private Student student;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    List<RatesTeacher> ratesTeachers;
}