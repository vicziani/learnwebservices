window.onload = function() {
  registerHeadingAnchors();
  registerWsdlExplorer();
  registerPlayground();
  registerQuiz();
  registerCopy();
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

function registerPlayground() {
  const playground = document.getElementById("playground");
  if (!playground) {
    return;
  }

  const request = playground.querySelector(".playground-request");
  const send = playground.querySelector(".playground-send");
  const reset = playground.querySelector(".playground-reset");
  const response = playground.querySelector(".playground-response");
  const status = playground.querySelector(".playground-status");

  function showStatus(text, success) {
    status.textContent = text;
    status.classList.remove("d-none", "text-bg-success", "text-bg-danger");
    status.classList.add(success ? "text-bg-success" : "text-bg-danger");
  }

  function showResponse(html) {
    const code = document.createElement("code");
    code.innerHTML = html;
    response.replaceChildren(code);
  }

  reset.addEventListener("click", function() {
    request.value = request.defaultValue;
    request.focus();
  });

  send.addEventListener("click", function() {
    send.disabled = true;
    const start = performance.now();

    // No Content-Type header, so the browser does not need a CORS preflight request.
    fetch(apiUrl + "/services/hello", {
      method: "POST",
      body: request.value
    })
      .then(function(httpResponse) {
        return httpResponse.text().then(function(text) {
          const elapsed = Math.round(performance.now() - start);
          showStatus("HTTP " + httpResponse.status + " · " + elapsed + " ms", httpResponse.ok);
          showResponse(text.trim() ? highlightXml(text) : escapeHtml(playground.dataset.emptyResponse));
        });
      })
      .catch(function(error) {
        console.log(error);
        showStatus(playground.dataset.networkError, false);
        response.replaceChildren();
      })
      .finally(function() {
        send.disabled = false;
      });
  });
}

// Returns the XML indented and highlighted with the classes of the Rouge syntax highlighter.
// Text which is not well-formed XML is returned as is, only escaped.
function highlightXml(text) {
  const xmlDoc = new DOMParser().parseFromString(text, "application/xml");
  if (xmlDoc.getElementsByTagName("parsererror").length) {
    return escapeHtml(text);
  }

  const declaration = text.trim().match(/^<\?xml[^>]*\?>/);
  const lines = declaration ? ['<span class="cp">' + escapeHtml(declaration[0]) + "</span>"] : [];
  xmlDoc.childNodes.forEach(function(node) {
    formatXmlNode(node, "", lines);
  });
  return lines.join("\n");
}

const XML_INDENT = "   ";

function formatXmlNode(node, indent, lines) {
  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      formatXmlElement(node, indent, lines);
      break;
    case Node.TEXT_NODE:
    case Node.CDATA_SECTION_NODE:
      if (node.textContent.trim()) {
        lines.push(indent + formatXmlText(node));
      }
      break;
    case Node.COMMENT_NODE:
      lines.push(indent + '<span class="c">' + escapeHtml("<!--" + node.data + "-->") + "</span>");
      break;
    case Node.PROCESSING_INSTRUCTION_NODE:
      lines.push(indent + '<span class="cp">' + escapeHtml("<?" + node.target + " " + node.data + "?>") + "</span>");
      break;
  }
}

function formatXmlElement(element, indent, lines) {
  const attributes = Array.from(element.attributes, function(attribute) {
    return ' <span class="na">' + escapeHtml(attribute.name) + "</span>="
      + '<span class="s">"' + escapeHtml(attribute.value) + '"</span>';
  }).join("");
  const openTag = '<span class="nt">&lt;' + escapeHtml(element.tagName) + "</span>" + attributes;
  const closeTag = '<span class="nt">&lt;/' + escapeHtml(element.tagName) + "&gt;</span>";

  const children = Array.from(element.childNodes).filter(function(child) {
    return child.nodeType !== Node.TEXT_NODE || child.textContent.trim();
  });

  if (!children.length) {
    lines.push(indent + openTag + '<span class="nt">/&gt;</span>');
    return;
  }

  const textOnly = children.every(function(child) {
    return child.nodeType === Node.TEXT_NODE || child.nodeType === Node.CDATA_SECTION_NODE;
  });
  if (textOnly) {
    lines.push(indent + openTag + '<span class="nt">&gt;</span>'
      + Array.from(element.childNodes, formatXmlText).join("") + closeTag);
    return;
  }

  lines.push(indent + openTag + '<span class="nt">&gt;</span>');
  children.forEach(function(child) {
    formatXmlNode(child, indent + XML_INDENT, lines);
  });
  lines.push(indent + closeTag);
}

function formatXmlText(node) {
  if (node.nodeType === Node.CDATA_SECTION_NODE) {
    return '<span class="cp">' + escapeHtml("<![CDATA[" + node.data + "]]>") + "</span>";
  }
  // Shows the characters which must be escaped in XML text the way they appear in the source.
  return escapeHtml(node.textContent.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;"));
}

function escapeHtml(text) {
  return text.replace(/[<>&"]/g, function(c) {
    return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c];
  });
}

function registerQuiz() {
  const form = document.getElementById("quiz-form");
  if (!form) {
    return;
  }

  const questions = Array.from(form.querySelectorAll(".quiz-question"));
  const incomplete = form.querySelector(".quiz-incomplete");
  const result = form.querySelector(".quiz-result");
  const check = form.querySelector(".quiz-check");
  const retry = form.querySelector(".quiz-retry");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const answered = questions.every(function(question) {
      return question.querySelector("input:checked");
    });
    incomplete.classList.toggle("d-none", answered);
    if (!answered) {
      return;
    }

    const score = questions.filter(function(question) {
      return markQuizQuestion(question, form.dataset);
    }).length;

    result.textContent = form.dataset.resultTemplate
      .replace("{score}", score)
      .replace("{total}", questions.length);
    result.classList.remove("d-none");
    check.classList.add("d-none");
    retry.classList.remove("d-none");
    result.focus();
  });

  retry.addEventListener("click", function() {
    questions.forEach(clearQuizQuestion);
    form.reset();
    result.classList.add("d-none");
    retry.classList.add("d-none");
    check.classList.remove("d-none");
    questions[0].querySelector("input").focus();
  });
}

// Returns whether the selected answer of the question is correct.
function markQuizQuestion(question, labels) {
  const selected = question.querySelector("input:checked");
  const correct = question.querySelector('input[value="' + question.dataset.correct + '"]');
  const isCorrect = selected === correct;

  question.classList.add(isCorrect ? "quiz-correct" : "quiz-incorrect");
  correct.closest(".form-check").classList.add("quiz-option-correct");
  if (!isCorrect) {
    selected.closest(".form-check").classList.add("quiz-option-incorrect");
  }

  question.querySelector(".quiz-verdict").textContent = isCorrect ? labels.correctLabel : labels.incorrectLabel;
  question.querySelector(".quiz-feedback").classList.remove("d-none");
  question.disabled = true;

  return isCorrect;
}

function clearQuizQuestion(question) {
  question.disabled = false;
  question.classList.remove("quiz-correct", "quiz-incorrect");
  question.querySelector(".quiz-feedback").classList.add("d-none");
  question.querySelectorAll(".form-check").forEach(function(option) {
    option.classList.remove("quiz-option-correct", "quiz-option-incorrect");
  });
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

function setStatus(text, cssClass) {
  setStatusForElement("health-check-badge", text, cssClass);
}

function setStatusForElement(elementId, text, ccsClass) {
  const badge = document.getElementById(elementId);
  badge.innerHTML = text;
  badge.classList.remove("d-none");
  badge.classList.add(ccsClass);
}