package com.learnwebservices.services.tempconverter;

import org.springframework.stereotype.Service;

@Service
public class DelegatingTempConverterEndpoint implements TempConverterEndpoint {

    private TempConverterService tempConverterService;

    public DelegatingTempConverterEndpoint(TempConverterService tempConverterService) {
        this.tempConverterService = tempConverterService;
    }

    public CelsiusToFahrenheitResponse convertToFahrenheit(CelsiusToFahrenheitRequest request) {
        double temperatureInCelsius = request.getTemperatureInCelsius();
        double temperatureInFahrenheit = tempConverterService.convertCelsiusToFahrenheit(temperatureInCelsius);
        return new CelsiusToFahrenheitResponse(temperatureInFahrenheit);
    }


    public FahrenheitToCelsiusResponse convertToCelsius(FahrenheitToCelsiusRequest request) {
        double temperatureInFahrenheit = request.getTemperatureInFahrenheit();
        double temperatureInCelsius = tempConverterService.convertFahrenheitToCelsius(temperatureInFahrenheit);
        return new FahrenheitToCelsiusResponse(temperatureInCelsius);
    }
}
