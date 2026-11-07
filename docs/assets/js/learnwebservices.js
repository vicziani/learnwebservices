window.onload = function() {
  registerHeadingAnchors();
  registerWsdlExplorer();
  registerCopy();
  registerOnSubmit();
  checkServerStatus();
  registerTabAnchorSync();
  registerNavbarCollapse();
}

// The sticky menu would otherwise stay open on small screens, covering the section just navigated to.
// Navigation waits for the menu to close, because the position of the target changes while it collapses.
function registerNavbarCollapse() {
  const menu = document.querySelector(".navbar-sticky .navbar-collapse");
  menu.querySelectorAll('a.nav-link[href^="#"]').forEach(function(link) {
    link.addEventListener("click", function(event) {
      if (!menu.classList.contains("show")) {
        return;
      }
      event.preventDefault();
      menu.addEventListener("hidden.bs.collapse", function() {
        link.click();
      }, { once: true });
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });
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

  registerWsdlReferenceArrows(code);

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
      wrapLines(container, lines, "wsdl-section").dataset.wsdlPart = part;
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
function wrapLines(container, lines, className) {
  const range = document.createRange();
  range.setStart(...findTextPosition(container, lines.start));
  // Locate the newline itself: the offset after it can already be inside the next tag's span.
  const [endNode, endOffset] = findTextPosition(container, lines.lastNewline);
  range.setEnd(endNode, endOffset + 1);

  const wrapper = document.createElement("span");
  wrapper.className = className;
  range.surroundContents(wrapper);
  return wrapper;
}

const WSDL_REFERENCES = [
  { from: "wsdl:part", attribute: "element", to: "xs:element" },
  { from: "xs:element", attribute: "type", to: "xs:complexType" },
  { from: "wsdl:input", attribute: "message", to: "wsdl:message" },
  { from: "wsdl:output", attribute: "message", to: "wsdl:message" },
  { from: "wsdl:binding", attribute: "type", to: "wsdl:portType" },
  // These tags of a binding refer to the portType tags with the same name.
  { from: "wsdl:operation", attribute: "name", to: "wsdl:operation" },
  { from: "wsdl:input", attribute: "name", to: "wsdl:input" },
  { from: "wsdl:output", attribute: "name", to: "wsdl:output" },
  { from: "wsdl:port", attribute: "binding", to: "wsdl:binding" }
];

const WSDL_ARROW_LANE_WIDTH = 8;
const WSDL_ARROW_CORNER_RADIUS = 4;
const WSDL_ARROW_HEAD_SIZE = 5;

function registerWsdlReferenceArrows(code) {
  const text = code.textContent;
  const references = findWsdlReferences(text);
  const laneCount = assignArrowLanes(references);
  const gutter = (laneCount + 1) * WSDL_ARROW_LANE_WIDTH;
  code.style.paddingLeft = gutter + "px";

  const codeHeight = code.getBoundingClientRect().height;
  const lineHeight = codeHeight / text.trimEnd().split("\n").length;

  function lineCenter(line) {
    return (line + 0.5) * lineHeight;
  }

  const lineHighlight = document.createElement("span");
  lineHighlight.className = "wsdl-line-highlight";
  lineHighlight.style.left = gutter + "px";
  lineHighlight.style.height = lineHeight + "px";
  code.appendChild(lineHighlight);

  const svg = createSvgElement("svg", {
    "class": "wsdl-arrows",
    "aria-hidden": "true",
    width: gutter,
    height: codeHeight
  });

  const arrows = references.map(function(reference) {
    const x = gutter - (reference.lane + 1) * WSDL_ARROW_LANE_WIDTH;
    const element = createArrow(x, gutter, lineCenter(reference.from), lineCenter(reference.to));
    svg.appendChild(element);
    return { element: element, source: reference.from };
  });

  code.appendChild(svg);

  function setActiveLine(line) {
    lineHighlight.classList.toggle("wsdl-line-highlight-active", line !== null);
    lineHighlight.style.top = line * lineHeight + "px";

    arrows.forEach(function(arrow) {
      const active = arrow.source === line;
      arrow.element.classList.toggle("wsdl-arrow-active", active);
      if (active) {
        svg.appendChild(arrow.element);
      }
    });
  }

  code.addEventListener("mousemove", function(event) {
    const top = code.getBoundingClientRect().top;
    setActiveLine(Math.floor((event.clientY - top) / lineHeight));
  });
  code.addEventListener("mouseleave", function() {
    setActiveLine(null);
  });
}

function findWsdlReferences(text) {
  const lines = text.split("\n");
  const references = [];

  lines.forEach(function(line, from) {
    WSDL_REFERENCES.forEach(function(rule) {
      const pattern = "<" + rule.from + "\\s.*\\b" + rule.attribute + '="(?:tns:)?([^"]+)"';
      const match = line.match(new RegExp(pattern));
      if (!match) {
        return;
      }

      const definition = new RegExp("<" + rule.to + '\\s.*\\bname="' + match[1] + '"');
      const to = lines.findIndex(function(candidate) {
        return definition.test(candidate);
      });
      if (to >= 0 && to < from) {
        references.push({ from: from, to: to });
      }
    });
  });

  return references;
}

// Every reference points upwards. Shorter arrows get the lanes closer to the code,
// and arrows sharing a lane must not touch. Returns the number of lanes.
function assignArrowLanes(references) {
  const lanes = [];
  const byLength = references.slice().sort(function(a, b) {
    return (a.from - a.to) - (b.from - b.to);
  });

  byLength.forEach(function(reference) {
    let lane = lanes.findIndex(function(taken) {
      return taken.every(function(other) {
        return reference.from < other.to || reference.to > other.from;
      });
    });
    if (lane < 0) {
      lane = lanes.push([]) - 1;
    }
    lanes[lane].push(reference);
    reference.lane = lane;
  });

  return lanes.length;
}

function createArrow(x, gutter, fromY, toY) {
  const radius = WSDL_ARROW_CORNER_RADIUS;
  const head = WSDL_ARROW_HEAD_SIZE;

  const arrow = createSvgElement("g", { "class": "wsdl-arrow" });
  arrow.appendChild(createSvgElement("path", {
    "class": "wsdl-arrow-line",
    d: `M ${gutter} ${fromY} H ${x + radius} Q ${x} ${fromY} ${x} ${fromY - radius}`
      + ` V ${toY + radius} Q ${x} ${toY} ${x + radius} ${toY} H ${gutter - head}`
  }));
  arrow.appendChild(createSvgElement("path", {
    "class": "wsdl-arrow-head",
    d: `M ${gutter} ${toY} L ${gutter - head} ${toY - head / 2 - 1} V ${toY + head / 2 + 1} Z`
  }));
  return arrow;
}

function createSvgElement(name, attributes) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.keys(attributes).forEach(function(attribute) {
    element.setAttribute(attribute, attributes[attribute]);
  });
  return element;
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
  if (!form) {
    return;
  }

  form.onsubmit = submitHandler;
}

function checkServerStatus() {
  if (!document.getElementById("health-check-badge")) {
    return;
  }

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