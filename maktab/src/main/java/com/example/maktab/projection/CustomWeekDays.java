package com.example.maktab.projection;

import com.example.maktab.entity.WeekDays;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "CustomWeekDays", types = WeekDays.class)
public interface CustomWeekDays {
    Long getId();

    String getNameUz();

    String getNameRu();

    String getNameEng();
}
