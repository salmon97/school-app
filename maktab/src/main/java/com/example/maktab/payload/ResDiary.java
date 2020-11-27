package com.example.maktab.payload;

import java.sql.Timestamp;

public interface ResDiary {
    Timestamp getRegisterat();

    String getAttend_type();

    Integer getAttendrate();

    String getName_uz();

    String getName_ru();

    String getName_eng();

    Integer getHomeworkrate();
}