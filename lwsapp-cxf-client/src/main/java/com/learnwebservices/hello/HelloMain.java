package com.learnwebservices.hello;


import com.learnwebservices.services.hello.HelloEndpoint;
import com.learnwebservices.services.hello.HelloEndpointService;
import com.learnwebservices.services.hello.HelloRequest;
import com.learnwebservices.services.hello.HelloResponse;

import java.net.MalformedURLException;
import java.net.URL;

public class HelloMain {

    public static void main(String[] args) throws MalformedURLException {
//        URL url = new URL("http://www.learnwebservices.com/services/hello?wsdl");
//        HelloEndpointService service = new HelloEndpointService(url);

        HelloEndpointService service = new HelloEndpointService();
        HelloEndpoint port = service.getHelloEndpointPort();
        HelloRequest request = new HelloRequest();
        request.setName("John Doe");
        HelloResponse response = port.sayHello(request);
        System.out.println(response.getMessage());
    }
}
