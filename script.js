/* YouTube Modify — launch site interactions */

(function () {
  "use strict";

  /* ---------- Intro animation ---------- */
  var intro = document.getElementById("intro");
  var closing = false;

  function closeIntro() {
    if (closing || !intro) return;
    closing = true;
    intro.classList.add("is-closing");
    setTimeout(function () {
      intro.style.display = "none";
      document.body.classList.remove("lock");
    }, 850);
  }

  if (intro) {
    /* credit fades in at 4.1s (.7s fade) — hold 2s after it appears, then open the site */
    setTimeout(closeIntro, 6800);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeIntro();
    });
  } else {
    document.body.classList.remove("lock");
  }

  /* ---------- Sticky nav ---------- */
  var nav = document.getElementById("nav");

  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle("is-stuck", y > 20);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("burger");
  var links = document.getElementById("links");
  if (burger && links) {
    function setMenu(open) {
      links.classList.toggle("open", open);
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-label", open ? "Close menu" : "Menu");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    }
    setMenu(false);
    burger.addEventListener("click", function () {
      setMenu(!links.classList.contains("open"));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) setMenu(false);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Customization switches ---------- */
  var switches = document.querySelectorAll("#switches .sw");
  var countEl = document.getElementById("switchCount");

  function refreshCount() {
    if (!countEl) return;
    var on = document.querySelectorAll("#switches .sw.is-on").length;
    countEl.textContent = on;
  }

  switches.forEach(function (sw) {
    sw.addEventListener("click", function () {
      var on = sw.classList.toggle("is-on");
      sw.setAttribute("aria-pressed", on ? "true" : "false");
      refreshCount();
    });
  });
  refreshCount();

  /* ---------- Accent color swatches ---------- */
  var swatches = document.querySelectorAll(".swatch");
  var root = document.documentElement;

  var ACCENTS = {
    red:    ["#ff1f3d", "#8f2bff"],
    purple: ["#8f2bff", "#ff1f3d"],
    both:   ["#ff1f3d", "#8f2bff"]
  };

  swatches.forEach(function (s) {
    s.addEventListener("click", function () {
      swatches.forEach(function (x) { x.classList.remove("is-on"); });
      s.classList.add("is-on");

      var mode = s.getAttribute("data-accent");
      var pair = ACCENTS[mode] || ACCENTS.red;
      root.style.setProperty("--accent", pair[0]);
      root.style.setProperty("--accent2", pair[1]);

      if (mode === "both") {
        document.querySelectorAll(".hl-red").forEach(function () {});
      }
    });
  });

  /* ---------- Downloader quality chips ---------- */
  document.querySelectorAll(".dl-opts .opt").forEach(function (opt) {
    opt.addEventListener("click", function () {
      document.querySelectorAll(".dl-opts .opt").forEach(function (o) {
        o.classList.remove("is-on");
      });
      opt.classList.add("is-on");
    });
  });

  /* ---------- FAQ: close others when one opens ---------- */
  var faqItems = document.querySelectorAll(".faq details");
  faqItems.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) {
        faqItems.forEach(function (o) {
          if (o !== d) o.open = false;
        });
      }
    });
  });
})();
