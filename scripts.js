/* ===========================================================
   🌸 LAZOS FLOREALES D’AMOUR - SCRIPT PRINCIPAL
   Mejoras: Carrito profesional con cantidades, total dinámico y controles
   ============================================================ */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* -------------------------
   🔧 Guardar Carrito
-------------------------- */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* -------------------------
   ➕ Agregar al Carrito
-------------------------- */
function addToCart(name, price, image) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
            image: image || ""
        });
    }

    saveCart();
    showPopup(`${name} added to cart!`);
}

/* -------------------------
   📦 Cargar Carrito
-------------------------- */
function loadCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");

    if (!cartContainer || !totalContainer) return;

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        let div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <img src="${item.image}" class="cart-img"/>

            <div class="cart-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>

                <div class="qty-control">
                    <button onclick="changeQty(${index}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
            </div>

            <div class="cart-actions">
                <p class="item-total">$${itemTotal.toFixed(2)}</p>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;

        cartContainer.appendChild(div);
    });

    totalContainer.innerText = "$" + total.toFixed(2);
}

/* -------------------------
   🔢 Cambiar Cantidad
-------------------------- */
function changeQty(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    loadCart();
}

/* -------------------------
   ❌ Eliminar un Producto
-------------------------- */
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    loadCart();
}

/* -------------------------
   🗑 Vaciar Todo
-------------------------- */
function clearCart() {
    if (confirm("Are you sure you want to empty your cart?")) {
        cart = [];
        saveCart();
        loadCart();
    }
}

/* -------------------------
   🎀 Popup de Confirmación
-------------------------- */
function showPopup(message) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerText = message;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add("visible");
    }, 50);

    setTimeout(() => {
        popup.classList.remove("visible");
        setTimeout(() => popup.remove(), 300);
    }, 2000);
}

/* -------------------------
   🔦 Modo Oscuro / Claro
-------------------------- */
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    const mode = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", mode);
}

/* -------------------------
   🔦 Cargar Tema Guardado
-------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    let theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark");
    }

    loadCart();
});
