package com.learnwebservices.hello;

import com.learnwebservices.services.hello.HelloEndpointServiceStub;
import org.apache.axis2.AxisFault;

import java.rmi.RemoteException;

public class HelloMain {

    public static void main(String[] args) throws AxisFault, RemoteException {
        HelloEndpointServiceStub stub =
                new HelloEndpointServiceStub();

        HelloEndpointServiceStub.HelloRequest helloRequest =
                new HelloEndpointServiceStub.HelloRequest();
        helloRequest.setName("John Doe");

        HelloEndpointServiceStub.SayHello sayHello =
                new HelloEndpointServiceStub.SayHello();
        sayHello.setHelloRequest(helloRequest);

        HelloEndpointServiceStub.SayHelloE sayHelloE =
                new HelloEndpointServiceStub.SayHelloE();
        sayHelloE.setSayHello(sayHello);

        HelloEndpointServiceStub.SayHelloResponseE sayHelloResponseE =
                stub.sayHello(sayHelloE);
        System.out.println(sayHelloResponseE
                .getSayHelloResponse()
                .getHelloResponse()
                .getMessage());
    }
}
