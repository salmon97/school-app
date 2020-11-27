package com.example.maktab.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResMessage {
    private UUID messageId;
    private UUID sentToId;
    private String sentToUserName;
    private String message;
    private UUID sentFromId;
    private String sentFromUserName;
    private String sentFromName;

    public ResMessage(UUID sentToId, UUID sentFromId, String sentFromUserName) {
        this.sentToId = sentToId;
        this.sentFromId = sentFromId;
        this.sentFromUserName = sentFromUserName;
    }

}
