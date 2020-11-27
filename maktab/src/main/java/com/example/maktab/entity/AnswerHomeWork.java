package com.example.maktab.entity;

import com.example.maktab.entity.template.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnswerHomeWork extends AbsEntity {

    @ManyToOne
    private Student student;

    @OneToOne
    private HomeWork homeWork;

    private Integer rate;

    @ManyToMany
    private Set<FileHomWork> fileHomWorks;

    @ManyToMany
    private Set<FileHomWork> checkFileHomeWork;
}