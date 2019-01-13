package com.learnwebservices.tempconverter;

import com.learnwebservices.services.tempconverter.TempConverterService;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class TempConverterServiceTest {

    private TempConverterService tempConverterService = new TempConverterService();

    @Test
    public void testConvert() {
        assertEquals(-28.889, tempConverterService.convertFahrenheitToCelsius(-20), 0.0005);
        assertEquals(-17.778, tempConverterService.convertFahrenheitToCelsius(0), 0.0005);
        assertEquals(4.4444, tempConverterService.convertFahrenheitToCelsius(40), 0.00005);

        assertEquals(-4.0, tempConverterService.convertCelsiusToFahrenheit(-20), 0.0005);
        assertEquals(32.0, tempConverterService.convertCelsiusToFahrenheit(0), 0.0005);
        assertEquals(104, tempConverterService.convertCelsiusToFahrenheit(40), 0.00005);
    }
}
