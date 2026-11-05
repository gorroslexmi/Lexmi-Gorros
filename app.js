const $ = (selector) => document.querySelector(selector);
let activeCategory = "todos";
let cart = [];

const money = (value) => value == null ? "Consultar precio" :
  new Intl.NumberFormat("es-MX", { style: "currency", currency: STORE_CONFIG.currency }).format(value);

function renderProducts() {
  const term = $("#search").value.trim().toLowerCase();
  const filtered = PRODUCTS.filter(p =>
    p.available &&
    (activeCategory === "todos" || p.category === activeCategory) &&
    `${p.name} ${p.description}`.toLowerCase().includes(term)
  );
  $("#result-count").textContent = `${filtered.length} ${filtered.length === 1 ? "producto" : "productos"}`;
  $("#product-grid").innerHTML = filtered.length ? filtered.map(p => `
    <article class="product-card">
      <div class="product-image">
        <span class="product-tag">${p.category === "lisos" ? "LISO" : "ESTAMPADO"}</span>
        ${p.image ? `<img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy">` :
          `<div class="placeholder-label"><span>✿</span>Fotografía próximamente</div>`}
      </div>
      <div class="product-info">
        <h3>${escapeHtml(p.name)}</h3>
        <p>${escapeHtml(p.description || "")}</p>
        <div class="product-bottom"><span class="price">${money(p.price)}</span>
          <button class="add-button" data-add="${p.id}">Agregar +</button></div>
      </div>
    </article>`).join("") : `<div class="empty-state">No encontramos productos con esa búsqueda.</div>`;
  document.querySelectorAll("[data-add]").forEach(btn => btn.addEventListener("click", () => addToCart(Number(btn.dataset.add))));
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty += 1; else cart.push({ id, qty: 1 });
  renderCart(); showToast(`${product.name} agregado al carrito`);
}
function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
  renderCart();
}
function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  $("#cart-count").textContent = count;
  const items = cart.map(item => ({ ...item, product: PRODUCTS.find(p => p.id === item.id) })).filter(x => x.product);
  $("#cart-items").innerHTML = items.length ? items.map(item => `
    <div class="cart-line">
      <div><strong>${escapeHtml(item.product.name)}</strong><small>${money(item.product.price)} · ${escapeHtml(item.product.category)}</small></div>
      <div class="quantity"><button data-qty="${item.id}" data-delta="-1" aria-label="Quitar uno">−</button><span>${item.qty}</span><button data-qty="${item.id}" data-delta="1" aria-label="Agregar uno">+</button></div>
    </div>`).join("") : `<div class="empty-state">Tu carrito está vacío.<br>Agrega tus diseños favoritos.</div>`;
  document.querySelectorAll("[data-qty]").forEach(btn => btn.addEventListener("click", () => changeQty(Number(btn.dataset.qty), Number(btn.dataset.delta))));
  const total = items.reduce((sum, item) => sum + (Number(item.product.price) || 0) * item.qty, 0);
  const hasUnknown = items.some(item => item.product.price == null);
  $("#cart-total").textContent = hasUnknown ? "Por confirmar" : money(total);
}
function openCart() {
  $("#cart-drawer").classList.add("open"); $("#overlay").classList.add("open");
  $("#cart-drawer").setAttribute("aria-hidden", "false");
}
function closeCart() {
  $("#cart-drawer").classList.remove("open"); $("#overlay").classList.remove("open");
  $("#cart-drawer").setAttribute("aria-hidden", "true");
}
function whatsappUrl(message) {
  const number = (STORE_CONFIG.whatsapp || "").replace(/\D/g, "");
  if (!number) {
    showToast("Falta configurar el WhatsApp en products.js");
    return null;
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
function checkout() {
  if (!cart.length) { showToast("Primero agrega un producto al carrito"); return; }
  const lines = cart.map(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    return `• ${p.name} x${item.qty} — ${money(p.price)}`;
  });
  const total = cart.reduce((sum, item) => sum + ((Number(PRODUCTS.find(p => p.id === item.id)?.price) || 0) * item.qty), 0);
  const unknown = cart.some(item => PRODUCTS.find(p => p.id === item.id)?.price == null);
  const message = `¡Hola! Quiero hacer un pedido en ${STORE_CONFIG.storeName}:\n\n${lines.join("\n")}\n\nTotal estimado: ${unknown ? "Por confirmar" : money(total)}\n\n¿Me pueden confirmar disponibilidad y entrega?`;
  const url = whatsappUrl(message);
  if (url) window.open(url, "_blank", "noopener");
}
function showToast(message) {
  const toast = $("#toast"); toast.textContent = message; toast.classList.add("show");
  clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

$("#filters").addEventListener("click", e => {
  const btn = e.target.closest("[data-category]"); if (!btn) return;
  activeCategory = btn.dataset.category;
  document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === btn));
  renderProducts();
});
$("#search").addEventListener("input", renderProducts);
$("#open-cart").addEventListener("click", openCart);
$("#close-cart").addEventListener("click", closeCart);
$("#overlay").addEventListener("click", closeCart);
$("#checkout").addEventListener("click", checkout);
$("#menu-toggle").addEventListener("click", () => $(".desktop-nav").classList.toggle("open"));
document.querySelectorAll(".desktop-nav a").forEach(a => a.addEventListener("click", () => $(".desktop-nav").classList.remove("open")));
$("#contact-whatsapp").addEventListener("click", e => {
  e.preventDefault();
  const url = whatsappUrl("¡Hola! Me gustaría conocer los gorros quirúrgicos disponibles de Lexmi Gorros.");
  if (url) window.open(url, "_blank", "noopener");
});
$("#year").textContent = new Date().getFullYear();
renderProducts(); renderCart();
