package com.learnwebservices.tempconverter;

import com.learnwebservices.services.tempconverter.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class TempConverterEndpointTest {

    @Mock
    private TempConverterService tempConverterService;

    @InjectMocks
    private TempConverterEndpoint tempConverterEndpoint;

    @Test
    public void testConvertToFahrenheit() {
        when(tempConverterService.convertFahrenheitToCelsius(anyDouble())).thenReturn(-17.778);

        FahrenheitToCelsiusResponse response =
                tempConverterEndpoint.convertToCelsius(new FahrenheitToCelsiusRequest(0.0));
        verify(tempConverterService).convertFahrenheitToCelsius(0.0);
        assertEquals(-17.778, response.getTemperatureInCelsius(), 0.0005);
    }

    @Test
    public void testConvertToCelsius() {
        when(tempConverterService.convertCelsiusToFahrenheit(anyDouble())).thenReturn(32.0);

        CelsiusToFahrenheitResponse response =
                tempConverterEndpoint.convertToFahrenheit(new CelsiusToFahrenheitRequest(0.0));
        verify(tempConverterService).convertCelsiusToFahrenheit(0.0);
        assertEquals(32.0, response.getTemperatureInFahrenheit(), 0.0005);
    }
}
