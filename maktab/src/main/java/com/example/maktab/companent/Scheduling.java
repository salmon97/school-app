package com.example.maktab.companent;

import com.example.maktab.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


@Component
@EnableScheduling
public class Scheduling {

    @Autowired
    FileStorageService fileStorageService;

    @Scheduled(cron = "0 13 * * * *")
    public void scheduling() {
        fileStorageService.deleteREJECTED();
    }

}
