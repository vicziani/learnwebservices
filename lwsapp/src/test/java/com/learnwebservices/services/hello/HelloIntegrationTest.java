package com.learnwebservices.services.hello;

import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class HelloIntegrationTest {

    @LocalServerPort
    private int port;

    @Test
    public void testHello() {
        var proxyFactory = new JaxWsProxyFactoryBean();
        proxyFactory.setServiceClass(HelloEndpoint.class);
        proxyFactory.setAddress("http://localhost:" + port + "/services/hello");

        var endpoint = proxyFactory.create(HelloEndpoint.class);

        var request = new HelloRequest("John Doe");
        var response = endpoint.sayHello(request);

        assertEquals("Hello John Doe!", response.getMessage());
    }
}
