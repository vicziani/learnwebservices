package com.learnwebservices.services.tempconverter;

import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TempConverterIntegrationTest {

    @LocalServerPort
    private int port;

    private TempConverterEndpoint endpoint;

    @Before
    public void init() {
        var proxyFactory = new JaxWsProxyFactoryBean();
        proxyFactory.setServiceClass(TempConverterEndpoint.class);
        proxyFactory.setAddress("http://localhost:" + port + "/services/tempconverter");

        endpoint = proxyFactory.create(TempConverterEndpoint.class);
    }

    @Test
    public void testConvertToCelsius() {
        var request = new FahrenheitToCelsiusRequest(0);
        assertEquals(-17.778, endpoint.convertToCelsius(request).getTemperatureInCelsius(), 0.0005);
    }

    @Test
    public void testConvertToFahrenheit() {
        var request = new CelsiusToFahrenheitRequest(0);
        assertEquals(32.0, endpoint.convertToFahrenheit(request).getTemperatureInFahrenheit(), 0.00005);
    }
}
