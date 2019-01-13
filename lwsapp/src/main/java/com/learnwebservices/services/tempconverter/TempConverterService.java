package com.learnwebservices.services.tempconverter;

import org.springframework.stereotype.Service;

@Service
public class TempConverterService {

    public double convertCelsiusToFahrenheit(double temperatureInCelsius) {
        return temperatureInCelsius *  9 / 5.0  + 32;
    }

    public double convertFahrenheitToCelsius(double temperatureInFahrenheit) {
        return (temperatureInFahrenheit - 32) / (9 / 5.0);
    }
}
