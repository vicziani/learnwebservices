package com.learnwebservices.hello;

import com.learnwebservices.services.hello.HelloRequest;
import com.learnwebservices.services.hello.HelloResponse;
import com.learnwebservices.services.hello.ObjectFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.ws.client.core.WebServiceTemplate;

import javax.xml.bind.JAXBElement;

@Configuration
public class HelloMain {

    public static void main(String[] args) {
        AnnotationConfigApplicationContext ctx =
                new AnnotationConfigApplicationContext(HelloMain.class);

        WebServiceTemplate webServiceTemplate = ctx.getBean(WebServiceTemplate.class);

        HelloRequest helloRequest = new HelloRequest();
        helloRequest.setName("John Doe");

        JAXBElement<HelloResponse> response = (JAXBElement<HelloResponse>)
                webServiceTemplate.marshalSendAndReceive(new ObjectFactory().createHelloRequest(helloRequest));

        System.out.println(response.getValue().getMessage());
    }

    @Bean
    public Jaxb2Marshaller marshaller() {
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
        marshaller.setContextPath("com.learnwebservices.services.hello");
        return marshaller;
    }

    @Bean
    public WebServiceTemplate webServiceTemplate() {
        WebServiceTemplate webServiceTemplate =
                new WebServiceTemplate(marshaller());
        webServiceTemplate.setDefaultUri("https://apps.learnwebservices.com/services/hello");
        return webServiceTemplate;
    }

}
