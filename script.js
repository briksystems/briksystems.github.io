(function () {
  // WhatsApp de BrikSystems: +57 311 682 4142
  var WHATSAPP_NUMBER = "573116824142";

  function waUrl(text) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
  }

  /* ---------- Todos los botones con data-wa abren WhatsApp con su mensaje ---------- */
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = waUrl(a.getAttribute("data-wa"));
    a.target = "_blank";
    a.rel = "noopener";
  });

  /* ---------- Ventanas: 3 ventanas, cada una con 2 secciones que se recorren con scroll ---------- */
  var WINDOWS = ["ventana-inicio", "ventana-servicios", "ventana-nosotros"];
  var SECTION_WINDOW = { inicio: 0, proyectos: 0, servicios: 1, precios: 1, nosotros: 2, contacto: 2 };
  var wins = WINDOWS.map(function (id) {
    var el = document.getElementById(id);
    el.setAttribute("tabindex", "-1");
    return el;
  });
  var links = document.querySelectorAll("[data-spy]");
  var currentWin = null;
  var currentId = null;

  function setActiveLink(id) {
    currentId = id;
    links.forEach(function (a) {
      a.setAttribute("aria-current", a.getAttribute("data-spy") === id ? "true" : "false");
    });
  }

  function show(id, options) {
    options = options || {};
    if (!(id in SECTION_WINDOW)) id = "inicio";
    var idx = SECTION_WINDOW[id];
    var changed = idx !== currentWin;
    var win = wins[idx];
    if (changed) {
      var dir = currentWin === null || idx >= currentWin ? 1 : -1;
      wins.forEach(function (w, i) { w.classList.toggle("is-active", i === idx); });
      win.style.setProperty("--dir", dir);
      currentWin = idx;
    }
    var target = document.getElementById(id);
    var top = target.offsetTop;
    if (changed || options.instant) win.scrollTop = top;
    else win.scrollTo({ top: top, behavior: "smooth" });
    setActiveLink(id);
    if (options.push) history.pushState(null, "", "#" + id);
    if (options.focus && changed) win.focus({ preventScroll: true });
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href").slice(1);
    if (!(id in SECTION_WINDOW)) return;
    e.preventDefault();
    show(id, { push: true, focus: true });
  });

  window.addEventListener("popstate", function () {
    show(location.hash.slice(1) || "inicio", { focus: true });
  });

  var WIN_TARGET = ["inicio", "servicios", "nosotros"];
  document.addEventListener("keydown", function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    var tag = (document.activeElement && document.activeElement.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    var next = currentWin + (e.key === "ArrowRight" ? 1 : -1);
    if (next < 0 || next >= WIN_TARGET.length) return;
    e.preventDefault();
    show(WIN_TARGET[next], { push: true, focus: true });
  });

  // Resaltar en el menú la sección que se ve dentro de la ventana
  if ("IntersectionObserver" in window) {
    wins.forEach(function (win) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && win.classList.contains("is-active")) setActiveLink(en.target.id);
        });
      }, { root: win, rootMargin: "-45% 0px -50% 0px" });
      win.querySelectorAll(".block").forEach(function (b) { io.observe(b); });
    });
  }

  show(location.hash.slice(1) || "inicio", { instant: true });

  /* ---------- Formulario: arma un mensaje natural y abre WhatsApp ---------- */
  var form = document.getElementById("contact-form");
  var sent = document.getElementById("sent");
  var sentLink = document.getElementById("sent-link");
  var required = ["nombre", "negocio", "necesidad"];
  var messages = {
    nombre: "Escribe tu nombre para saber a quién responder.",
    negocio: "Escribe el nombre de tu negocio.",
    necesidad: "Elige qué necesitas, aunque sea aproximado."
  };
  var needs = {
    "Una página web nueva": "Quiero una página web nueva para mi negocio.",
    "Mejorar mi página actual": "Quiero mejorar la página que ya tengo.",
    "Una tienda en línea": "Quiero montar una tienda en línea.",
    "Una landing page para una campaña": "Necesito una landing page para una campaña.",
    "Todavía no sé, quiero hablar": "Todavía no tengo claro qué necesito y me gustaría que me orienten."
  };

  function setError(name, text) {
    var wrap = form.querySelector('[data-field="' + name + '"]');
    var err = document.getElementById(name + "-error");
    var input = document.getElementById(name);
    wrap.setAttribute("data-invalid", text ? "true" : "false");
    input.setAttribute("aria-invalid", text ? "true" : "false");
    err.textContent = text || "";
  }
  function check(name) {
    var ok = document.getElementById(name).value.trim() !== "";
    setError(name, ok ? "" : messages[name]);
    return ok;
  }
  required.forEach(function (name) {
    var el = document.getElementById(name);
    el.addEventListener("blur", function () { check(name); });
    el.addEventListener("input", function () {
      if (el.getAttribute("aria-invalid") === "true") check(name);
    });
  });

  function withPeriod(text) {
    return /[.!?]$/.test(text) ? text : text + ".";
  }

  function buildMessage() {
    var v = function (id) { return document.getElementById(id).value.trim(); };
    var parts = [
      "Hola, buenas. Soy " + v("nombre") + " y tengo un negocio que se llama " + v("negocio") + ".",
      needs[v("necesidad")] || withPeriod(v("necesidad"))
    ];
    if (v("detalle")) parts.push("Les cuento un poco más: " + withPeriod(v("detalle")));
    parts.push("¿Podemos hablar para ver cómo lo hacemos? Muchas gracias.");
    return parts.join(" ");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var valid = required.map(check).every(Boolean);
    if (!valid) {
      var first = required.filter(function (n) { return !document.getElementById(n).value.trim(); })[0];
      if (first) document.getElementById(first).focus();
      return;
    }
    var url = waUrl(buildMessage());
    sentLink.href = url;
    sent.hidden = false;
    var win = window.open(url, "_blank", "noopener");
    if (!win) sentLink.focus();
  });
})();
