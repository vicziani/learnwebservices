---
layout: default
---

<div class="pt-3 text-right">
<a href="https://github.com/vicziani/learnwebservices/blob/master/CHANGELOG.md">
Last update: 
<span class="text-nowrap font-weight-bold">March 13, 2019</span>, 
Version 
<span class="text-nowrap font-weight-bold">1.1.3</span>
</a>
</div>

# Introduction

<hr />

## TL;DR

If you want a simple, online web service, here is a WSDL for it:

<div class="form-row d-flex justify-content-center mb-3">
  <div class="input-group col-md-8">
    <input type="text" value="http://www.learnwebservices.com/services/hello?WSDL" id="highlighted-wsdl-hello" class="form-control"/>
    <div class="input-group-append">
      <button class="btn btn-outline-primary btn-copy" type="button" data-clipboard-target="#highlighted-wsdl-hello" title="Copied">
        <i class="copy-button far fa-copy"></i>
        </button>
    </div>  
    <div>
      <span id="online-badge" class="badge badge-success d-none ml-2">Online</span>
      <span id="offline-badge" class="badge badge-danger d-none ml-2">Offline</span>
    </div>
  </div>
</div>

The WSDL document is [available here](wsdl.html) in readable format.

## Purpose of this site

Creating this site has two purposes. One is to provide some free, public, SOAP web services examples for learning, prototyping, teaching, testing, demonstrating tools, libraries or technologies. You may use these web services in blog posts, tutorials, videos. I would like to operate this website for reference in the long run.

The second purpose is to present client applications examples in different programming languages, using with different libraries. You can find the source code of the examples on GitHub what I am going to  update regularly for  the latest versions.


## About SOAP web services

SOAP web services may be considered as best practices to exchange data between different applications, based on XML and mostly HTTP(S) protocol. Because of the formats and protocols are text based, they are readable by most of the applications and by humans as well. Web services became very popular, and easy to use on any platform and with any programming language.

SOAP web services are based on OASIS and W3C standards, and the  WS-I organization provides some useful profiles to increase interoperability.

SOAP is a messaging protocol specifying an XML-based message format. This is called the SOAP envelope, encapsulating the message content. The WSDL format is based on XML as well, and specifies the interface - how to call the service, and what are the input and output formats.

Sometime the SOAP web services are considered legacy solutions today, because the RESTful web services are becoming increasingly popular. Also  this is true, but the SOAP web services will be along for a long time.

# Examples

<hr />

## Other provided web services

<div class="d-flex justify-content-center mb-3">
  <div class="form-row col-md-10">
    <label for="highlighted-wsdl-temp">Celsius to Fahrenheit converter</label>
    <div class="input-group ">    
      <input type="text" value="http://www.learnwebservices.com/services/tempconverter?wsdl" id="highlighted-wsdl-temp" class="form-control"/>
      <div class="input-group-append">
        <button class="btn btn-outline-primary btn-copy" type="button" data-clipboard-target="#highlighted-wsdl-temp" title="Copied">
          <i class="copy-button far fa-copy"></i>
          </button>
      </div>  
    </div>
  </div>
</div>

## An example web service

You may find an operating web service at the `http://www.learnwebservices.com/services/hello` URL that accepts a name, and gives back a welcome message. (The service accepts only POST HTTP requests so you may not use it in a browser directly.)
The WSDL file that specifies the interface is available at [http://www.learnwebservices.com/services/hello?WSDL](http://www.learnwebservices.com/services/hello?WSDL) URL. (Firefox browser does not show us the WSDL document, just a blank page, so it is better to use the _View Page Source_ menu to view the document.)

The WSDL specifies the format of the request message. The content of the `Name` tag may be freely rewritten.

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
      <SayHello xmlns="http://learnwebservices.com/services/hello">
         <HelloRequest>
            <Name>John Doe</Name>
         </HelloRequest>
      </SayHello>
   </soapenv:Body>
</soapenv:Envelope>
```

This is the response provided by the web service. The `Message` tag contains the
response message based on the request.

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Body>
      <SayHelloResponse xmlns="http://learnwebservices.com/services/hello">
         <HelloResponse>
            <Message>Hello John Doe!</Message>
         </HelloResponse>
      </SayHelloResponse>
   </soap:Body>
</soap:Envelope>
```

### Error handling

In case a web service fails to process the SOAP message, it returns a SOAP fault.

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Body>
      <soap:Fault>
         <faultcode>soap:Client</faultcode>
         <faultstring>Unmarshalling Error: Unexpected '&lt;' character in element (missing closing '>'?)
 at [row,col {unknown-source}]: [6,13]</faultstring>
      </soap:Fault>
   </soap:Body>
</soap:Envelope>
```

## Calling web service with SoapUI {#soapui}

To [call the web service with SoapUI](https://www.soapui.org/soap-and-wsdl/getting-started.html), create a new SOAP project in the application,
and paste the URL of the WSDL document [http://www.learnwebservices.com/services/hello?WSDL](http://www.learnwebservices.com/services/hello?WSDL) into the _Initial WSDL_
input field.
SoapUI will process the WSDL file, and generate an example request. On the left side of the panel choose the `SayHello` operation, then the
`Request 1` example request. Give a name value in the `Name` tag (replacing the `?` sign), then press the _Submit request_ button.

<div class="demo-image">
  <img src="images/soapui.gif" title="Call web service in SoapUI" class="img-fluid"/>
</div>

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-soapui-project" title="Project on GitHub"><i class="fab fa-github"></i></a>
The SoapUI project is available on GitHub.</p>

## Calling web service with CURL {#curl}

Tip: try this site with the `curl www.learnwebservices.com` command.

Use the following command to call the web service with curl.

```
curl --request POST --header "Content-Type: text/xml;charset=UTF-8"  \
  --data '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Header/> \
  <soapenv:Body><SayHello xmlns="http://learnwebservices.com/services/hello"> \
  <HelloRequest><Name>John Doe</Name></HelloRequest> \
  </SayHello></soapenv:Body></soapenv:Envelope>' \
  http://www.learnwebservices.com/services/hello
```

## Java web service client with JAX-WS RI or CXF {#java-jaxws-cxf}

The following source code demonstrates calling the web service using 
[JAX-WS RI](https://javaee.github.io/metro-jax-ws/) library and
[jaxws-maven-plugin](https://www.mojohaus.org/jaxws-maven-plugin/) Maven plugin.

The source code is the same when using [CXF](http://cxf.apache.org) 
with [cxf-codegen-plugin](http://cxf.apache.org/docs/maven-cxf-codegen-plugin-wsdl-to-java.html)
Maven plugin.

```java
URL url = new URL("http://www.learnwebservices.com/services/hello?wsdl");
HelloEndpointService service = new HelloEndpointService(url);
HelloEndpoint port = service.getHelloEndpointPort();
HelloRequest request = new HelloRequest();
request.setName("John Doe");
HelloResponse response = port.sayHello(request);
System.out.println(response.getMessage());
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-jaxwsri-client" title="JAX-WS source on GitHub"><i class="fab fa-github"></i></a>
The source code with JAX-WS is available on GitHub.</p>

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-cxf-client" title="Source on GitHub"><i class="fab fa-github"></i></a>
The source code with CXF is available on GitHub.</p>

## Java web service client with Spring Web Services {#java-spring-web-services}

The following source code demonstrates calling the web service using 
[Spring Web Services](https://spring.io/projects/spring-ws) library and
[maven-jaxb2-plugin](https://github.com/highsource/maven-jaxb2-plugin) Maven plugin.

```java
HelloRequest helloRequest = new HelloRequest();
helloRequest.setName("John Doe");
SayHello sayHello = new SayHello();
sayHello.setHelloRequest(helloRequest);

JAXBElement<SayHelloResponse> response = (JAXBElement<SayHelloResponse>)
        webServiceTemplate.marshalSendAndReceive(new ObjectFactory().createSayHello(sayHello));

System.out.println(response.getValue().getHelloResponse().getMessage());
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-springws-client" title="Source on GitHub"><i class="fab fa-github"></i></a>
The source code is available on GitHub.</p>

## Java web service client with Apache Axis2/Java {#java-axis}

The following source code demonstrates calling the web service using 
[Apache Axis2/Java](http://axis.apache.org/axis2/java/core/index.html) library,
Axis2 Databinding Framework and
[axis2-wsdl2code-maven-plugin](https://axis.apache.org/axis2/java/core/tools/maven-plugins/axis2-wsdl2code-maven-plugin/index.html) Maven plugin.

```java
HelloEndpointServiceStub stub =
        new HelloEndpointServiceStub();

HelloEndpointServiceStub.HelloRequest helloRequest = 
        new HelloEndpointServiceStub.HelloRequest();
helloRequest.setName("John Doe");

HelloEndpointServiceStub.SayHello sayHello = 
        new HelloEndpointServiceStub.SayHello();
sayHello.setHelloRequest(helloRequest);

HelloEndpointServiceStub.SayHelloE sayHelloE = 
        new HelloEndpointServiceStub.SayHelloE();
sayHelloE.setSayHello(sayHello);

HelloEndpointServiceStub.SayHelloResponseE sayHelloResponseE = 
        stub.sayHello(sayHelloE);
System.out.println(sayHelloResponseE
        .getSayHelloResponse()
        .getHelloResponse()
        .getMessage());
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-axis2-client" title="Source on GitHub"><i class="fab fa-github"></i></a>
The source code is available on GitHub.</p>

## Calling web services with JMeter {#jmeter}

Apache JMeter may be used to test performance of SOAP web services.

Click on the picture to view the full animation that shows how to create a JMeter project.

<div class="demo-image">
  <a href="images/jmeter-anim.gif" data-lightbox="learnwebservices">
    <img src="images/jmeter.png" title="JMeter for performance testing of SOAP web services" class="img-fluid"/>
  </a>
</div>

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-jmeter-project" title="Project on GitHub"><i class="fab fa-github"></i></a>
The JMeter project is available on GitHub.</p>

## Python web service client with Zeep {#python-zeep}

The following source code uses the [Zeep](https://github.com/mvantellingen/python-zeep) framework to call the web service.

```python
wsdl = 'http://www.learnwebservices.com/services/hello?wsdl'
client = zeep.Client(wsdl=wsdl)
request = {'Name': 'John Doe'}
print(client.service.SayHello(request))
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-python-client" title="Source on GitHub"><i class="fab fa-github"></i></a>
The source code is available on GitHub.</p>

## Vanilla JS web service client {#vanillajs}

It is possible to call a web service from JavaScript running in the browser when it is in the same domain, or the
Cross-Origin Resource Sharing (CORS) is properly configured.

```javascript
var url = "http://localhost:8080/services/hello";
var request = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
       <SayHello xmlns="http://learnwebservices.com/services/hello">
          <HelloRequest>
             <Name>John Doe</Name>
          </HelloRequest>
       </SayHello>
    </soapenv:Body>
 </soapenv:Envelope>`;

 var fetchData = {
    method: 'POST',
    body: request
 };

 fetch(url, fetchData)
   .then(function(response) {
     return response.text();
   })
   .then(function(xml) {
       var xmlDoc = new DOMParser().parseFromString(xml, "text/xml");
       console.log(xmlDoc.getElementsByTagNameNS("http://learnwebservices.com/services/hello", "Message")[0].textContent);
   })
   .catch(function(error) {
     console.log("Error calling webservice: " + error);
   });
```

You can try this online by pressing the submit button below.

<div id="webservice-error-div" class="alert alert-danger d-none" role="alert">
  A web service is not available!
</div>
<form id="hello-form">
 <div class="form-row">
    <div class="col-sm mb-3">
      <input id="hello-name-input" type="text" placeholder="Your name" class="form-control" />
    </div>
    <div class="col-sm mb-3">
      <input id="hello-message-input" type="text" readonly="readonly" class="form-control" />
    </div>    
    <div class="col-sm mb-3">
    <button type="submit" class="btn btn-primary">Call the web service!</button>
  </div>    
</div>
</form>

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-vanillajs-client" title="Source on GitHub"><i class="fab fa-github"></i></a>
The source code is available on GitHub.</p>

## Node.js web service client with SOAP {#nodejs-soap}

The following source code demonstrates how to call a web service with Node.js and [SOAP](https://github.com/vpulim/node-soap#readme) package.

```javascript
var soap = require('soap');
var url = 'http://www.learnwebservices.com/services/hello?wsdl';
var args = {HelloRequest: {Name: 'John Doe'}};
soap.createClient(url, function(err, client) {
    client.SayHello(args, function(err, result) {
        console.log(result.HelloResponse.Message);
    });
});
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-js-client" title="Source on GitHub"><i class="fab fa-github"></i></a>
The source code is available on GitHub.</p>

## C# client with .NET Core {#c-sharp}

The following source code demonstrates how to call a web service with .NET Core using C# language.

```csharp
HelloEndpointClient proxy = new HelloEndpointClient();
var request = new helloRequest
{
    Name = "John Doe"
};
var response = await proxy.SayHelloAsync(request);
Console.WriteLine(response.Body.HelloResponse.Message);
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/SoapClient" title="Source on GitHub"><i class="fab fa-github"></i></a>
The source code is available on GitHub.</p>

## Ruby client with Savon {#ruby-savon}

The following source code demonstrates how to call a web service with Ruby and
[Savon](https://github.com/savonrb/savon).

```ruby
require 'savon'

client = Savon.client(wsdl: 'http://www.learnwebservices.com/services/hello?WSDL')
response = client.call(
  :say_hello,
  soap_action: '',
  message: { 'HelloRequest' => { 'Name' => 'John Doe' } }
)
puts response.body[:say_hello_response][:hello_response][:message]
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-ruby-client" title="Source on GitHub"><i class="fab fa-github"></i></a>
The source code is available on GitHub.</p>

## Contributors

* János Rácz ([rczjns](https://github.com/rczjns))
* Bea Vörös ([beavoros](https://github.com/beavoros))