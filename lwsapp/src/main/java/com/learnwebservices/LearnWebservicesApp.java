package com.learnwebservices;

import com.learnwebservices.services.FaultInterceptor;
import com.learnwebservices.services.hello.HelloEndpoint;
import com.learnwebservices.services.tempconverter.TempConverterEndpoint;
import org.apache.cxf.Bus;
import org.apache.cxf.jaxws.EndpointImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.xml.ws.Endpoint;
import java.util.List;

@SpringBootApplication
@Configuration
public class LearnWebservicesApp {

    public static void main(String[] args) {
        SpringApplication.run(LearnWebservicesApp.class, args);
    }

    @Autowired
    private Bus bus;

    @Autowired
    private Environment environment;

    @Bean
    public Endpoint endpoint(HelloEndpoint helloEndpoint) {
        EndpointImpl endpoint = new EndpointImpl(bus, helloEndpoint);
        endpoint.setPublishedEndpointUrl(environment.getProperty("publish.url.prefix") + "/services/hello");
        endpoint.publish("/hello");
        return endpoint;
    }

    @Bean
    public Endpoint publishedTempConverterEndpoint(TempConverterEndpoint tempConverterEndpoint) {
        EndpointImpl endpoint = new EndpointImpl(bus, tempConverterEndpoint);
        endpoint.setOutFaultInterceptors(List.of(new FaultInterceptor()));
        endpoint.setPublishedEndpointUrl(environment.getProperty("publish.url.prefix") + "/services/tempconverter");
        endpoint.publish("/tempconverter");
        return endpoint;
    }

}
