package com.example.maktab.entity;

import com.example.maktab.entity.enums.FileStatus;
import com.example.maktab.entity.template.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.io.Serializable;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FileStorage extends AbsEntity implements Serializable {
    private String name;
    private String extension;
    private Long fileSize;
    private String hashId;
    private String contentType;
    private String uploadPath;

    @Enumerated(EnumType.STRING)
    private FileStatus fileStatus;
}
