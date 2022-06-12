package com.learnwebservices.hello;

import com.learnwebservices.services.hello.HelloEndpointServiceStub;

import java.rmi.RemoteException;

public class HelloMain {

    public static void main(String[] args) throws RemoteException {
//        HelloEndpointServiceStub stub =
//                new HelloEndpointServiceStub("https://apps.learnwebservices.com/services/hello");

        HelloEndpointServiceStub stub =
                new HelloEndpointServiceStub();

        HelloEndpointServiceStub.HelloRequest helloRequest =
                new HelloEndpointServiceStub.HelloRequest();
        helloRequest.setName("John Doe");

        HelloEndpointServiceStub.HelloRequestE sayHelloE =
                new HelloEndpointServiceStub.HelloRequestE();
        sayHelloE.setHelloRequest(helloRequest);

        HelloEndpointServiceStub.HelloResponseE sayHelloResponseE =
                stub.sayHello(sayHelloE);
        System.out.println(sayHelloResponseE
                .getHelloResponse()
                .getMessage());
    }
}
