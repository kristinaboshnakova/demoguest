/* =========================================================
   1) HEADER SCROLL BEHAVIOR
   ========================================================= */

 const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});


/* =========================================================
   2) MOBILE MENU TOGGLE
   ========================================================= */

const menuBtn = document.querySelector(".menu");
const navMobile = document.querySelector(".nav-mobile");

function toggleMenu() {
  menuBtn.classList.toggle("active");
  navMobile.classList.toggle("active");
} 

menuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleMenu();
});

// close menu on nav links
document.querySelectorAll(".nav-mobile a").forEach(link => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    navMobile.classList.remove("active");
  });
});

// close if resized to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    menuBtn.classList.remove("active");
    navMobile.classList.remove("active");
  }
});


/* =========================================================
   3) BANNER SLIDE NAVIGATION
   ========================================================= */

const slideButtons = document.querySelectorAll(".slide-btn");
const slides = document.querySelectorAll(".bg-slide");

function activateSlide(targetClass) {
  slides.forEach(slide => {
    slide.classList.toggle("active", slide.classList.contains(targetClass));
  });
}

slideButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    slideButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    activateSlide(btn.getAttribute("data-target"));
  });
});


/* =========================================================
   4) FADE-UP ANIMATIONS
   ========================================================= */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.18 });

document.querySelectorAll(".section").forEach(sec => observer.observe(sec));


/* =========================================================
   5) SCROLL-TO-TOP BUTTON
   ========================================================= */

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  const aboutSection = document.getElementById("about");
  if (!aboutSection) return;

  const triggerPoint = aboutSection.offsetTop - 200;

  if (window.scrollY > triggerPoint) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* =========================================================
   6) STICKY CALL
   ========================================================= */

const stickyCall = document.querySelector(".sticky-call");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const current = window.scrollY;

  if (stickyCall) {
    stickyCall.style.opacity = current > lastScroll ? "0.85" : "1";
  }

  lastScroll = current;
});


/* =========================================================
   7) SERVICES MODAL
   ========================================================= */

(function () {
  const serviceModal = document.getElementById("serviceModal");
  const titleEl = document.getElementById("serviceModalTitle");
  const descEl = document.getElementById("serviceModalDesc");
  const imgEl = document.getElementById("serviceModalImg");
  const badgesWrap = document.getElementById("serviceBadges");
  const toContactBtn = document.getElementById("serviceToContactBtn");

  let lastTitle = "";

  document.addEventListener("click", (e) => {
    const item = e.target.closest(".amenity");
    if (!item) return;

    const title = item.dataset.title || "Услуга";
    const desc = item.dataset.desc || "";
    const img = item.dataset.img || "";
    const included = (item.dataset.included || "yes").toLowerCase() === "yes";
    const price = item.dataset.price || "";

    titleEl.textContent = title;
    descEl.textContent = desc;
    imgEl.src = img;

    badgesWrap.innerHTML = "";

    const chipIncluded = document.createElement("div");
    chipIncluded.className = "badge-chip " + (included ? "included" : "extra");
    chipIncluded.textContent = included ? "Включено" : "Доплащане";
    badgesWrap.appendChild(chipIncluded);

    if (!included && price) {
      const chipPrice = document.createElement("div");
      chipPrice.className = "badge-chip extra";
      chipPrice.textContent = price;
      badgesWrap.appendChild(chipPrice);
    }

    lastTitle = title;
  });

  toContactBtn.addEventListener("click", () => {
    const modal = bootstrap.Modal.getOrCreateInstance(serviceModal);
    modal.hide();

    const contactModal = document.getElementById("contactModal");
    if (!contactModal) return;

    const cm = new bootstrap.Modal(contactModal);
    cm.show();

    const textarea = contactModal.querySelector("textarea");
    if (textarea) {
      const added = `Интересувам се от услуга: ${lastTitle}`;
      textarea.value = textarea.value
        ? textarea.value + "\n" + added
        : added;
    }
  });
})();


/* =========================================================
   8) PREVENT ANCHOR CONFLICTS (BURGER FIX)
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    // Critical fix:
    if (e.target.closest(".menu")) return;

    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.querySelectorAll(".lang-option").forEach(opt => {
  opt.addEventListener("click", () => {
    
    const lang = opt.dataset.lang;
    const flagSrc = opt.querySelector("img").getAttribute("src");

    // Change icon in all triggers
    document.querySelectorAll(".lang-flag-trigger img").forEach(flag => {
      flag.src = flagSrc;
    });

    // Redirect with language parameter
    window.location.search = "?lang=" + lang;
  });
});

/* =========================================================
   END OF FILE ✔
   ========================================================= */
   document.querySelectorAll(".langSwitch").forEach(btn => {
    btn.addEventListener("click", () => {
      const flag = btn.querySelector(".flagIcon");
  
      if (flag.alt === "EN") {
        window.location.href = "index-en.html";
      } else {
        window.location.href = "index.html";
      }
    });
  });
  