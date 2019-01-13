package com.learnwebservices.hello;

import com.learnwebservices.services.hello.HelloEndpoint;
import com.learnwebservices.services.hello.HelloRequest;
import com.learnwebservices.services.hello.HelloResponse;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class HelloEndpointTest {

    @Test
    public void testSayHello() {
        HelloEndpoint helloEndpoint = new HelloEndpoint();
        HelloResponse response = helloEndpoint.sayHello(new HelloRequest("John Doe"));
        assertEquals("Hello John Doe!", response.getMessage());
    }

}
