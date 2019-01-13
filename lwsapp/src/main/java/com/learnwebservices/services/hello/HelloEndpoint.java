package com.learnwebservices.services.hello;

import org.springframework.stereotype.Service;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlElement;

@WebService(targetNamespace = "http://learnwebservices.com/services/hello")
@Service
public class HelloEndpoint {

    @WebMethod(operationName = "SayHello")
    @WebResult(name = "HelloResponse")
    @XmlElement(required = true)
    public HelloResponse sayHello(@WebParam(name = "HelloRequest") @XmlElement(required = true) HelloRequest request) {
        return new HelloResponse(String.format("Hello %s!", request.getName()));
    }

}
