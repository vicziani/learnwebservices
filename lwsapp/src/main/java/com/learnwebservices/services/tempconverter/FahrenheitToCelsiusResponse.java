package com.learnwebservices.services.tempconverter;

import javax.xml.bind.annotation.XmlElement;

public class FahrenheitToCelsiusResponse {

    private double temperatureInCelsius;

    public FahrenheitToCelsiusResponse() {
    }

    public FahrenheitToCelsiusResponse(double temperatureInCelsius) {
        this.temperatureInCelsius = temperatureInCelsius;
    }

    @XmlElement(name = "TemperatureInCelsius", required = true)
    public double getTemperatureInCelsius() {
        return temperatureInCelsius;
    }

    public void setTemperatureInCelsius(double temperatureInCelsius) {
        this.temperatureInCelsius = temperatureInCelsius;
    }
}
