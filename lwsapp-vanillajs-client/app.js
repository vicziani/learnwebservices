const fetch = require("node-fetch");
const DOMParser = require("@xmldom/xmldom").DOMParser;

function callWebservice() {
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
     method: "POST",
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
}

callWebservice();
