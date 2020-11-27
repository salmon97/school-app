package com.example.maktab.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResGroup {
    private UUID id;
    private String nameUz;
    private String nameRu;
    private String nameEng;
    private String registerAt;

    public ResGroup(UUID id, String nameUz, String nameRu, String nameEng) {
        this.id = id;
        this.nameUz = nameUz;
        this.nameRu = nameRu;
        this.nameEng = nameEng;
    }
    //    private String teacherName;
}