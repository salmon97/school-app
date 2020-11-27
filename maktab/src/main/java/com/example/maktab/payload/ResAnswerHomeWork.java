package com.example.maktab.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResAnswerHomeWork {
    private String student;
    private UUID studentPhotoId;
    private UUID answerHomeWorkId;
    private ResHowWork resHowWork;
    private UUID studentId;
    private Integer rate;
    private List<ResFileHomeWork> resFileHomeWorks;
    private List<ResFileHomeWork> checkedFileHomeWorks;
    private String registerAt;

    public ResAnswerHomeWork(UUID studentPhotoId,String student, UUID answerHomeWorkId) {
        this.studentId = studentPhotoId;
        this.student = student;
        this.answerHomeWorkId = answerHomeWorkId;
    }

    public ResAnswerHomeWork(UUID answerHomeWorkId, Integer rate, List<ResFileHomeWork> resFileHomeWorks, List<ResFileHomeWork> checkedFileHomeWorks,String registerAt) {
        this.answerHomeWorkId = answerHomeWorkId;
        this.rate = rate;
        this.resFileHomeWorks = resFileHomeWorks;
        this.checkedFileHomeWorks = checkedFileHomeWorks;
        this.registerAt = registerAt;
    }
}
