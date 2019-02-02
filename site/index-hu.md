---
layout: default-hu
---

# Bevezetés {#bevezetes}

<hr />

## TL;DR

Ha szükséged van gyorsan kipróbálni valamit, itt egy WSDL, és mögötte egy működő SOAP
webszolgáltatás:

<div class="container">
<div class="row justify-content-md-center">
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

## Az oldal célja

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

## Webszolgáltatásokról

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

# Példák {#peldak}

<hr />

## További webszolgáltatások

<table class="table table-borderless table-striped">
  <!--<thead>
    <tr>
      <th>Funkció</th>
      <th>WSDL</th>
    </tr>
  </thead>-->
  <tbody>
    <tr>
      <td class="align-middle">Celsius és Fahrenheit váltás</td>
      <td>
        <div class="container">
        <div class="row justify-content-md-center">
        <div class="col-xs-6 highlighted-wsdl">
          <a id="highlighted-wsdl-temp" class="text-wrap" href="http://www.learnwebservices.com/services/tempconverter?wsdl">http://www.learnwebservices.com/services/tempconverter?wsdl</a>  
        </div>
          <div class="col-xs-6">
            <i class="copy-button far fa-copy" data-clipboard-target="#highlighted-wsdl-temp"></i>  
          </div>
        </div>
        </div>        
      </td>
    </tr>
</tbody>
</table>

## Egy példa webszolgáltatás

Egy SOAP webszolgáltatás található `http://www.learnwebservices.com/services/hello`
címen, mely egy nevet vár, és egy üdvözlőszöveget ad vissza.

A SOAP webszolgáltatás WSDL dokumentuma elérhető a [http://www.learnwebservices.com/services/hello?WSDL](http://www.learnwebservices.com/services/hello?WSDL) címen.
(A WSDL dokumentum egy XML dokumentum, melyet a Firefox nem jelenít meg, csak a _View Page Source_ menüpontra kattintva.) A WSDL állomány
olvasható formában [itt található](wsdl-hu.html).

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

### Hibakezelés

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

## Hívása SoapUI használatával

SoapUI használatával a [hivatalos dokumentáció](https://www.soapui.org/soap-and-wsdl/getting-started.html) alapján létre
kell hozni egy új SOAP projektet, és a _Initial WSDL_ beviteli mezőben megadni a [http://www.learnwebservices.com/services/hello?WSDL](http://www.learnwebservices.com/services/hello?WSDL)
címet, majd kiválasztani bal oldalon a `SayHello` operációt, és megnyitni a `Request 1` példa kérést. A nevet
megadni a `Name` tagen belül lehet. Majd meg kell nyomni a zöld _Submit request_ gombot.

<div class="demo-image">
  <img src="images/soapui.gif" title="Call web service in SoapUI" class="img-fluid"/>
</div>

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-soapui-project" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
Egy példa SoapUI projekt elérhető a GitHubon.</p>

## CURL

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

## Hívása Javaban

A SOAP webszolgáltatás Javaban is hívható, valamelyik webszolgáltatás keretrendszer felhasználásával.
Ebből az egyik a [JAX-WS RI](https://javaee.github.io/metro-jax-ws/).

Ennek használatával a következőképp hívható a SOAP webszolgáltatás:

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
Egy példa Java kliens elérhető a GitHubon.</p>

## Hívása Pythonban

Használható a [Zeep](https://github.com/mvantellingen/python-zeep) keretrendszer.

```python
wsdl = 'http://www.learnwebservices.com/services/hello?wsdl'
client = zeep.Client(wsdl=wsdl)
request = {'Name': 'John Doe'}
print(client.service.SayHello(request))
```

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-python-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
Egy példa Python kliens elérhető a GitHubon.</p>

## Vanilla JS

A webszolgáltatást böngészőből is meg lehet hívni, ha ugyanazon a domainen van, vagy be van állítva a
Cross-Origin Resource Sharing (CORS).

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
Egy példa Node.js kliens elérhető a GitHubon.</p>

## Hívása Node.js esetén

Használható a [SOAP](https://github.com/vpulim/node-soap#readme) projekt.

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

<p><a class="github-icon" href="https://github.com/vicziani/learnwebservices/tree/master/lwsapp-js-client" title="Forráskód a GitHubon"><i class="fab fa-github"></i></a>
Egy példa Node.js kliens SOAP keretrendszerrel elérhető a GitHubon.</p>

## Hívása .NET Core keretrendszerrel C# nyelven

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
Egy példa C# kliens elérhető a GitHubon.</p>
