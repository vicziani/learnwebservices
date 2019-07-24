package com.learnwebservices.services.hello;

import org.springframework.stereotype.Service;

@Service
public class SimpleHelloEndpoint implements HelloEndpoint {

    public HelloResponse sayHello(HelloRequest request) {
        return new HelloResponse(String.format("Hello %s!", request.getName()));
    }

}
