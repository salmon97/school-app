package com.example.maktab.entity;

import com.example.maktab.entity.template.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HomeWork extends AbsEntity {

    @ManyToOne
    private TimeTable timeTable;

    @ManyToOne
    private Subject subject;

    @ManyToMany
    private Set<FileHomWork> fileHomWorks;

    private Integer deadline = 19;
}