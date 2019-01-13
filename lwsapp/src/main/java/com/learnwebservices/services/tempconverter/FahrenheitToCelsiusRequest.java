package com.learnwebservices.services.tempconverter;

import javax.xml.bind.annotation.XmlElement;

public class FahrenheitToCelsiusRequest {

    private double temperatureInFahrenheit;

    public FahrenheitToCelsiusRequest() {
    }

    public FahrenheitToCelsiusRequest(double temperatureInFahrenheit) {
        this.temperatureInFahrenheit = temperatureInFahrenheit;
    }

    @XmlElement(name = "TemperatureInFahrenheit", required = true)
    public double getTemperatureInFahrenheit() {
        return temperatureInFahrenheit;
    }

    public void setTemperatureInFahrenheit(double temperatureInFahrenheit) {
        this.temperatureInFahrenheit = temperatureInFahrenheit;
    }
}
