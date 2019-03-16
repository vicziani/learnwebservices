window.onload = function() {
  registerOnSubmit();
  checkWebserviceStatus();
}

function registerOnSubmit() {
  var form = document.getElementById("hello-form");
  form.onsubmit = submitHandler;
}

function checkWebserviceStatus() {
  callWebservice("John Doe", function(message) {
      setStatus("online");
  },
  function(error) {
      setStatus("offline");
  });
}

function submitHandler() {
    callWebservice(readName(), function(message) {
        writeMessage(message);
    },
    function(error) {
        showErrorMessage();
    });
    return false;
}

function showErrorMessage() {
  var div = document.getElementById("webservice-error-div");
  div.classList.remove("d-none");
}

function setStatus(status) {
    var badge = document.getElementById(status + "-badge");
    badge.classList.remove("d-none");
}

function readName() {
    return document.getElementById("hello-name-input").value;
}

function writeMessage(message) {
    document.getElementById("hello-message-input").value = message;
}

function callWebservice(name, onSuccess, onError) {
  var url = "http://www.learnwebservices.com/services/hello";
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

  return false;
}
