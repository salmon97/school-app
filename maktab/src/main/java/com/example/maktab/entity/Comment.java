package com.example.maktab.entity;

import com.example.maktab.entity.template.AbsEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment extends AbsEntity {

    @Column(columnDefinition = "text")
    private String text;

    @ManyToOne
    private HomeWork homeWork;

    @JsonIgnore
    @ManyToOne
    private User user;
}
