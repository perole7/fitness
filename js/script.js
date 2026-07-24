// ============================================================
// RAÍZ — Recetario Real — interactions
// ============================================================

// ---------- Recetas destacadas (ficha grid) ----------
const RECIPES = [
  { num: "01", name: "Tortilla de claras, espinaca y champiñones", kcal: "180", prot: "24g", image: "assets/recipe-01.jpg" },
  { num: "06", name: "Ensalada de pollo, quinoa y vegetales asados", kcal: "380", prot: "34g", image: "assets/recipe-06.jpg" },
  { num: "11", name: "Pechuga de pollo al horno con vegetales", kcal: "310", prot: "38g", image: "assets/recipe-11.jpg" },
  { num: "12", name: "Salmón al horno con espárragos y limón", kcal: "360", prot: "32g", image: "assets/recipe-12.jpg" },
  { num: "15", name: "Curry de garbanzos y vegetales", kcal: "290", prot: "13g", image: "assets/recipe-15.jpg" },
  { num: "20", name: "Salmón con puré de coliflor", kcal: "340", prot: "30g", image: "assets/recipe-20.jpg" },
  { num: "22", name: "Chips de kale al horno", kcal: "70", prot: "2g", image: "assets/recipe-22.jpg" },
  { num: "25", name: "Batido verde detox", kcal: "160", prot: "18g", image: "assets/recipe-25.jpg" },
];

function renderFichero() {
  const wrap = document.getElementById("fichero");
  if (!wrap) return;
  wrap.innerHTML = RECIPES.map(r => `
    <div class="ficha reveal">
      <img src="${r.image}" alt="${r.name}" class="ficha__img">
      <div class="ficha__content">
        <span class="ficha__num">#${r.num}</span>
        <p class="ficha__name">${r.name}</p>
        <div class="ficha__macros">
          <span>${r.kcal} kcal</span>
          <span>${r.prot} prot.</span>
        </div>
      </div>
    </div>
  `).join("");
}
renderFichero();

// ---------- Countdown de oferta ----------
function startCountdown() {
  const el = document.getElementById("countdown");
  const topEl = document.getElementById("top-countdown");
  if (!el && !topEl) return;

  const STORAGE_KEY = "raiz_offer_deadline";
  let deadline = localStorage_safe_get(STORAGE_KEY);

  if (!deadline) {
    deadline = Date.now() + 1000 * 60 * 60 * 3; // 3 horas desde la primera visita
    localStorage_safe_set(STORAGE_KEY, deadline);
  }

  function tick() {
    const diff = deadline - Date.now();
    if (diff <= 0) {
      if (el) el.textContent = "00:00:00";
      if (topEl) topEl.textContent = "00:00:00";
      return;
    }
    const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    const timeStr = `${h}:${m}:${s}`;
    if (el) el.textContent = timeStr;
    if (topEl) topEl.textContent = timeStr;
    requestAnimationFrame(() => setTimeout(tick, 1000));
  }
  tick();
}

// Helpers con fallback si localStorage no está disponible (modo privado, etc.)
function localStorage_safe_get(key) {
  try {
    const v = localStorage.getItem(key);
    return v ? Number(v) : null;
  } catch (e) { return null; }
}
function localStorage_safe_set(key, value) {
  try { localStorage.setItem(key, String(value)); } catch (e) { /* noop */ }
}

startCountdown();

// ---------- Solo un acordeón abierto a la vez (opcional, UX pulido) ----------
document.querySelectorAll(".accordion__item").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      document.querySelectorAll(".accordion__item").forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});

// ---------- Animación Scroll (Reveal) ----------
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('active')); // Fallback
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  reveals.forEach(el => observer.observe(el));
}
// Run on load and after rendering
window.addEventListener("DOMContentLoaded", initScrollReveal);
setTimeout(initScrollReveal, 100);

// ---------- Social Proof Toast ----------
function initSocialToast() {
  const toast = document.getElementById("social-toast");
  if (!toast) return;
  const nameEl = document.getElementById("toast-name");
  const timeEl = document.getElementById("toast-time");
  
  const names = [
    "María de Madrid", "Carlos de Barcelona", "Laura de Valencia", 
    "Ana de Sevilla", "David de Bilbao", "Elena de Málaga", 
    "Javier de Zaragoza", "Lucía de Murcia", "Carmen de Palma",
    "Andrea de Alicante", "Jorge de Córdoba", "Sara de Valladolid"
  ];
  
  function showToast() {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomMins = Math.floor(Math.random() * 15) + 1; // 1 to 15 mins
    nameEl.textContent = randomName;
    timeEl.textContent = `Hace ${randomMins} minuto${randomMins > 1 ? 's' : ''}`;
    
    toast.classList.add("show");
    
    // Hide after 5 seconds
    setTimeout(() => {
      toast.classList.remove("show");
    }, 5000);
  }
  
  // Show first toast after 5 seconds
  setTimeout(() => {
    showToast();
    // Then every 25-35 seconds
    setInterval(() => {
      showToast();
    }, Math.floor(Math.random() * 10000) + 25000);
  }, 5000);
}
initSocialToast();
