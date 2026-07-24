// ============================================================
// RAÍZ — Recetario Real — interactions
// ============================================================

// ---------- Recetas destacadas (ficha grid) ----------
const RECIPES = [
  { num: "01", name: "Tortilla de claras, espinaca y champiñones", kcal: "180", prot: "24g" },
  { num: "06", name: "Ensalada de pollo, quinoa y vegetales asados", kcal: "380", prot: "34g" },
  { num: "11", name: "Pechuga de pollo al horno con vegetales", kcal: "310", prot: "38g" },
  { num: "12", name: "Salmón al horno con espárragos y limón", kcal: "360", prot: "32g" },
  { num: "15", name: "Curry de garbanzos y vegetales", kcal: "290", prot: "13g" },
  { num: "20", name: "Salmón con puré de coliflor", kcal: "340", prot: "30g" },
  { num: "22", name: "Chips de kale al horno", kcal: "70", prot: "2g" },
  { num: "25", name: "Batido verde detox", kcal: "160", prot: "18g" },
];

function renderFichero() {
  const wrap = document.getElementById("fichero");
  if (!wrap) return;
  wrap.innerHTML = RECIPES.map(r => `
    <div class="ficha">
      <span class="ficha__num">#${r.num}</span>
      <p class="ficha__name">${r.name}</p>
      <div class="ficha__macros">
        <span>${r.kcal} kcal</span>
        <span>${r.prot} prot.</span>
      </div>
    </div>
  `).join("");
}
renderFichero();

// ---------- Countdown de oferta ----------
function startCountdown() {
  const el = document.getElementById("countdown");
  if (!el) return;

  const STORAGE_KEY = "raiz_offer_deadline";
  let deadline = localStorage_safe_get(STORAGE_KEY);

  if (!deadline) {
    deadline = Date.now() + 1000 * 60 * 60 * 3; // 3 horas desde la primera visita
    localStorage_safe_set(STORAGE_KEY, deadline);
  }

  function tick() {
    const diff = deadline - Date.now();
    if (diff <= 0) {
      el.textContent = "00:00:00";
      return;
    }
    const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    el.textContent = `${h}:${m}:${s}`;
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
