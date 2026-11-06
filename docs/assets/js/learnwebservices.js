window.onload = function() {
  registerHeadingAnchors();
  registerWsdlExplorer();
  registerCopy();
  registerOnSubmit();
  checkServerStatus();
  registerTabAnchorSync();
}

function registerWsdlExplorer() {
  const explorer = document.querySelector(".wsdl-explorer");
  if (!explorer) {
    return;
  }

  const code = explorer.querySelector(".wsdl-source code");

  // Parents precede their children in the diagram, so the parent sections already exist.
  explorer.querySelectorAll(".wsdl-diagram [data-wsdl-part]").forEach(function(diagramItem) {
    wrapWsdlElements(code, diagramItem.dataset.wsdlPart);
  });

  function setActivePart(part) {
    explorer.querySelectorAll("[data-wsdl-part]").forEach(function(element) {
      element.classList.toggle("wsdl-active", element.dataset.wsdlPart === part);
    });
  }

  function activateClosestPart(event) {
    const element = event.target.closest("[data-wsdl-part]");
    setActivePart(element ? element.dataset.wsdlPart : null);
  }

  function clearActivePart() {
    setActivePart(null);
  }

  explorer.addEventListener("mouseover", activateClosestPart);
  explorer.addEventListener("mouseleave", clearActivePart);
  explorer.addEventListener("focusin", activateClosestPart);
  explorer.addEventListener("focusout", clearActivePart);
}

// A part is a tag name, or "parent/child" for a tag inside the sections of its parent.
function wrapWsdlElements(code, part) {
  const separator = part.lastIndexOf("/");
  const tag = part.slice(separator + 1);
  const containers = separator < 0
    ? [code]
    : code.querySelectorAll('.wsdl-section[data-wsdl-part="' + part.slice(0, separator) + '"]');

  containers.forEach(function(container) {
    findElementLines(container.textContent, tag).forEach(function(lines) {
      wrapLines(container, lines, part);
    });
  });
}

function findElementLines(text, tag) {
  const closingTag = "</" + tag + ">";
  const matches = text.matchAll(new RegExp("<" + tag + "[\\s>]", "g"));

  return Array.from(matches, function(match) {
    return {
      start: text.lastIndexOf("\n", match.index) + 1,
      lastNewline: text.indexOf("\n", text.indexOf(closingTag, match.index))
    };
  });
}

// Wraps whole lines, keeping the syntax highlighted spans intact.
function wrapLines(container, lines, part) {
  const range = document.createRange();
  range.setStart(...findTextPosition(container, lines.start));
  // Locate the newline itself: the offset after it can already be inside the next tag's span.
  const [endNode, endOffset] = findTextPosition(container, lines.lastNewline);
  range.setEnd(endNode, endOffset + 1);

  const section = document.createElement("span");
  section.className = "wsdl-section";
  section.dataset.wsdlPart = part;
  range.surroundContents(section);
}

function findTextPosition(root, offset) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let remaining = offset;

  while (walker.nextNode()) {
    const length = walker.currentNode.length;
    if (remaining < length) {
      return [walker.currentNode, remaining];
    }
    remaining -= length;
  }

  throw new Error("Offset out of range: " + offset);
}

function registerHeadingAnchors() {
  const main = document.querySelector("main");
  if (!main) {
    return;
  }

  const headings = main.querySelectorAll("h1, h2, h3");
  if (!headings.length) {
    return;
  }

  const usedIds = new Set();
  document.querySelectorAll("[id]").forEach(function(element) {
    usedIds.add(element.id);
  });

  headings.forEach(function(heading) {
    const baseId = heading.id || slugifyHeading(heading.textContent);
    if (!baseId) {
      return;
    }

    const uniqueId = ensureUniqueHeadingId(baseId, usedIds);
    if (!heading.id) {
      heading.id = uniqueId;
    }

    heading.classList.add("lws-anchor-heading");

    if (heading.querySelector(":scope > .lws-heading-anchor")) {
      return;
    }

    const anchor = document.createElement("a");
    anchor.className = "lws-heading-anchor";
    anchor.href = "#" + heading.id;
    anchor.setAttribute("aria-label", "Copy link to section " + heading.textContent.trim());
    anchor.title = "Copy link";

    const icon = document.createElement("i");
    icon.className = "fas fa-link";
    anchor.appendChild(icon);

    anchor.addEventListener("click", function() {
      const absoluteUrl = window.location.origin + window.location.pathname + "#" + heading.id;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(absoluteUrl).catch(function() {
          // Let the default anchor behavior continue if clipboard copy is unavailable.
        });
      }
    });

    heading.insertBefore(anchor, heading.firstChild);
  });
}

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function ensureUniqueHeadingId(baseId, usedIds) {
  let candidate = baseId;
  let counter = 1;

  while (usedIds.has(candidate)) {
    candidate = baseId + "-" + counter;
    counter += 1;
  }

  usedIds.add(candidate);
  return candidate;
}

function registerTabAnchorSync() {
  const tabContainer = document.getElementById("implementations-tab");
  if (!tabContainer) {
    return;
  }

  tabContainer.addEventListener("shown.bs.tab", function(event) {
    const tabLink = event.target;
    const hash = tabLink.getAttribute("href");
    if (!hash || hash.charAt(0) !== "#") {
      return;
    }

    if (window.location.hash !== hash) {
      history.replaceState(null, "", hash);
    }
  });

  activateTabFromHash(false);

  window.addEventListener("hashchange", function() {
    activateTabFromHash(true);
  });
}

function activateTabFromHash(smoothScroll) {
  const hash = window.location.hash;
  if (!hash || hash.charAt(0) !== "#") {
    return;
  }

  const tabLink = document.querySelector('#implementations-tab a.nav-link[href="' + hash + '"]');
  if (!tabLink) {
    return;
  }

  const tab = bootstrap.Tab.getOrCreateInstance(tabLink);
  tab.show();

  const tabContent = document.querySelector(hash);
  if (tabContent) {
    tabContent.scrollIntoView({ behavior: smoothScroll ? "smooth" : "auto", block: "start" });
  }
}

function registerCopy() {
  const clipboard = new ClipboardJS(".btn-copy");
  clipboard.on("success", function(event) {    
    event.clearSelection();
    
    // Bootstrap tooltip megjelenítése
    const button = event.trigger;
    const tooltipText = button.getAttribute("title") || "Copied";
    const tooltip = new bootstrap.Tooltip(button, {
      title: tooltipText,
      placement: "top",
      trigger: "manual"
    });
    
    tooltip.show();
    
    button.addEventListener("mouseleave", function() {
      tooltip.hide();
      tooltip.dispose();
    }, { once: true });
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
      if (response.status != 200) {
        throw new Error(`Status: ${response.status}`);
      }
      return response.json();
    })
    .then(function(info) {
      setStatus("Online (" + info.build.version + ")", "text-bg-success");
    })
    .catch(function(error) {
      console.log(error);
      setStatus("Offline", "text-bg-danger")
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
        <HelloRequest xmlns="http://learnwebservices.com/services/hello">
          <Name>${name}</Name>
        </HelloRequest>
     </soapenv:Body>
  </soapenv:Envelope>`;

  const fetchData = {
     method: "POST",
     body: request
  };

  fetch(url, fetchData)
    .then(function(response) {
        if (response.status != 200) {
          throw new Error(`Status: ${response.status}`);
        }
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