package com.example.maktab.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResHowWork {
    private String student;
    private UUID homeWorkId;
    private UUID answerHomeWorkId;
    private String registerAt;
    private List<ResFileHomeWork> resFileHomeWorks;
    private List<ResAnswerHomeWork> resAnswerHomeWorks;
    private ResAnswerHomeWork resAnswerHomeWork;
    private List<ResComment> resComments;
    private int deadline;
    private String subNameUz;
    private String subNameRu;
    private String subNameEng;

    public ResHowWork(UUID homeWorkId, String registerAt, List<ResFileHomeWork> resFileHomeWorks, List<ResAnswerHomeWork> resAnswerHomeWorks, List<ResComment> resComments) {
        this.homeWorkId = homeWorkId;
        this.registerAt = registerAt;
        this.resFileHomeWorks = resFileHomeWorks;
        this.resAnswerHomeWorks = resAnswerHomeWorks;
        this.resComments = resComments;
    }

    public ResHowWork(int deadline, UUID homeWorkId, String registerAt, List<ResFileHomeWork> resFileHomeWorks, ResAnswerHomeWork resAnswerHomeWork, List<ResComment> resComments) {
        this.deadline = deadline;
        this.homeWorkId = homeWorkId;
        this.registerAt = registerAt;
        this.resFileHomeWorks = resFileHomeWorks;
        this.resAnswerHomeWork = resAnswerHomeWork;
        this.resComments = resComments;
    }

    public ResHowWork(UUID homeWorkId, String subNameUz, String subNameRu, String subNameEng, String registerAt, int deadline) {
        this.homeWorkId = homeWorkId;
        this.subNameUz = subNameUz;
        this.subNameRu = subNameRu;
        this.subNameEng = subNameEng;
        this.registerAt = registerAt;
        this.deadline = deadline;
    }
}
