package com.example.maktab.projection;

import com.example.maktab.entity.Subject;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "CustomSubject", types = Subject.class)
public interface CustomSubject {
    Long getId();

    String getNameUz();

    String getNameRu();

    String getNameEng();
}
