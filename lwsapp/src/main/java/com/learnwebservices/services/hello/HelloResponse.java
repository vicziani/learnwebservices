package com.learnwebservices.services.hello;

import javax.xml.bind.annotation.XmlElement;

public class HelloResponse {

    private String message;

    public HelloResponse() {
    }

    public HelloResponse(String message) {
        this.message = message;
    }

    @XmlElement(name = "Message", required = true)
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
