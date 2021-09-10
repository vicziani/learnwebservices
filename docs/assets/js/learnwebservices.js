window.onload = function() {
  registerOnSubmit();
  checkServerStatus();
  registerCopyButtonHandlers();
}

function registerCopyButtonHandlers() {
  $(".btn-copy").mouseleave(function(e) {
    $(this).tooltip("hide");
  });
}

function registerOnSubmit() {
  const form = document.getElementById("hello-form");
  form.onsubmit = submitHandler;
}

function checkServerStatus() {
  const url = apiUrl + "/actuator/info";
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(info) {
      setStatus("Online (" + info.build.version + ")", "badge-success");
    })
    .catch(function(error) {
      console.log(error);
      setStatus("Offline", "badge-danger")
    });
}

function submitHandler() {
    callWebservice(readName(), function(message) {
      hideErrorMessage();
      writeMessage(message);
    },
    function(error) {
      showErrorMessage();
    });
    return false;
}

function showErrorMessage() {
  const div = document.getElementById("webservice-error-div");
  div.classList.remove("d-none");
}

function hideErrorMessage() {
  const div = document.getElementById("webservice-error-div");
  div.classList.add("d-none");
}

function setStatus(text, cssClass) {
  setStatusForElement("health-check-badge", text, cssClass);
  setStatusForElement("health-check-badge-converter", text, cssClass);
}

function setStatusForElement(elementId, text, ccsClass) {
  const badge = document.getElementById(elementId);
  badge.innerHTML = text;
  badge.classList.remove("d-none");
  badge.classList.add(ccsClass);
}

function readName() {
    return escapeXml(document.getElementById("hello-name-input").value);
}

function writeMessage(message) {
    document.getElementById("hello-message-input").value = message;
}

function callWebservice(name, onSuccess, onError) {
  const url = apiUrl + "/services/hello";
  const request = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
     <soapenv:Header/>
     <soapenv:Body>
        <SayHello xmlns="http://learnwebservices.com/services/hello">
           <HelloRequest>
              <Name>${name}</Name>
           </HelloRequest>
        </SayHello>
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
        const message = xmlDoc.getElementsByTagNameNS("http://learnwebservices.com/services/hello", "Message")[0].textContent;
        onSuccess(message);
    })
    .catch(function(error) {
      console.log(error);
      onError(error);
    });

  return false;
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
      switch (c) {
          case "<": return "&lt;";
          case ">": return "&gt;";
          case "&": return "&amp;";
          case "'": return "&apos;";
          case '"': return "&quot;";
      }
  });
}