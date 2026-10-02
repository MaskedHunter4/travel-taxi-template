const c = SITE_CONFIG;
document.documentElement.style.setProperty("--accent", c.colors.accent);
document.documentElement.style.setProperty("--dark", c.colors.dark);
document.documentElement.style.setProperty("--primary", c.colors.primary);

const $ = id => document.getElementById(id);
$("brandName").textContent = c.brandName;
$("brandTagline").textContent = c.tagline;
$("brandMark").textContent = c.logoText;
$("footerBrand").textContent = c.brandName;
$("year").textContent = new Date().getFullYear();

$("heroEyebrow").textContent = c.hero.eyebrow;
$("heroTitle").textContent = c.hero.title;
$("heroDescription").textContent = c.hero.description;
$("heroBg").style.backgroundImage = `url("${c.hero.image}")`;
$("aboutImage").src = c.gallery[0];

const wa = `https://wa.me/${c.whatsapp}`;
["navWhatsApp","heroWhatsApp","faqWhatsApp","ctaWhatsApp"].forEach(id => $(id).href = wa);

$("phoneText").textContent = c.phone;
$("phoneLink").href = `tel:${c.phone.replace(/\s/g,"")}`;
$("emailText").textContent = c.email;
$("emailLink").href = `mailto:${c.email}`;
$("locationText").textContent = c.location;
$("instagramLink").href = c.instagram;

$("statsGrid").innerHTML = c.stats.map(([n,t]) => `<div class="stat"><strong>${n}</strong><span>${t}</span></div>`).join("");

$("serviceGrid").innerHTML = c.services.map(s => `
  <article class="service">
    <div class="service-img" style="background-image:url('${s.image}')"></div>
    <div class="service-body">
      <div class="service-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
      <a href="${wa}" target="_blank" rel="noopener">Enquire ↗</a>
    </div>
  </article>`).join("");

$("galleryGrid").innerHTML = c.gallery.map((img,i) => `<img src="${img}" alt="Travel gallery image ${i+1}" loading="lazy">`).join("");

$("reviewGrid").innerHTML = c.testimonials.map(([q,n,l]) => `
  <article class="review"><p>${q}</p><strong>${n}</strong><br><small>${l}</small></article>`).join("");

$("faqList").innerHTML = c.faqs.map(([q,a],i) => `
  <details ${i===0 ? "open":""}><summary>${q}<span>＋</span></summary><p>${a}</p></details>`).join("");

$("menuBtn").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("mobile-open");
});

const mobileStyle = document.createElement("style");
mobileStyle.textContent = `.nav-links.mobile-open{display:flex;position:absolute;top:76px;left:20px;right:20px;padding:20px;flex-direction:column;background:#10201f;border-radius:14px}.nav-links.mobile-open a{padding:7px 0}`;
document.head.appendChild(mobileStyle);
