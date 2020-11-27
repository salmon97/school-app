package com.example.maktab.entity;

import com.example.maktab.entity.template.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;


@Getter
@Setter
@Entity(name = "groups")
@AllArgsConstructor
@NoArgsConstructor
public class Group extends AbsEntity {

    private String nameUz;
    private String nameRu;
    private String nameEng;

    //    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(name = "groups_subjects",
//            joinColumns = @JoinColumn(name = "group_id"),
//            inverseJoinColumns = @JoinColumn(name = "subject_id")
//    )
//    private Set<Subject> subject;
//
//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(name = "groups_teachers",
//            joinColumns = @JoinColumn(name = "group_id"),
//            inverseJoinColumns = @JoinColumn(name = "teacher_id")
//    )
//    private Set<Teacher> teacher;
}