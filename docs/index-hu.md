---
layout: default-hu
---

<div class="pt-3 text-right">
  Utolsó frissítés dátuma:
  <span class="text-nowrap font-weight-bold">2022. június 12.</span>
</div>
<div class="pt-3 text-right">
  <a href="https://github.com/vicziani/learnwebservices/blob/master/CHANGELOG.md">
    Verzió
    <span class="text-nowrap font-weight-bold">2.0.0</span>
    </a>
</div>

# Bevezetés {#bevezetes}

<hr />

## TL;DR

Ha szükséged van egy webszolgáltatásra, amit gyorsan kipróbálhasz, itt egy WSDL, és mögötte egy működő SOAP
webszolgáltatás:

<div class="form-row d-flex justify-content-center mb-3">
  <div class="input-group col-md-8">
    <input type="text" value="{{site.api_url}}/services/hello?WSDL" id="highlighted-wsdl-hello" class="form-control"/>
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

(A WSDL dokumentum egy XML dokumentum, melyet a Firefox nem jelenít meg, csak a _View Page Source_ menüpontra kattintva. A WSDL állomány
olvasható formában [itt található](wsdl-hu.html).

<div class="alert alert-danger" role="alert">
    <h3 class="alert-heading">Figyelem!</h3>

    A 2.0.0 verzióban a cím <code class="highlighter-rouge">http://www.learnwebservices.com/services/hello?WSDL</code> URL-ről a
    <code class="highlighter-rouge">https://apps.learnwebservices.com/services/hello?WSDL</code> URL-re változott.
    A WSDL és az XML struktúrája is egyszerűsítésre került, így a klienseket módosítani kell, vagy újra kell generálni.
</div>

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

Ha kérdésed van, felteheted [ebben a Gitter szobában](https://gitter.im/learnwebservices/community).

## Webszolgáltatásokról {#webszolgaltatasokrol}

A SOAP webszolgáltatások alkalmazások közötti adatcserére valók. XML és
főleg HTTP(S) technológiákra támaszkodnak. Ezért ember és számítógép
által is könnyen értelmezhetőek, valamint a legtöbb platformon
használhatóak, ezért különösen alkalmasak különböző platformon és
programozási nyelven fejlesztett alkalmazások együttműködésére. A SOAP
webszolgáltatások az OASIS és W3C szabványügyi szervezetek által
karbantartott szabványokon nyugszanak. WS-I szervezet több profilt
fejlesztett ki a különböző implementációk együttműködésének segítségére.
A SOAP egy XML alapú üzenetformátum, mely egy SOAP borítékot definiál,
melyben az üzenetek utaznak. A WSDL szintén egy XML alapú interfészleíró
nyelv. A SOAP webszolgáltatásokat a modernebb, egyszerűbben használható
RESTful webszolgáltatások kezdik kiszorítani. Azonban még történeti
jelleggel sok helyen találhatóak SOAP webszolgáltatások, melyekhez
modern programokból is csatlakozni kell.

# Részletek {#reszletek}

<hr />

## Egy példa webszolgáltatás {#egy-pelda-webszolgaltatas}

A webszolgáltatás egy nevet vár, és egy üdvözlőszöveget ad vissza.

A címre a következő formátumban kell posztolni egy XML dokumentumot (a WSDL-ben leírtaknak megfelelően).
A `Name` tag értéke tetszőlegesen módosítható.

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
        <HelloRequest xmlns="http://learnwebservices.com/services/hello">
          <Name>John Doe</Name>
        </HelloRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

Ennek hatására a SOAP webszolgáltatás a következő válaszüzenetet adja vissza.
A név alapján változó üzenetet a `Message` tag tartalmazza.

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Body>
        <HelloResponse xmlns="http://learnwebservices.com/services/hello">
          <Message>Hello John Doe!</Message>
        </HelloResponse>
   </soap:Body>
</soap:Envelope>
```

### Hibakezelés {#hibakezeles}

Amennyiben hiba történik a webszolgáltatás hívása közben, pl. hibás üzenetet küldünk be, ún. SOAP faultot kapunk.

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

# További webszolgáltatások {#tovabbi-webszolgaltatasok}

<hr />

Celsius to Fahrenheit converter

<div class="d-flex justify-content-center mb-3">
  <div class="form-row col-md-8">
    <div class="input-group ">    
      <input type="text" value="{{site.api_url}}/services/tempconverter?wsdl" id="highlighted-wsdl-temp" class="form-control"/>
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

# Szerver alkalmazás {#szerver-alkalmazas}

<hr />

<p>Egy Spring Boot alkalmazás szolgálja ki a példa webszolgáltatásokat.</p>

<p><a href="https://github.com/vicziani/learnwebservices-server/" title="Forráskód a GitHubon" class="github-icon"><i class="fab fa-github"></i></a>
 <a href="https://github.com/vicziani/learnwebservices-server/">Forráskód</a></p>

Az alkalmazás elérhető a [Docker Hub-on](https://hub.docker.com/r/vicziani/lwsapp) is.

A következő paranccsal futtatható.

```shell
docker run -p 8080:8080 --name my-lwsapp vicziani/lwsapp
```

Utána elérhető a `http://localhost:8080` címen!

# Kliens Implementációk {#kliens-implementaciok}

<hr />

<ul class="nav nav-pills" id="implementationsTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="soapui-tab" data-toggle="tab" href="#soapui" role="tab" aria-controls="home" aria-selected="true">SoapUI</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="postman-tab" data-toggle="tab" href="#postman" role="tab" aria-controls="contact" aria-selected="false">Postman</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="jmeter-tab" data-toggle="tab" href="#jmeter" role="tab" aria-controls="contact" aria-selected="false">JMeter</a>
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
    <a class="nav-link" id="python-tab" data-toggle="tab" href="#python" role="tab" aria-controls="contact" aria-selected="false">Python</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="js-tab" data-toggle="tab" href="#js" role="tab" aria-controls="contact" aria-selected="false">JavaScript</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="nodejs-tab" data-toggle="tab" href="#nodejs" role="tab" aria-controls="contact" aria-selected="false">Node.js</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="dotnet-tab" data-toggle="tab" href="#dotnet" role="tab" aria-controls="contact" aria-selected="false">.NET C#</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="ruby-tab" data-toggle="tab" href="#ruby" role="tab" aria-controls="contact" aria-selected="false">Ruby</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="php-tab" data-toggle="tab" href="#php" role="tab" aria-controls="contact" aria-selected="false">PHP</a>
  </li>
</ul>

<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="soapui" role="tabpanel" aria-labelledby="soapui-tab" markdown="1">

SoapUI használatával a [hivatalos dokumentáció](https://www.soapui.org/soap-and-wsdl/getting-started.html) alapján létre
kell hozni egy új SOAP projektet, és a _Initial WSDL_ beviteli mezőben megadni a [{{site.api_url}}/services/hello?WSDL]({{site.api_url}}/services/hello?WSDL)
címet, majd kiválasztani bal oldalon a `SayHello` operációt, és megnyitni a `Request 1` példa kérést. A nevet
megadni a `Name` tagen belül lehet. Majd meg kell nyomni a zöld _Submit request_ gombot.

Kattints a képre, ha egy animációt néznél meg arról, hogy kell SoapUI-jal kérést létrehozni!

<div class="demo-image">
  <a href="images/soapui-anim.gif" data-lightbox="learnwebservices">
    <img src="images/soapui.png" title="Kérés SoapUI-ban" class="img-fluid"/>
  </a>
</div>

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-soapui-project" title="Projekt fájl a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-soapui-project">SoapUI projekt fájl</a></p>

</div>
<div class="tab-pane fade" id="postman" role="tabpanel" aria-labelledby="postman-tab" markdown="1">

Kattints a képre, ha egy animációt néznél meg arról, hogy kell egy Postman kérést létrehozni!

<div class="demo-image">
  <a href="images/postman-anim.gif" data-lightbox="learnwebservices">
    <img src="images/postman.png" title="Postman kérés" class="img-fluid"/>
  </a>
</div>

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-postman-collection" title="Postman Collection a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-postman-collection">Postman Collection fájl</a></p>

</div>
<div class="tab-pane fade" id="jmeter" role="tabpanel" aria-labelledby="jmeter-tab" markdown="1">

Az Apache JMeter használható SOAP webszolgáltatások terheléses tesztelésére is.

Kattints a képre, ha egy animációt néznél meg arról, hogy kell egy JMeter projektet létrehozni!

<div class="demo-image">
  <a href="images/jmeter-anim.gif" data-lightbox="learnwebservices">
    <img src="images/jmeter.png" title="Webszolgáltatás hívás JMeterrel" class="img-fluid"/>
  </a>
</div>

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-jmeter-project" title="Projekt a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-jmeter-project">JMeter projekt fájl</a></p>

</div>

<div class="tab-pane fade" id="curl" role="tabpanel" aria-labelledby="curl-tab" markdown="1">

<!-- Tipp: ez az oldal letölthető a curl használatával is a `curl https://www.learnwebservices.com` paranccsal. -->

A webszolgáltatás a curl segítségével is meghívható a következő módon. Egyrészt `POST` metódust kell használni,
majd meg kell adni, hogy a tartalom típusa XML, végül a http kérés törzsében az elküldendő
SOAP kérést.

```
curl --request POST --header "Content-Type: text/xml;charset=UTF-8"  \
  --data '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Header/> \
  <soapenv:Body> \
  <HelloRequest xmlns="http://learnwebservices.com/services/hello"><Name>John Doe</Name></HelloRequest> \
  </soapenv:Body></soapenv:Envelope>' \
  https://apps.learnwebservices.com/services/hello
```

</div>
<div class="tab-pane fade" id="wget" role="tabpanel" aria-labelledby="wget-tab" markdown="1">

A webszolgáltatás Wget parancs használatával a következő módon hívható meg.

```
wget -qO - --header "Content-Type: text/xml;charset=UTF-8"  \
  --post-data '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Header/> \
  <soapenv:Body> \
  <HelloRequest xmlns="http://learnwebservices.com/services/hello"><Name>John Doe</Name></HelloRequest> \
  </soapenv:Body></soapenv:Envelope>' \
  https://apps.learnwebservices.com/services/hello
```

</div>
<div class="tab-pane fade" id="httpie" role="tabpanel" aria-labelledby="httpie-tab" markdown="1">

A webszolgáltatás [HTTPie](https://httpie.org/) parancs használatával a következő módon hívható meg.

```
echo '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Header/> \
  <soapenv:Body> \
  <HelloRequest xmlns="http://learnwebservices.com/services/hello"><Name>John Doe</Name></HelloRequest> \
  </soapenv:Body></soapenv:Envelope>' | \
  http -b POST https://apps.learnwebservices.com/services/hello  'Content-Type:text/xml;charset=UTF-8'
```

</div>
<div class="tab-pane fade" id="jaxws" role="tabpanel" aria-labelledby="cxf-tab" markdown="1">

SOAP webszolgáltatás meghívása Javaban [JAX-WS RI](https://javaee.github.io/metro-jax-ws/) library-vel,
[jaxws-maven-plugin](https://www.mojohaus.org/jaxws-maven-plugin/) Maven pluginnel.

A kód ugyanez [CXF](http://cxf.apache.org) library-vel és
[cxf-codegen-plugin](http://cxf.apache.org/docs/maven-cxf-codegen-plugin-wsdl-to-java.html)
Maven pluginnel.

```java
HelloEndpointService service = new HelloEndpointService();
HelloEndpoint port = service.getHelloEndpointPort();
HelloRequest request = new HelloRequest();
request.setName("John Doe");
HelloResponse response = port.sayHello(request);
System.out.println(response.getMessage());
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-jaxwsri-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-jaxwsri-client">Forráskód JAX-WS RI-vel</a></p>

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-cxf-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-cxf-client">Forráskód Java CXF-fel</a></p>

</div>
<div class="tab-pane fade" id="sws" role="tabpanel" aria-labelledby="sws-tab" markdown="1">

Javaban [Spring Web Services](https://spring.io/projects/spring-ws) library-vel, JAX-B marshallerrel,
[maven-jaxb2-plugin](https://github.com/highsource/maven-jaxb2-plugin) Maven pluginnel.

```java
HelloRequest helloRequest = new HelloRequest();
helloRequest.setName("John Doe");

JAXBElement<HelloResponse> response = (JAXBElement<HelloResponse>)
        webServiceTemplate.marshalSendAndReceive(new ObjectFactory().createHelloRequest(helloRequest));

System.out.println(response.getValue().getMessage());
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-springws-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-springws-client">Forráskód</a></p>

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

HelloEndpointServiceStub.HelloRequestE sayHelloE =
        new HelloEndpointServiceStub.HelloRequestE();
sayHelloE.setHelloRequest(helloRequest);

HelloEndpointServiceStub.HelloResponseE sayHelloResponseE =
        stub.sayHello(sayHelloE);
System.out.println(sayHelloResponseE
        .getHelloResponse()
        .getMessage());
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-axis2-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-axis2-client">Forráskód</a></p>

</div>
<div class="tab-pane fade" id="groovy" role="tabpanel" aria-labelledby="groovy-tab" markdown="1">

Webszolgáltatás hívása Goovy nyelven
[groovy-wslite](https://github.com/jwagenleitner/groovy-wslite) library
használatával.

```groovy
@Grab('com.github.groovy-wslite:groovy-wslite:1.1.2')
import wslite.soap.*

def client = new SOAPClient('https://apps.learnwebservices.com/services/hello')
def response = client.send {
    body {
        HelloRequest('xmlns':'http://learnwebservices.com/services/hello') {
          Name("John Doe")
        }
    }
}

println(response.HelloResponse.Message)
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-groovy-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-groovy-client">Forráskód</a></p>

</div>
<div class="tab-pane fade" id="python" role="tabpanel" aria-labelledby="python-tab" markdown="1">

Használható a [Zeep](https://github.com/mvantellingen/python-zeep) library.

```python
wsdl = 'https://apps.learnwebservices.com/services/hello?wsdl'
client = zeep.Client(wsdl=wsdl)
request = 'John Doe'
print(client.service.SayHello(request))
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-python-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-python-client">Forráskód</a></p>

</div>
<div class="tab-pane fade" id="js" role="tabpanel" aria-labelledby="js-tab" markdown="1">

A webszolgáltatást böngészőből is meg lehet hívni, ha ugyanazon a domainen van, vagy be van állítva a
Cross-Origin Resource Sharing (CORS).

```javascript
const url = "https://apps.learnwebservices.com/services/hello";
const request = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
        <HelloRequest xmlns="http://learnwebservices.com/services/hello">
            <Name>John Doe</Name>
        </HelloRequest>
    </soapenv:Body>
 </soapenv:Envelope>`;

 const fetchData = {
    method: 'POST',
    body: request
 };

 fetch(url, fetchData)
   .then(function(response) {
     return response.text();
   })
   .then(function(xml) {
       const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");
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
    <button type="submit" class="btn btn-primary text-nowrap">Hívd meg a webszolgáltatást!</button>
  </div>    
</div>
</form>

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-vanillajs-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-vanillajs-client" >Forráskód</a></p>

</div>
<div class="tab-pane fade" id="nodejs" role="tabpanel" aria-labelledby="nodejs-tab" markdown="1">

Használható a [SOAP](https://github.com/vpulim/node-soap#readme) projekt.

```javascript
const soap = require("soap");
const url = "https://apps.learnwebservices.com/services/hello?wsdl";
const args = {Name: "John Doe"};
soap.createClient(url, function(err, client) {
    client.SayHello(args, function(err, result) {
        console.log(result.Message);
    });
});
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-js-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-js-client">Forráskód</a></p>

</div>
<div class="tab-pane fade" id="dotnet" role="tabpanel" aria-labelledby="dotnet-tab" markdown="1">

Az alábbi forráskód bemutatja, hogyan hívhat meg egy webszolgáltatást .NET használatával C# nyelv használatával.

```csharp
HelloEndpointClient client = new HelloEndpointClient();
var response = await client.SayHelloAsync(new () { Name = "John Doe" });
Console.WriteLine(response.HelloResponse.Message);
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-dotnet-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-dotnet-client">Forráskód</a></p>

</div>
<div class="tab-pane fade" id="ruby" role="tabpanel" aria-labelledby="ruby-tab" markdown="1">

A következő példa mutatja, hogy kell webszolgáltatás hívni Ruby-ban,
[Savon](https://github.com/savonrb/savon) library használatával.

```ruby
require 'savon'

client = Savon.client(wsdl: 'https://apps.learnwebservices.com/services/hello?WSDL')
response = client.call(
  :say_hello,
  soap_action: '',
  message: { 'Name' => 'John Doe' }
)
puts response.body[:hello_response][:message]
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-ruby-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-ruby-client">Forráskód</a></p>

</div>
<div class="tab-pane fade" id="php" role="tabpanel" aria-labelledby="php-tab" markdown="1">

A következő példa mutatja, hogy kell webszolgáltatás hívni PHP-ban,
[SOAP bővítménnyel](https://www.php.net/manual/en/book.soap.php).

```php
<?php

$client = new SoapClient('https://apps.learnwebservices.com/services/hello?wsdl');
echo $client
	->SayHello(
		[
				'Name' => 'John Doe'
		]
	)
	->Message
;
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-php-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
<a href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-php-client">Forráskód</a></p>

</div>
</div>


## Közreműködők {#kozremukodok}

* Kuti Rita
* Mauro Chojrin ([mchojrin](https://github.com/mchojrin))
* Rácz János ([rczjns](https://github.com/rczjns))
* Vörös Bea ([beavoros](https://github.com/beavoros))
