package com.learnwebservices.services.hello;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlElement;

@WebService(targetNamespace = "http://learnwebservices.com/services/hello")
public interface HelloEndpoint {

    @WebMethod(operationName = "SayHello")
    @WebResult(name = "HelloResponse")
    @XmlElement(required = true)
    HelloResponse sayHello(@WebParam(name = "HelloRequest") @XmlElement(required = true) HelloRequest request);
}
