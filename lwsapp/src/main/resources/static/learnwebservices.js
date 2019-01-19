window.onload = function() {
  registerOnSubmit();
}

function registerOnSubmit() {
  var form = document.getElementById("hello-form");
  form.onsubmit = submitHandler;
}

function submitHandler() {
    callWebservice(readName(), function(message) {
        writeMessage(message);
        setStatus("online");
    },
    function(error) {
        setStatus("offline");
        console.log(error);
    });
    return false;
}

function setStatus(status) {
    var badge = document.getElementById(status + "-badge");
    console.log(badge);
    badge.classList.remove("hidden");
}

function readName() {
    return document.getElementById("hello-name-input").value;
}

function writeMessage(message) {
    document.getElementById("hello-message-input").value = message;
}

function callWebservice(name, onSuccess, onError) {
  var url = "http://localhost:8080/services/hello";
  var request = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
     <soapenv:Header/>
     <soapenv:Body>
        <SayHello xmlns="http://learnwebservices.com/services/hello">
           <HelloRequest>
              <Name>{{name}}</Name>
           </HelloRequest>
        </SayHello>
     </soapenv:Body>
  </soapenv:Envelope>`.replace("{{name}}", name);

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
        var message = xmlDoc.getElementsByTagNameNS("http://learnwebservices.com/services/hello", "Message")[0].textContent;
        onSuccess(message);
    })
    .catch(function(error) {
      onError(error);
    });
}