/* =========================================================
   ASEPESH-Mali — Interface
   Bandeau, en-tête à méga-menus et pied de page injectés
   (une seule source), icônes en ligne, carrousel « À la une »,
   bloc d'actions collant, compteurs, parallaxe légère,
   visionneuse de galerie, envoi des formulaires.
   ========================================================= */
(function () {
  "use strict";

  var CFG = window.ASEPESH || {};
  var body = document.body;
  var BASE = body.getAttribute("data-base") || "";      // "" ou "../"
  var PAGE = body.getAttribute("data-page") || "";
  var CALM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Icônes ---------- */
  var S = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  var ICONS = {
    arrow:   S + '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    down:    S + '<polyline points="6 9 12 15 18 9"/></svg>',
    check:   S + '<polyline points="20 6 9 17 4 12"/></svg>',
    heart:   S + '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
    hands:   S + '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7-.9l.5.3a2 2 0 0 0 1.4.2L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>',
    ecoute:  S + '<path d="M21 11.4a8.3 8.3 0 0 1-8.9 8.4 9.5 9.5 0 0 1-3.6-.8L3 21l1.5-4.2A8.1 8.1 0 0 1 3 11.9 8.4 8.4 0 0 1 12.2 3.5 8.3 8.3 0 0 1 21 11.4z"/><path d="M14.7 9.4a1.9 1.9 0 0 0-2.7 0 1.9 1.9 0 0 0-2.7 2.7l2.7 2.7 2.7-2.7a1.9 1.9 0 0 0 0-2.7z"/></svg>',
    shield:  S + '<path d="M12 3l8 3v6c0 4.5-3.2 8.3-8 9-4.8-.7-8-4.5-8-9V6z"/><polyline points="9 12 11 14 15 10"/></svg>',
    gift:    S + '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8"/><line x1="12" y1="8" x2="12" y2="21"/><path d="M12 8S10.5 3 8 3a2.5 2.5 0 0 0 0 5"/><path d="M12 8s1.5-5 4-5a2.5 2.5 0 0 1 0 5"/></svg>',
    users:   S + '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/></svg>',
    megaphone: S + '<path d="M3 11v2a1 1 0 0 0 1 1h3l7 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M18 8a5 5 0 0 1 0 8"/></svg>',
    book:    S + '<path d="M12 6.6S9.6 4.6 3.8 5.1v13.2c5.8-.5 8.2 1.6 8.2 1.6s2.4-2.1 8.2-1.6V5.1C14.4 4.6 12 6.6 12 6.6z"/><line x1="12" y1="6.6" x2="12" y2="19.9"/></svg>',
    compass: S + '<circle cx="12" cy="12" r="9"/><polygon points="15.5 8.5 10.5 10.5 8.5 15.5 13.5 13.5"/></svg>',
    star:    S + '<polygon points="12 3 14.8 9.1 21.5 9.9 16.6 14.5 17.9 21.1 12 17.8 6.1 21.1 7.4 14.5 2.5 9.9 9.2 9.1"/></svg>',
    pin:     S + '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    phone:   S + '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
    mail:    S + '<rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2.5 6.5 12 13 21.5 6.5"/></svg>',
    clock:   S + '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/></svg>',
    file:    S + '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><polyline points="14 3 14 8 19 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>',
    menu:    S + '<line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>',
    close:   S + '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>',
    up:      S + '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
    left:    S + '<polyline points="15 5 8 12 15 19"/></svg>',
    right:   S + '<polyline points="9 5 16 12 9 19"/></svg>',
    facebook: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>',
    whatsapp: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1s-.5-.1-.7.2-.7 1-.9 1.2-.4.2-.7 0a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6.3-.5v-.5l-1-2.3c-.2-.6-.5-.5-.7-.5H7.7a1.2 1.2 0 0 0-.9.4A3.6 3.6 0 0 0 5.7 9c0 1.6 1.1 3.1 1.3 3.3a12.4 12.4 0 0 0 4.8 4.2c.7.3 1.2.5 1.6.6a3.9 3.9 0 0 0 1.8.1 3 3 0 0 0 2-1.4 2.4 2.4 0 0 0 .2-1.4zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>'
  };

  function icon(name) { return ICONS[name] || ""; }

  // Les deux numéros, chacun avec son lien d'appel
  function telLinks() {
    var html = '<a href="tel:' + CFG.telLien + '">' + CFG.tel + "</a>";
    if (CFG.tel2) html += ' / <a href="tel:' + CFG.telLien2 + '">' + CFG.tel2 + "</a>";
    return html;
  }

  // Remplit tous les <span data-icon="…">
  function paintIcons(root) {
    (root || document).querySelectorAll("[data-icon]").forEach(function (el) {
      if (!el.firstElementChild) el.innerHTML = icon(el.getAttribute("data-icon"));
    });
  }

  // Ajoute la pastille fléchée aux boutons (data-btn-icon pour changer d'icône)
  function buttons() {
    document.querySelectorAll(".btn").forEach(function (b) {
      if (b.querySelector(".ico")) return;
      var s = document.createElement("span");
      s.className = "ico";
      s.innerHTML = icon(b.getAttribute("data-btn-icon") || "arrow");
      b.appendChild(s);
    });
    document.querySelectorAll(".more").forEach(function (a) {
      if (!a.querySelector("svg")) a.insertAdjacentHTML("beforeend", icon("arrow"));
    });
  }

  /* ---------- Liens utilitaires ---------- */
  function waLink(key) {
    var msg = (window.ASEPESH_WA || {})[key] || (window.ASEPESH_WA || {}).general || "";
    return "https://wa.me/" + String(CFG.telLien || "").replace(/[^0-9]/g, "") +
           "?text=" + encodeURIComponent(msg);
  }

  /* ---------- Navigation ---------- */
  var NAV = [
    { id: "association", href: "association.html", txt: "L'association",
      intro: "Une association née des parents, pour les parents.",
      img: "assets/img/photo-01.jpg",
      links: [
        ["association.html#histoire",     "Notre histoire"],
        ["association.html#objectif",     "Notre objectif"],
        ["association.html#organes",      "Gouvernance"],
        ["association.html#organigramme", "Organigramme"],
        ["association.html#ressources",   "Transparence et gestion"]
      ] },
    { id: "actions", href: "actions.html", txt: "Nos actions",
      intro: "Écouter, accompagner, informer, défendre.",
      img: "assets/img/photo-04.jpg",
      links: [
        ["actions.html#parole",         "Groupes de parole"],
        ["actions.html#ecoute",         "Sensibilisation et information"],
        ["actions.html#accompagnement", "Accompagnement des familles"],
        ["actions.html#plaidoyer",      "Plaidoyer"],
        ["actions.html#missions",       "Missions et partenariats"]
      ] },
    { id: "galerie", href: "galerie.html", txt: "Galerie" },
    { id: "adherer", href: "adherer.html", txt: "S'impliquer",
      intro: "Parent, membre, donateur, bénévole ou partenaire : il y a une place pour vous.",
      img: "assets/img/photo-08.jpg",
      links: [
        ["adherer.html#parent",      "Je suis parent"],
        ["adherer.html#adhesion",    "Devenir membre"],
        ["adherer.html#don",         "Faire un don"],
        ["adherer.html#benevolat",   "Bénévolat et stages"],
        ["adherer.html#partenariat", "Devenir partenaire"]
      ] },
    { id: "contact", href: "contact.html", txt: "Contact" }
  ];

  function buildHeader() {
    var host = document.getElementById("siteHeader");
    if (!host) return;

    // Bandeau supérieur : devise et accès rapides
    var top = document.createElement("div");
    top.className = "topbar";
    top.innerHTML =
      '<div class="container">' +
        '<span class="topbar-tag">« ' + CFG.slogan + " »</span>" +
        '<div class="topbar-links">' +
          '<a href="tel:' + CFG.telLien + '">' + icon("phone") + "<span>" + CFG.tel + "</span></a>" +
          '<a href="' + waLink("general") + '" target="_blank" rel="noopener">' + icon("whatsapp") + "<span>WhatsApp</span></a>" +
          (CFG.facebook ? '<a href="' + CFG.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + icon("facebook") + "</a>" : "") +
        "</div>" +
      "</div>";
    host.parentNode.insertBefore(top, host);

    var items = NAV.map(function (n, i) {
      var active = n.id === PAGE ? " is-active" : "";
      if (!n.links) {
        return '<li class="nav-item"><a class="nav-link' + active + '" href="' + BASE + n.href + '"' +
               (active ? ' aria-current="page"' : "") + ">" + n.txt + "</a></li>";
      }
      return '<li class="nav-item has-mega">' +
        '<button class="nav-link' + active + '" type="button" aria-expanded="false" aria-controls="mega-' + i + '">' +
          n.txt + icon("down") +
        "</button>" +
        '<div class="mega" id="mega-' + i + '">' +
          '<div class="container mega-inner">' +
            '<div class="mega-intro"><h3>' + n.txt + "</h3><p>" + n.intro + "</p>" +
              '<a class="more mt-3" href="' + BASE + n.href + '">Voir la page</a></div>' +
            '<div class="mega-links">' +
              n.links.map(function (l) {
                return '<a href="' + BASE + l[0] + '"><span>' + l[1] + "</span>" + icon("arrow") + "</a>";
              }).join("") +
            "</div>" +
            '<div class="mega-media"><img src="' + BASE + n.img + '" alt="" loading="lazy"></div>' +
          "</div>" +
        "</div>" +
      "</li>";
    }).join("");

    host.innerHTML =
      '<div class="container nav-wrap">' +
        '<a class="brand" href="' + BASE + 'index.html" aria-label="ASEPESH-Mali, accueil">' +
          '<img src="' + BASE + 'assets/logo/logo-mark.png" alt="">' +
          '<span class="brand-txt"><b>ASEPESH</b><span>MALI</span></span>' +
        "</a>" +
        '<nav class="nav" id="mainNav" aria-label="Navigation principale">' +
          '<ul class="nav-list">' + items +
            '<li class="nav-cta-mobile"><a class="btn btn--block" href="' + BASE + 'adherer.html#adhesion">Adhérer à l\'association</a></li>' +
          "</ul>" +
        "</nav>" +
        '<div class="nav-actions">' +
          '<a class="btn btn--sm" href="' + BASE + 'adherer.html#adhesion">Adhérer</a>' +
        "</div>" +
        '<button class="nav-toggle" id="navToggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mainNav">' +
          icon("menu") +
        "</button>" +
      "</div>";

    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    var wide = window.matchMedia("(min-width: 1025px)");
    var megas = Array.prototype.slice.call(host.querySelectorAll(".has-mega"));
    var timer = null;

    function setOpen(item, open) {
      item.classList.toggle("is-open", open);
      item.querySelector(".nav-link").setAttribute("aria-expanded", String(open));
    }
    function closeAll(except) {
      megas.forEach(function (m) { if (m !== except) setOpen(m, false); });
    }

    megas.forEach(function (item) {
      var btn = item.querySelector(".nav-link");
      btn.addEventListener("click", function () {
        var open = !item.classList.contains("is-open");
        closeAll(item);
        setOpen(item, open);
      });
      // Au survol sur grand écran, avec un petit délai pour ne pas clignoter
      item.addEventListener("mouseenter", function () {
        if (!wide.matches) return;
        clearTimeout(timer);
        closeAll(item);
        setOpen(item, true);
      });
      item.addEventListener("mouseleave", function () {
        if (!wide.matches) return;
        timer = setTimeout(function () { setOpen(item, false); }, 160);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll();
    });
    document.addEventListener("click", function (e) {
      if (wide.matches && !host.contains(e.target)) closeAll();
    });

    function setMenu(open) {
      nav.classList.toggle("is-open", open);
      if (open) nav.style.top = host.getBoundingClientRect().bottom + "px";
      body.style.overflow = open ? "hidden" : "";
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      toggle.innerHTML = icon(open ? "close" : "menu");
    }
    toggle.addEventListener("click", function () { setMenu(!nav.classList.contains("is-open")); });
    // Un lien d'ancre dans le menu mobile referme le menu
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && !wide.matches) setMenu(false);
    });
    wide.addEventListener("change", function () { setMenu(false); closeAll(); nav.style.top = ""; });
  }

  /* ---------- Pied de page ---------- */
  function buildFooter() {
    var host = document.getElementById("siteFooter");
    if (!host) return;

    var social = "";
    if (CFG.facebook) social += '<a href="' + CFG.facebook + '" aria-label="Facebook" target="_blank" rel="noopener">' + icon("facebook") + "</a>";
    social += '<a href="' + waLink("general") + '" aria-label="WhatsApp" target="_blank" rel="noopener">' + icon("whatsapp") + "</a>";
    social += '<a href="mailto:' + CFG.email + '" aria-label="E-mail">' + icon("mail") + "</a>";

    function col(title, links) {
      return "<div><h4>" + title + '</h4><ul class="footer-links">' +
        links.map(function (l) {
          return '<li><a href="' + BASE + l[0] + '"' + (l[2] ? ' target="_blank" rel="noopener"' : "") + ">" + l[1] + "</a></li>";
        }).join("") + "</ul></div>";
    }

    host.innerHTML =
      '<div class="container on-dark">' +
        '<div class="footer-top">' +
          "<h2>Aucun parent seul, aucun enfant oublié.</h2>" +
          "<div>" +
            "<p>Rejoignez la communauté des familles, des membres et des bénévoles de l'ASEPESH-Mali. " +
            "Une question, une situation à confier ? Nous répondons à chaque message.</p>" +
            '<div class="btn-row">' +
              '<a class="btn btn--wa" data-btn-icon="whatsapp" href="' + waLink("general") + '" target="_blank" rel="noopener">Nous écrire sur WhatsApp</a>' +
              '<a class="btn btn--line" href="' + BASE + 'adherer.html#adhesion">Devenir membre</a>' +
            "</div>" +
          "</div>" +
        "</div>" +

        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<img src="' + BASE + 'assets/logo/logo-mark.png" alt="Logo ASEPESH-Mali">' +
            "<p>" + CFG.nomLong + ".</p>" +
          "</div>" +
          col("L'association", [
            ["association.html#histoire", "Notre histoire"],
            ["association.html#organes", "Gouvernance"],
            ["actions.html", "Nos actions"],
            ["galerie.html", "Galerie"],
            ["docs/manuel-asepesh-mali.pdf", "Manuel de procédures (PDF)", true]
          ]) +
          col("S'impliquer", [
            ["adherer.html#parent", "Je suis parent"],
            ["adherer.html#adhesion", "Devenir membre"],
            ["adherer.html#don", "Faire un don"],
            ["adherer.html#benevolat", "Bénévolat"],
            ["adherer.html#partenariat", "Partenariat"]
          ]) +
          "<div>" +
            "<h4>Siège — Bamako</h4>" +
            '<ul class="footer-office">' +
              "<li>" + icon("pin") + "<span>" + CFG.adresse + "</span></li>" +
              "<li>" + icon("phone") + "<span>" + telLinks() + "</span></li>" +
              "<li>" + icon("mail") + '<a href="mailto:' + CFG.email + '">' + CFG.email + "</a></li>" +
              "<li>" + icon("clock") + "<span>" + CFG.horaires + "</span></li>" +
            "</ul>" +
          "</div>" +
        "</div>" +

        '<div class="footer-bottom">' +
          '<div class="social">' + social + "</div>" +
          "<span>© " + new Date().getFullYear() + " " + CFG.nom + " · Association créée le " + CFG.creation + "</span>" +
          "<span>" + CFG.recepisse + "</span>" +
        "</div>" +
      "</div>";
  }

  /* ---------- Boutons flottants ---------- */
  function buildFloats() {
    var wa = document.createElement("a");
    wa.className = "wa-float";
    wa.href = waLink(body.getAttribute("data-wa") || "general");
    wa.target = "_blank";
    wa.rel = "noopener";
    wa.setAttribute("aria-label", "Écrire sur WhatsApp");
    wa.innerHTML = icon("whatsapp");
    body.appendChild(wa);

    var top = document.createElement("button");
    top.className = "to-top";
    top.type = "button";
    top.setAttribute("aria-label", "Revenir en haut de page");
    top.innerHTML = icon("up");
    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    body.appendChild(top);

    window.addEventListener("scroll", function () {
      top.classList.toggle("is-on", window.scrollY > 600);
    }, { passive: true });
  }

  /* ---------- Apparition au défilement ---------- */
  function reveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (!e.isIntersecting) return;
        var el = e.target;
        setTimeout(function () { el.classList.add("is-in"); }, Math.min(i, 5) * 90);
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Parallaxe légère des grandes images ---------- */
  function parallax() {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
    if (!els.length || CALM) return;
    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      els.forEach(function (img) {
        var r = img.parentNode.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var p = (r.top + r.height / 2 - vh / 2) / vh;      // -1 … 1 environ
        img.style.transform = "translate3d(0," + (p * -10).toFixed(2) + "%,0)";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Carrousel « À la une » ---------- */
  function slider() {
    document.querySelectorAll("[data-slider]").forEach(function (root) {
      var slides = root.querySelectorAll(".feature-slide");
      var pics = root.querySelectorAll(".feature-media img");
      var count = root.querySelector(".feature-count b");
      var bar = root.querySelector(".feature-bar span");
      var n = slides.length, idx = 0, timer = null, DUR = 7000;
      if (!n) return;

      function go(i) {
        idx = (i + n) % n;
        slides.forEach(function (s, k) {
          s.classList.toggle("is-on", k === idx);
          s.setAttribute("aria-hidden", String(k !== idx));
        });
        pics.forEach(function (p, k) { p.classList.toggle("is-on", k === idx); });
        if (count) count.textContent = String(idx + 1).padStart(2, "0");
        if (bar && !CALM) {
          bar.style.transition = "none";
          bar.style.transform = "scaleX(0)";
          void bar.offsetWidth;
          bar.style.transition = "transform " + DUR + "ms linear";
          bar.style.transform = "scaleX(1)";
        }
        clearTimeout(timer);
        if (!CALM) timer = setTimeout(function () { go(idx + 1); }, DUR);
      }
      root.querySelector("[data-prev]").addEventListener("click", function () { go(idx - 1); });
      root.querySelector("[data-next]").addEventListener("click", function () { go(idx + 1); });
      go(0);
    });
  }

  /* ---------- Bloc collant « Ce que nous faisons » ---------- */
  function axes() {
    var root = document.querySelector("[data-axes]");
    if (!root || !("IntersectionObserver" in window)) return;
    var items = root.querySelectorAll(".axis");
    var pics = root.querySelectorAll(".axes-frame img");
    var tabs = root.querySelectorAll(".axes-nav a");

    function set(i) {
      pics.forEach(function (p, k) { p.classList.toggle("is-on", k === i); });
      tabs.forEach(function (t, k) {
        t.classList.toggle("is-on", k === i);
        t.classList.toggle("is-done", k < i);
      });
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) set(Array.prototype.indexOf.call(items, e.target));
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    items.forEach(function (it) { io.observe(it); });
    set(0);
  }

  /* ---------- Compteurs ---------- */
  function counters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    function run(el) {
      var end = parseInt(el.getAttribute("data-count"), 10);
      var from = parseInt(el.getAttribute("data-from") || "0", 10);
      if (CALM) { el.textContent = end; return; }
      var t0 = null, D = 1600;
      function step(t) {
        if (!t0) t0 = t;
        var k = Math.min(1, (t - t0) / D);
        var e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(from + (end - from) * e);
        if (k < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        run(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: .6 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Où nous agissons : défilement des lieux ---------- */
  function places() {
    var root = document.querySelector("[data-places]");
    if (!root) return;
    var items = root.querySelectorAll(".place");
    var idx = 0, timer = null, DUR = 3500;
    function set(i) {
      items.forEach(function (p, k) { p.classList.toggle("is-on", k === i); });
      idx = i;
      clearTimeout(timer);
      if (!CALM) timer = setTimeout(function () { set((idx + 1) % items.length); }, DUR);
    }
    items.forEach(function (p, k) {
      p.addEventListener("mouseenter", function () { set(k); });
    });
    set(0);
  }

  /* ---------- Visionneuse de galerie ---------- */
  function lightbox() {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
    if (!items.length) return;

    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Photo en grand");
    box.innerHTML =
      '<button class="lb-btn lb-close" type="button" aria-label="Fermer">' + icon("close") + "</button>" +
      '<button class="lb-btn lb-prev" type="button" aria-label="Photo précédente">' + icon("left") + "</button>" +
      '<button class="lb-btn lb-next" type="button" aria-label="Photo suivante">' + icon("right") + "</button>" +
      "<figure><img alt=\"\"><figcaption></figcaption></figure>";
    body.appendChild(box);

    var img = box.querySelector("img");
    var cap = box.querySelector("figcaption");
    var idx = 0, opener = null;

    function show(i) {
      idx = (i + items.length) % items.length;
      var src = items[idx].getAttribute("data-lightbox");
      var txt = items[idx].getAttribute("data-caption") || "";
      img.src = src;
      img.alt = txt || "Photo de l'association";
      cap.textContent = txt;
    }
    function open(i, from) {
      opener = from;
      show(i);
      box.classList.add("is-open");
      body.style.overflow = "hidden";
      box.querySelector(".lb-close").focus();
    }
    function close() {
      box.classList.remove("is-open");
      body.style.overflow = "";
      if (opener) opener.focus();
    }

    items.forEach(function (el, i) {
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "button");
      el.addEventListener("click", function (ev) { ev.preventDefault(); open(i, el); });
      el.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); open(i, el); }
      });
    });
    box.querySelector(".lb-close").addEventListener("click", close);
    box.querySelector(".lb-prev").addEventListener("click", function () { show(idx - 1); });
    box.querySelector(".lb-next").addEventListener("click", function () { show(idx + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---------- Formulaires ---------- */
  /* Le site est statique : aucune donnée n'est envoyée à un serveur.
     Le formulaire compose un message et ouvre WhatsApp ou la
     messagerie du visiteur. Pour un envoi automatique, brancher
     ici un service (Formspree, Google Forms, API…). */
  function forms() {
    document.querySelectorAll("form[data-form]").forEach(function (form) {
      form.setAttribute("novalidate", "");

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var ok = true;
        form.querySelectorAll("[required]").forEach(function (f) {
          var wrap = f.closest(".field") || f.closest(".field-full");
          var bad = !String(f.value || "").trim() ||
                    (f.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(f.value));
          if (wrap) wrap.classList.toggle("has-error", bad);
          f.setAttribute("aria-invalid", String(bad));
          if (bad && ok) { f.focus(); ok = false; }
        });
        if (!ok) return;

        // Composition du message
        var lignes = [];
        var titre = form.getAttribute("data-form");
        form.querySelectorAll("input, select, textarea").forEach(function (f) {
          if (!f.name || f.type === "submit") return;
          if ((f.type === "checkbox" || f.type === "radio") && !f.checked) return;
          var lab = form.querySelector('label[for="' + f.id + '"]');
          var nom = f.getAttribute("data-label") || (lab ? lab.textContent.replace("*", "").trim() : f.name);
          var val = String(f.value || "").trim();
          if (val) lignes.push(nom + " : " + val);
        });

        var texte = "[" + titre + "]\n" + lignes.join("\n");
        var voie = form.getAttribute("data-envoi") || "whatsapp";
        var url = voie === "email"
          ? "mailto:" + CFG.email + "?subject=" + encodeURIComponent(titre + " — site ASEPESH-Mali") +
            "&body=" + encodeURIComponent(texte)
          : "https://wa.me/" + String(CFG.telLien || "").replace(/[^0-9]/g, "") +
            "?text=" + encodeURIComponent(texte);

        window.open(url, voie === "email" ? "_self" : "_blank", "noopener");

        var ok2 = form.querySelector(".form-ok");
        if (ok2) ok2.classList.add("is-on");
      });

      // On efface l'erreur dès que le visiteur corrige
      form.addEventListener("input", function (e) {
        var wrap = e.target.closest(".field");
        if (wrap) { wrap.classList.remove("has-error"); e.target.removeAttribute("aria-invalid"); }
      });
    });
  }

  /* ---------- Remplissage des textes issus de la configuration ---------- */
  function fillConfig() {
    document.querySelectorAll("[data-cfg]").forEach(function (el) {
      var v = CFG[el.getAttribute("data-cfg")];
      if (v) el.textContent = v;
    });
    document.querySelectorAll("[data-tel]").forEach(function (el) { el.href = "tel:" + CFG.telLien; });
    document.querySelectorAll("[data-tels]").forEach(function (el) { el.innerHTML = telLinks(); });
    document.querySelectorAll("[data-mail]").forEach(function (el) { el.href = "mailto:" + CFG.email; });
    document.querySelectorAll("[data-wa-link]").forEach(function (el) {
      el.href = waLink(el.getAttribute("data-wa-link") || "general");
      el.target = "_blank"; el.rel = "noopener";
    });
    // Sujet pré-rempli depuis l'URL : contact.html?sujet=Adhésion
    var sujet = new URLSearchParams(location.search).get("sujet");
    if (sujet) {
      var champ = document.getElementById("sujet");
      if (champ) champ.value = sujet;
    }
  }

  /* ---------- Démarrage ---------- */
  function init() {
    buildHeader();
    buildFooter();
    buildFloats();
    fillConfig();
    buttons();
    paintIcons();
    reveal();
    parallax();
    slider();
    axes();
    counters();
    places();
    lightbox();
    forms();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
