package com.learnwebservices.services.tempconverter;

import org.springframework.stereotype.Service;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlElement;

@WebService(targetNamespace = "http://learnwebservices.com/services/tempconverter")
@Service
public class TempConverterEndpoint {

    private TempConverterService tempConverterService;

    public TempConverterEndpoint(TempConverterService tempConverterService) {
        this.tempConverterService = tempConverterService;
    }

    @WebMethod(operationName = "CelsiusToFahrenheit")
    @WebResult(name = "CelsiusToFahrenheitResponse")
    @XmlElement(required = true)
    public CelsiusToFahrenheitResponse convertToFahrenheit(@WebParam(name = "CelsiusToFahrenheitRequest") @XmlElement(required = true)CelsiusToFahrenheitRequest request) {
        double temperatureInCelsius = request.getTemperatureInCelsius();
        double temperatureInFahrenheit = tempConverterService.convertCelsiusToFahrenheit(temperatureInCelsius);
        return new CelsiusToFahrenheitResponse(temperatureInFahrenheit);
    }


    @WebMethod(operationName = "FahrenheitToCelsius")
    @WebResult(name = "FahrenheitToCelsiusResponse")
    @XmlElement(required = true)
    public FahrenheitToCelsiusResponse convertToCelsius(@WebParam(name = "FahrenheitToCelsiusRequest") @XmlElement(required = true)FahrenheitToCelsiusRequest request) {
        double temperatureInFahrenheit = request.getTemperatureInFahrenheit();
        double temperatureInCelsius = tempConverterService.convertFahrenheitToCelsius(temperatureInFahrenheit);
        return new FahrenheitToCelsiusResponse(temperatureInCelsius);
    }
}
