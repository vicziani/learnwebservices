package com.learnwebservices.services.tempconverter;

import javax.xml.bind.annotation.XmlElement;

public class CelsiusToFahrenheitResponse {

    private double temperatureInFahrenheit;

    public CelsiusToFahrenheitResponse() {
    }

    public CelsiusToFahrenheitResponse(double temperatureInFahrenheit) {
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
