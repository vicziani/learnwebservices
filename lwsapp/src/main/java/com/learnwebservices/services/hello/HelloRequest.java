package com.learnwebservices.services.hello;

import javax.xml.bind.annotation.XmlElement;

public class HelloRequest {

    private String name;

    public HelloRequest() {
    }

    public HelloRequest(String name) {
        this.name = name;
    }

    @XmlElement(name = "Name", required = true)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
