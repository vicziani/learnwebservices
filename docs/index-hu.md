---
layout: default-hu
---

<div class="pt-3 text-right">
  Utolsó frissítés dátuma:
  <span class="text-nowrap font-weight-bold">2019. augusztus 8.</span>
</div>
<div class="pt-3 text-right">
  <a href="https://github.com/vicziani/learnwebservices/blob/master/CHANGELOG.md">
    Verzió
    <span class="text-nowrap font-weight-bold">1.1.6</span>
    </a>
</div>

# Bevezetés {#bevezetes}

<hr />

## TL;DR

Ha szükséged van gyorsan kipróbálni valamit, itt egy WSDL, és mögötte egy működő SOAP
webszolgáltatás:

<div class="form-row d-flex justify-content-center mb-3">
  <div class="input-group col-md-8">
    <input type="text" value="http://www.learnwebservices.com/services/hello?WSDL" id="highlighted-wsdl-hello" class="form-control"/>
    <div class="input-group-append">
      <button class="btn btn-outline-primary btn-copy" type="button" data-clipboard-target="#highlighted-wsdl-hello" title="Kimásoltad">
        <i class="copy-button far fa-copy"></i>
        </button>
    </div>  
    <div>
      <span id="health-check-badge" class="badge d-none ml-2">Ismeretlen</span>
    </div>
  </div>
</div>

(A WSDL dokumentum egy XML dokumentum, melyet a Firefox nem jelenít meg, csak a _View Page Source_ menüpontra kattintva.) A WSDL állomány
olvasható formában [itt található](wsdl-hu.html).

## Az oldal célja {#az-oldal-celja}

Ez az oldal azért jött létre, hogy ingyenes, publikus példa SOAP
webszolgáltatásokat biztosítson tanuláshoz, oktatáshoz,
kísérletezéshez. Az itt található webszolgáltatások kitűnőek a
technológia bemutatásához és megismeréséhez, különböző eszközök és
keretrendszerek teszteléséhez. Ezen webszolgáltatásokat lehet használni
dokumentációkban, példákban, tutoriálokban, videókban, hisz célom, hogy
hosszú távon megmaradjanak.
Az oldalon ezen kívül megtalálhatóak
különböző programozási nyelven implementált kliens programok
(forráskóddal együtt), melyek jó kiindulási alapot biztosíthatnak a
technológia használatba vételéhez. Gyakran frissítem ezeket, ahogy kijönnek
a nyelvek és keretrendszerek új verziói.

## Webszolgáltatásokról {#webszolgaltatasokrol}

A SOAP webszolgáltatások alkalmazások közötti adatcserére valók. XML és
főleg HTTP(S) technológiákra támaszkodnak. Ezért ember és számítógép
által is könnyen értelmezhetőek, valamint a legtöbb platformon
használhatóak, ezért különösen alkalmasak különböző platformon és
programozási nyelven fejlesztett alkalmazások együttműködésére. A SOAP
webszolgáltatások az OASIS és W3C szabványügyi szervezetek által
karbantartott szabányokon nyugszanak. WS-I szervezet több profilt
fejlesztett ki a különböző implementációk együttműködésének segítségére.
A SOAP egy XML alapú üzenetformátum, mely egy SOAP borítékot definiál,
melyben az üzenetek utaznak. A WSDL szintén egy XML alapú interfészleíró
nyelv. A SOAP webszolgáltatásokat a modernebb, egyszerűbben használható
RESTful webszolgáltatások kezdik kiszorítani. Azonban még történeti
jelleggel sok helyen találhatóak SOAP webszolgáltatások, melyekhez
modern programokból is csatlakozni kell.

# Részletek {#reszletek}

<hr />

## További webszolgáltatások {#tovabbi-webszolgaltatasok}

Celsius to Fahrenheit converter

<div class="d-flex justify-content-center mb-3">
  <div class="form-row col-md-8">
    <div class="input-group ">    
      <input type="text" value="http://www.learnwebservices.com/services/tempconverter?wsdl" id="highlighted-wsdl-temp" class="form-control"/>
      <div class="input-group-append">
        <button class="btn btn-outline-primary btn-copy" type="button" data-clipboard-target="#highlighted-wsdl-temp" title="Kimásoltad">
          <i class="copy-button far fa-copy"></i>
          </button>
      </div>  
      <div>
        <span id="health-check-badge-converter" class="badge d-none ml-2">Ismeretlen</span>
      </div>
    </div>
  </div>
</div>

## Egy példa webszolgáltatás {#egy-pelda-webszolgaltatas}

Egy SOAP webszolgáltatás található `http://www.learnwebservices.com/services/hello`
címen, mely egy nevet vár, és egy üdvözlőszöveget ad vissza.

A SOAP webszolgáltatás WSDL dokumentuma elérhető a [http://www.learnwebservices.com/services/hello?WSDL](http://www.learnwebservices.com/services/hello?WSDL) címen.

A címre a következő formátumban kell posztolni egy XML dokumentumot (a WSDL-ben leírtaknak megfelelően).
A `Name` tag értéke tetszőlegesen módosítható.

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

Ennek hatására a SOAP webszolgáltatás a következő válaszüzenetet adja vissza.
A név alapján változó üzenetet a `Message` tag tartalmazza.

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

### Hibakezelés {#hibakezeles}

Amennyiben hiba történik a webszolgáltatás hívása közben, pl. hibás üzenetet küldünk be, un. SOAP faultot kapunk.

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

## Szerver forráskódja

<p>Egy Spring Boot alkalmazás szolgálja ki a példa webszolgáltatásokat.</p>

<p><a href="https://github.com/vicziani/learnwebservices-server/" title="Forráskód a GitHubon" class="github-icon"><i class="fab fa-github"></i></a>
 <a href="https://github.com/vicziani/learnwebservices-server/">A forráskódja elérhető a GitHub-on.</a></p>

# Implementációk {#implementaciok}

<hr />

<ul class="nav nav-pills" id="implementationsTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="soapui-tab" data-toggle="tab" href="#soapui" role="tab" aria-controls="home" aria-selected="true">SoapUI</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="curl-tab" data-toggle="tab" href="#curl" role="tab" aria-controls="profile" aria-selected="false">CURL</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="wget-tab" data-toggle="tab" href="#wget" role="tab" aria-controls="contact" aria-selected="false">Wget</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="httpie-tab" data-toggle="tab" href="#httpie" role="tab" aria-controls="contact" aria-selected="false">HTTPie</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="jaxws-tab" data-toggle="tab" href="#jaxws" role="tab" aria-controls="contact" aria-selected="false">Java JAX-WS RI/CXF</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="sws-tab" data-toggle="tab" href="#sws" role="tab" aria-controls="contact" aria-selected="false">Java Spring Web Services</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="axis2-tab" data-toggle="tab" href="#axis2" role="tab" aria-controls="contact" aria-selected="false">Java Apache Axis2</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="groovy-tab" data-toggle="tab" href="#groovy" role="tab" aria-controls="contact" aria-selected="false">Groovy</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="postman-tab" data-toggle="tab" href="#postman" role="tab" aria-controls="contact" aria-selected="false">Postman</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="jmeter-tab" data-toggle="tab" href="#jmeter" role="tab" aria-controls="contact" aria-selected="false">JMeter</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="python-tab" data-toggle="tab" href="#python" role="tab" aria-controls="contact" aria-selected="false">Python</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="js-tab" data-toggle="tab" href="#js" role="tab" aria-controls="contact" aria-selected="false">JavaScript</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="nodejs-tab" data-toggle="tab" href="#nodejs" role="tab" aria-controls="contact" aria-selected="false">Node.js</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="dotnet-tab" data-toggle="tab" href="#dotnet" role="tab" aria-controls="contact" aria-selected="false">.NET Core C#</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="ruby-tab" data-toggle="tab" href="#ruby" role="tab" aria-controls="contact" aria-selected="false">Ruby</a>
  </li>
</ul>

<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="soapui" role="tabpanel" aria-labelledby="soapui-tab" markdown="1">

SoapUI használatával a [hivatalos dokumentáció](https://www.soapui.org/soap-and-wsdl/getting-started.html) alapján létre
kell hozni egy új SOAP projektet, és a _Initial WSDL_ beviteli mezőben megadni a [http://www.learnwebservices.com/services/hello?WSDL](http://www.learnwebservices.com/services/hello?WSDL)
címet, majd kiválasztani bal oldalon a `SayHello` operációt, és megnyitni a `Request 1` példa kérést. A nevet
megadni a `Name` tagen belül lehet. Majd meg kell nyomni a zöld _Submit request_ gombot.

<div class="demo-image">
  <img src="images/soapui.gif" title="Call web service in SoapUI" class="img-fluid"/>
</div>

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-soapui-project" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-soapui-project">Egy példa SoapUI projekt elérhető a GitHubon.</a></p>

</div>
<div class="tab-pane fade" id="curl" role="tabpanel" aria-labelledby="curl-tab" markdown="1">

Tipp: ez az oldal letölthető a curl használatával is a `curl www.learnwebservices.com` paranccsal.

A webszolgáltatás a curl segítségével is meghívható a következő módon. Egyrészt `POST` metódust kell használni,
majd meg kell adni, hogy a tartalom típusa XML, végül a http kérés törzsében az elküldendő
SOAP kérést.

```
curl --request POST --header "Content-Type: text/xml;charset=UTF-8"  \
  --data '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Header/> \
  <soapenv:Body><SayHello xmlns="http://learnwebservices.com/services/hello"> \
  <HelloRequest><Name>John Doe</Name></HelloRequest> \
  </SayHello></soapenv:Body></soapenv:Envelope>' \
  http://www.learnwebservices.com/services/hello
```

</div>
<div class="tab-pane fade" id="wget" role="tabpanel" aria-labelledby="wget-tab" markdown="1">

A webszolgáltatás Wget parancs használatával a következő módon hívható meg.

```
wget -qO - --header "Content-Type: text/xml;charset=UTF-8"  \
  --post-data '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Header/> \
  <soapenv:Body><SayHello xmlns="http://learnwebservices.com/services/hello"> \
  <HelloRequest><Name>John Doe</Name></HelloRequest> \
  </SayHello></soapenv:Body></soapenv:Envelope>' \
  http://www.learnwebservices.com/services/hello
```

</div>
<div class="tab-pane fade" id="httpie" role="tabpanel" aria-labelledby="httpie-tab" markdown="1">

A webszolgáltatás [HTTPie](https://httpie.org/) parancs használatával a következő módon hívható meg.

```
echo '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Header/> \
  <soapenv:Body><SayHello xmlns="http://learnwebservices.com/services/hello"> \
  <HelloRequest><Name>John Doe</Name></HelloRequest> \
  </SayHello></soapenv:Body></soapenv:Envelope>' | \
  http -b POST http://www.learnwebservices.com/services/hello  'Content-Type:text/xml;charset=UTF-8'
```

</div>
<div class="tab-pane fade" id="jaxws" role="tabpanel" aria-labelledby="cxf-tab" markdown="1">

SOAP webszolgáltatás meghívása Javaban [JAX-WS RI](https://javaee.github.io/metro-jax-ws/) library-vel,
[jaxws-maven-plugin](https://www.mojohaus.org/jaxws-maven-plugin/) Maven pluginnel.

A kód ugyanez [CXF](http://cxf.apache.org) library-vel és
[cxf-codegen-plugin](http://cxf.apache.org/docs/maven-cxf-codegen-plugin-wsdl-to-java.html)
Maven pluginnel.

```java
URL url = new URL("http://www.learnwebservices.com/services/hello?wsdl");
HelloEndpointService service = new HelloEndpointService(url);
HelloEndpoint port = service.getHelloEndpointPort();
HelloRequest request = new HelloRequest();
request.setName("John Doe");
HelloResponse response = port.sayHello(request);
System.out.println(response.getMessage());
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-jaxwsri-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-jaxwsri-client">Egy példa Java JAX-WS RI kliens elérhető a GitHubon.</a></p>

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-cxf-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-cxf-client">Egy példa Java CXF kliens elérhető a GitHubon.</a></p>

</div>
<div class="tab-pane fade" id="sws" role="tabpanel" aria-labelledby="sws-tab" markdown="1">

Javaban [Spring Web Services](https://spring.io/projects/spring-ws) library-vel, JAX-B marshallerrel,
[maven-jaxb2-plugin](https://github.com/highsource/maven-jaxb2-plugin) Maven pluginnel.

```java
HelloRequest helloRequest = new HelloRequest();
helloRequest.setName("John Doe");
SayHello sayHello = new SayHello();
sayHello.setHelloRequest(helloRequest);

JAXBElement<SayHelloResponse> response = (JAXBElement<SayHelloResponse>)
        webServiceTemplate.marshalSendAndReceive(new ObjectFactory().createSayHello(sayHello));

System.out.println(response.getValue().getHelloResponse().getMessage());
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-springws-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-springws-client">Egy példa Java Spring Web Services kliens elérhető a GitHubon.</a></p>

</div>
<div class="tab-pane fade" id="axis2" role="tabpanel" aria-labelledby="axis2-tab" markdown="1">

A következő kód mutatja be, hogy kell webszolgáltatást hívni
[Apache Axis2/Java](http://axis.apache.org/axis2/java/core/index.html) library,
Axis2 Databinding Framework és
[axis2-wsdl2code-maven-plugin](https://axis.apache.org/axis2/java/core/tools/maven-plugins/axis2-wsdl2code-maven-plugin/index.html) Maven plugin
használatával.

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

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-axis2-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-axis2-client">Egy példa Java Axis2 kliens elérhető a GitHubon.</a></p>

</div>
<div class="tab-pane fade" id="groovy" role="tabpanel" aria-labelledby="groovy-tab" markdown="1">

Webszolgáltatás hívása Goovy nyelven
[groovy-wslite](https://github.com/jwagenleitner/groovy-wslite) library
használatával.

```groovy
@Grab('com.github.groovy-wslite:groovy-wslite:1.1.2')
import wslite.soap.*

def client = new SOAPClient('http://www.learnwebservices.com/services/hello')
def response = client.send {
    body {
        SayHello('xmlns':'http://learnwebservices.com/services/hello') {
            HelloRequest {
              Name("John Doe")
            }
        }
    }
}

println(response.SayHelloResponse.HelloResponse.Message)
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-groovy-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-groovy-client">Egy példa Groovy kliens elérhető a GitHubon.</a></p>

</div>
<div class="tab-pane fade" id="postman" role="tabpanel" aria-labelledby="postman-tab" markdown="1">

Kattints a képre, ha egy animációt néznél meg arról, hogy kell egy Postman kérést létrehozni!

<div class="demo-image">
  <a href="images/postman-anim.gif" data-lightbox="learnwebservices">
    <img src="images/postman.png" title="Postman kérés" class="img-fluid"/>
  </a>
</div>

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-postman-collection" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-postman-collection">A Postman Collection elérhető GitHubon.</a></p>

</div>
<div class="tab-pane fade" id="jmeter" role="tabpanel" aria-labelledby="jmeter-tab" markdown="1">

Az Apache JMeter használható SOAP webszolgáltatások terheléses tesztelésére is.

Kattints a képre, ha egy animációt néznél meg arról, hogy kell egy JMeter projektet létrehozni!

<div class="demo-image">
  <a href="images/jmeter-anim.gif" data-lightbox="learnwebservices">
    <img src="images/jmeter.png" title="JMeter for performance testing of SOAP web services" class="img-fluid"/>
  </a>
</div>

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-jmeter-project" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-jmeter-project">A JMeter projekt elérhető GitHubon.</a></p>

</div>
<div class="tab-pane fade" id="python" role="tabpanel" aria-labelledby="python-tab" markdown="1">

Használható a [Zeep](https://github.com/mvantellingen/python-zeep) library.

```python
wsdl = 'http://www.learnwebservices.com/services/hello?wsdl'
client = zeep.Client(wsdl=wsdl)
request = {'Name': 'John Doe'}
print(client.service.SayHello(request))
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-python-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-python-client">Egy példa Python kliens elérhető a GitHubon.</a></p>

</div>
<div class="tab-pane fade" id="js" role="tabpanel" aria-labelledby="js-tab" markdown="1">

A webszolgáltatást böngészőből is meg lehet hívni, ha ugyanazon a domainen van, vagy be van állítva a
Cross-Origin Resource Sharing (CORS).

```javascript
let url = "http://localhost:8080/services/hello";
let request = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
       <SayHello xmlns="http://learnwebservices.com/services/hello">
          <HelloRequest>
             <Name>John Doe</Name>
          </HelloRequest>
       </SayHello>
    </soapenv:Body>
 </soapenv:Envelope>`;

 let fetchData = {
    method: 'POST',
    body: request
 };

 fetch(url, fetchData)
   .then(function(response) {
     return response.text();
   })
   .then(function(xml) {
       let xmlDoc = new DOMParser().parseFromString(xml, "text/xml");
       console.log(xmlDoc.getElementsByTagNameNS("http://learnwebservices.com/services/hello", "Message")[0].textContent);
   })
   .catch(function(error) {
     console.log("Error calling webservice: " + error);
   });
```

Az alábbi űrlapon a gombra kattintva megtörténik a webszolgáltatás hívás.

<div id="webservice-error-div" class="alert alert-danger d-none" role="alert">
  A webszolgáltatás nem elérhető!
</div>
<form id="hello-form">
 <div class="form-row">
    <div class="col-sm mb-3">
      <input id="hello-name-input" type="text" placeholder="Írd be a neved!" class="form-control" />
    </div>
    <div class="col-sm mb-3">
      <input id="hello-message-input" type="text" readonly="readonly" class="form-control" />
    </div>    
    <div class="col-sm mb-3">
    <button type="submit" class="btn btn-primary">Hívd meg a webszolgáltatást!</button>
  </div>    
</div>
</form>

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-vanillajs-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-vanillajs-client" >Egy példa Node.js kliens elérhető a GitHubon.</a></p>

</div>
<div class="tab-pane fade" id="nodejs" role="tabpanel" aria-labelledby="nodejs-tab" markdown="1">

Használható a [SOAP](https://github.com/vpulim/node-soap#readme) projekt.

```javascript
let soap = require('soap');
let url = 'http://www.learnwebservices.com/services/hello?wsdl';
let args = {HelloRequest: {Name: 'John Doe'}};
soap.createClient(url, function(err, client) {
    client.SayHello(args, function(err, result) {
        console.log(result.HelloResponse.Message);
    });
});
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-js-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-js-client">Egy példa Node.js kliens SOAP library-vel elérhető a GitHubon.</a></p>

</div>
<div class="tab-pane fade" id="dotnet" role="tabpanel" aria-labelledby="dotnet-tab" markdown="1">

```csharp
HelloEndpointClient proxy = new HelloEndpointClient();
var request = new helloRequest
{
    Name = "John Doe"
};
var response = await proxy.SayHelloAsync(request);
Console.WriteLine(response.Body.HelloResponse.Message);
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/SoapClient" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/SoapClient">Egy példa C# kliens elérhető a GitHubon.</a></p>

</div>
<div class="tab-pane fade" id="ruby" role="tabpanel" aria-labelledby="ruby-tab" markdown="1">

A következő példa mutatja, hogy kell webszolgáltatás hívni Ruby-ban,
[Savon](https://github.com/savonrb/savon) library használatával.

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

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-ruby-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-ruby-client">Egy példa Ruby kliens elérhető a GitHubon.</a></p>

</div>
</div>


## Közreműködők {#kozremukodok}

* Kuti Rita
* Rácz János ([rczjns](https://github.com/rczjns))
* Vörös Bea ([beavoros](https://github.com/beavoros))
