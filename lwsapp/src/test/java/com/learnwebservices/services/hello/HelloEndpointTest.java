package com.learnwebservices.services.hello;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class HelloEndpointTest {

    @Test
    public void testSayHello() {
        var helloEndpoint = new SimpleHelloEndpoint();
        var response = helloEndpoint.sayHello(new HelloRequest("John Doe"));
        assertEquals("Hello John Doe!", response.getMessage());
    }

}
