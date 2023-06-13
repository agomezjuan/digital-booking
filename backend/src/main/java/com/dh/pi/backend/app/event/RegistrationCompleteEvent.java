package com.dh.pi.backend.app.event;

import org.springframework.context.ApplicationEvent;

import com.dh.pi.backend.app.model.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationCompleteEvent extends ApplicationEvent {

    private User user;
    private String appUrl;

    public RegistrationCompleteEvent(User user, String string) {
        super(user);
        this.user = user;
        this.appUrl = string;
    }

}
