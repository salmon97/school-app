package com.example.maktab.entity;


import com.example.maktab.entity.template.AbsNameEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Subject extends AbsNameEntity {
}


