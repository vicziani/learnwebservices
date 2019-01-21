---
layout: default
---

# Introduction

<hr />

## TL;DR

If you want a simple, online web service, here is a WSDL for it:

<div class="container">
<div class="row justify-content-md-center mb-4 mt-4">
<div class="col-xs-6 highlighted-wsdl">
  <a id="highlighted-wsdl-hello" class="text-wrap" href="http://www.learnwebservices.com/services/hello?WSDL">http://www.learnwebservices.com/services/hello?WSDL</a>  
</div>
  <div class="col-xs-6">
    <i class="copy-button far fa-copy" data-clipboard-target="#highlighted-wsdl-hello"></i>  
    <span id="online-badge" class="badge badge-success d-none">Online</span>
    <span id="offline-badge" class="badge badge-danger d-none">Offline</span>
  </div>
</div>
</div>

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

<table class="table table-borderless table-striped">
  <!--<thead>
    <tr>
      <th>Funkció</th>
      <th>WSDL</th>
    </tr>
  </thead>-->
  <tbody>
    <tr>
      <td class="align-middle">Celsius to Fahrenheit converter</td>
      <td>
        <div class="container">
        <div class="row justify-content-md-center">
        <div class="col-xs-6 highlighted-wsdl">
          <a id="highlighted-wsdl-temp" class="text-wrap" href="http://www.learnwebservices.com/services/tempconverter?wsdl">http://www.learnwebservices.com/services/tempconverter?wsdl</a>  
        </div>
          <div class="col-xs-6">
            <i class="copy-button far fa-copy" data-clipboard-target="#highlighted-wsdl-hello"></i>  
          </div>
        </div>
        </div>        
      </td>
    </tr>
</tbody>
</table>

## An example web service

You may find an operating web service at the `http://www.learnwebservices.com/services/hello` URL that accepts a name, and gives back a welcome message. (The service accepts only POST HTTP requests so you may not use it in a browser directly.)
The WSDL file that specifies the interface is available at http://www.learnwebservices.com/services/hello?WSDL URL. (Firefox browser does not show us the WSDL document, just a blank page, so it is better to use the _View Page Source_ menu to view the document.) The appropriate WSDL document is [available here](wsdl.html) in readable format.

The WSDL specifies the format of the request message. The content of the `Name` tag may be freely rewritten.

{% highlight xml %}
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
{% endhighlight %}

This is the response provided by the web service. The `Message` tag contains the
response message based on the request.

{% highlight xml %}
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Body>
      <SayHelloResponse xmlns="http://learnwebservices.com/services/hello">
         <HelloResponse>
            <Message>Hello John Doe!</Message>
         </HelloResponse>
      </SayHelloResponse>
   </soap:Body>
</soap:Envelope>
{% endhighlight %}

### Error handling

In case a web service fails to process the SOAP message, it returns a SOAP fault.

{% highlight xml %}
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Body>
      <soap:Fault>
         <faultcode>soap:Client</faultcode>
         <faultstring>Unmarshalling Error: Unexpected '&lt;' character in element (missing closing '>'?)
 at [row,col {unknown-source}]: [6,13]</faultstring>
      </soap:Fault>
   </soap:Body>
</soap:Envelope>
{% endhighlight %}

## Calling web service with SoapUI

To [call the web service with SoapUI](https://www.soapui.org/soap-and-wsdl/getting-started.html), create a new SOAP project in the application,
and paste the URL of the WSDL document (`http://www.learnwebservices.com/services/hello?WSDL`) into the _Initial WSDL_
input field.
SoapUI will process the WSDL file, and generate an example request. On the left side of the panel choose the `SayHello` operation, then the
`Request 1` example request. Give a name value in the `Name` tag (replacing the `?` sign), then press the _Submit request_ button.

<div class="demo-image">
  <img src="images/soapui.gif" title="Call web service in SoapUI" class="img-fluid"/>
</div>

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-soapui-project" title="Project on GitHub"><i class="fab fa-github"></i></a>
The SoapUI project is available on GitHub.</p>

## Java client

There are numerous web service frameworks for Java. One of them is the
[JAX-WS RI](https://javaee.github.io/metro-jax-ws/) project and
the following source code demonstrates calling the web service using this library.

{% highlight java %}
URL url = new URL("http://www.learnwebservices.com/services/hello?wsdl");
HelloEndpointService service = new HelloEndpointService(url);
HelloEndpoint port = service.getHelloEndpointPort();
HelloRequest request = new HelloRequest();
request.setName("John Doe");
HelloResponse response = port.sayHello(request);
System.out.println(response.getMessage());
{% endhighlight %}

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-jaxwsri-client" title="Source on GitHub"><i class="fab fa-github"></i></a>
The source code is available on GitHub.</p>

## Python client

The following source code uses the [Zeep](https://github.com/mvantellingen/python-zeep) framework to call the web service.

{% highlight python %}
wsdl = 'http://www.learnwebservices.com/services/hello?wsdl'
client = zeep.Client(wsdl=wsdl)
request = {'Name': 'John Doe'}
print(client.service.SayHello(request))
{% endhighlight %}

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-python-client" title="Source on GitHub"><i class="fab fa-github"></i></a>
The source code is available on GitHub.</p>

## Vanilla JS

It is possible to call a web service from JavaScript running in the browser when it is in the same domain, or the
Cross-Origin Resource Sharing (CORS) is properly configured.

{% highlight javascript %}
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
{% endhighlight %}

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

## Node.js client

The following source code demonstrates how to call a web service with Node.js and [SOAP](https://github.com/vpulim/node-soap#readme) package.

{% highlight javascript %}
var soap = require('soap');
var url = 'http://www.learnwebservices.com/services/hello?wsdl';
var args = {HelloRequest: {Name: 'John Doe'}};
soap.createClient(url, function(err, client) {
    client.SayHello(args, function(err, result) {
        console.log(result.HelloResponse.Message);
    });
});
{% endhighlight %}

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-js-client" title="Source on GitHub"><i class="fab fa-github"></i></a>
The source code is available on GitHub.</p>

## C# client with .NET Core

The following source code demonstrates how to call a web service with .NET Core using C# language.

{% highlight csharp %}
HelloEndpointClient proxy = new HelloEndpointClient();
var request = new helloRequest
{
    Name = "John Doe"
};
var response = await proxy.SayHelloAsync(request);
Console.WriteLine(response.Body.HelloResponse.Message);
{% endhighlight %}

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/SoapClient" title="Source on GitHub"><i class="fab fa-github"></i></a>
The source code is available on GitHub.</p>
