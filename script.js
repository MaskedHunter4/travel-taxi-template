const c = SITE_CONFIG;

document.documentElement.style.setProperty("--accent", c.colors.accent);
document.documentElement.style.setProperty("--dark", c.colors.dark);
document.documentElement.style.setProperty("--primary", c.colors.primary);

const $ = id => document.getElementById(id);

/* BRAND */
$("brandName").textContent = c.brandName;
$("brandTagline").textContent = c.tagline;
$("brandMark").innerHTML = c.logoImage
  ? `<img src="${c.logoImage}" alt="${c.brandName} logo">`
  : c.logoText;
$("footerBrand").textContent = c.brandName;
$("year").textContent = new Date().getFullYear();

/* HERO */
$("heroEyebrow").textContent = c.hero.eyebrow;
$("heroTitle").textContent = c.hero.title;
$("heroDescription").textContent = c.hero.description;
$("heroBg").style.backgroundImage = `url("${c.hero.image}")`;
$("aboutImage").src = c.aboutImage;

/* WHATSAPP */
const wa = `https://wa.me/${c.whatsapp}`;
["navWhatsApp", "heroWhatsApp", "faqWhatsApp", "ctaWhatsApp"]
  .forEach(id => $(id).href = wa);

/* CONTACT */
$("phoneText").textContent = c.phone;
$("phoneLink").href = `tel:${c.phone.replace(/\s/g, "")}`;
$("emailText").textContent = c.email;
$("emailLink").href = `mailto:${c.email}`;
$("locationText").textContent = c.location;
$("instagramLink").href = c.instagram;

/* STATS */
$("statsGrid").innerHTML = c.stats
  .map(([n, t]) => `<div class="stat"><strong>${n}</strong><span>${t}</span></div>`)
  .join("");

/* SERVICES */
$("serviceGrid").innerHTML = c.services
  .map(s => `
    <article class="service">
      <div class="service-img" style="background-image:url('${s.image}')"></div>
      <div class="service-body">
        <div class="service-icon">${s.icon}</div>
        <h3>${s.title}</h3>
        <p>${s.text}</p>
        <a href="${wa}" target="_blank" rel="noopener">Enquire ↗</a>
      </div>
    </article>
  `)
  .join("");

/* GALLERY — PREMIUM 3-PHOTO CLEAN WALL */
const galleryGrid = $("galleryGrid");
const galleryPrev = $("galleryPrev");
const galleryNext = $("galleryNext");
const galleryDots = $("galleryDots");

let galleryPage = 0;
const galleryPerPage = 3;
const galleryTotalPages = Math.ceil(c.gallery.length / galleryPerPage);

function renderGallery(animate = false) {
  if (!galleryGrid) return;

  const start = galleryPage * galleryPerPage;
  const visible = c.gallery.slice(start, start + galleryPerPage);

  if (animate) {
    galleryGrid.classList.add("gallery-changing");
  }

  galleryGrid.innerHTML = visible
    .map((img, i) => `
      <figure class="gallery-item">
        <img
          src="${img}"
          alt="Travel gallery image ${start + i + 1}"
          loading="lazy">
      </figure>
    `)
    .join("");

  if (galleryPrev) galleryPrev.disabled = galleryPage === 0;
  if (galleryNext) galleryNext.disabled = galleryPage >= galleryTotalPages - 1;

  if (galleryDots) {
    galleryDots.innerHTML = Array.from({ length: galleryTotalPages }, (_, i) => `
      <button
        class="gallery-dot${i === galleryPage ? " active" : ""}"
        type="button"
        aria-label="Show gallery group ${i + 1}"
        data-gallery-page="${i}">
      </button>
    `).join("");
  }

  if (animate) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => galleryGrid.classList.remove("gallery-changing"));
    });
  }
}

function changeGalleryPage(direction) {
  const nextPage = galleryPage + direction;
  if (nextPage < 0 || nextPage >= galleryTotalPages) return;
  galleryPage = nextPage;
  renderGallery(true);
}

if (galleryPrev) {
  galleryPrev.addEventListener("click", () => changeGalleryPage(-1));
}

if (galleryNext) {
  galleryNext.addEventListener("click", () => changeGalleryPage(1));
}

if (galleryDots) {
  galleryDots.addEventListener("click", event => {
    const button = event.target.closest("[data-gallery-page]");
    if (!button) return;
    galleryPage = Number(button.dataset.galleryPage);
    renderGallery(true);
  });
}

/* Mobile swipe support */
let galleryTouchStartX = 0;
let galleryTouchStartY = 0;

if (galleryGrid) {
  galleryGrid.addEventListener("touchstart", event => {
    const touch = event.changedTouches[0];
    galleryTouchStartX = touch.clientX;
    galleryTouchStartY = touch.clientY;
  }, { passive: true });

  galleryGrid.addEventListener("touchend", event => {
    const touch = event.changedTouches[0];
    const dx = touch.clientX - galleryTouchStartX;
    const dy = touch.clientY - galleryTouchStartY;

    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
    changeGalleryPage(dx < 0 ? 1 : -1);
  }, { passive: true });
}

renderGallery();

/* REVIEWS */
$("reviewGrid").innerHTML = c.testimonials
  .map(([q, n, l]) => `
    <article class="review">
      <p>${q}</p>
      <strong>${n}</strong><br><small>${l}</small>
    </article>
  `)
  .join("");

/* FAQ */
$("faqList").innerHTML = c.faqs
  .map(([q, a], i) => `
    <details ${i === 0 ? "open" : ""}>
      <summary>${q}<span>＋</span></summary>
      <p>${a}</p>
    </details>
  `)
  .join("");

/* MOBILE MENU */
$("menuBtn").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("mobile-open");
});
const mobileStyle = document.createElement("style");
mobileStyle.textContent = `
  .nav-links.mobile-open {
    display: flex;
    position: absolute;
    top: 76px;
    left: 20px;
    right: 20px;
    padding: 20px;
    flex-direction: column;
    background: #10201f;
    border-radius: 14px;
  }
  .nav-links.mobile-open a {
    padding: 7px 0;
  }
`;
document.head.appendChild(mobileStyle);

/* PREMIUM SCROLL REVEAL */
const revealItems = document.querySelectorAll(
  ".section, .service, .review, .why-card, .contact-card, .cta-inner"
);
revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  if (
    item.classList.contains("service") ||
    item.classList.contains("review") ||
    item.classList.contains("why-card")
  ) {
    item.style.transitionDelay = `${(index % 3) * 0.12}s`;
  }
});
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);
revealItems.forEach(item => revealObserver.observe(item));
