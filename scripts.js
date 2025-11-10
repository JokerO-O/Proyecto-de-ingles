/* Simple cart using localStorage.
   Products are represented by id, name, price, img.
   Add to cart buttons must have data-id attributes.
*/

const PRODUCTS = [
  {id: "p1", name: "Eternal Rose Box - Classic", price: 45, img: "images/flower1.jpg"},
  {id: "p2", name: "Blue Eternal Bouquet", price: 38, img: "images/flower2.jpg"},
  {id: "p3", name: "Heart-Shaped Red & Pink Box", price: 60, img: "images/flower3.jpg"},
  {id: "p4", name: "Shiny Sunflowers - Set of 4", price: 30, img: "images/flower4.jpg"}
];

function getCart(){ return JSON.parse(localStorage.getItem('lf_cart')||'{}') }

function saveCart(cart){ localStorage.setItem('lf_cart', JSON.stringify(cart)) }

function addToCart(productId, qty=1){
  const cart = getCart();
  cart[productId] = (cart[productId]||0) + qty;
  saveCart(cart);
  alert("Added to cart");
  updateCartCount();
}

function updateCartCount(){
  const cart = getCart();
  const count = Object.values(cart).reduce((s,n)=>s+n,0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}

function renderCartPage(){
  const cartEl = document.getElementById('cart-items');
  if(!cartEl) return;
  const cart = getCart();
  cartEl.innerHTML = '';
  let total=0;
  for(const [id, qty] of Object.entries(cart)){
    const prod = PRODUCTS.find(p=>p.id===id);
    if(!prod) continue;
    const lineTotal = prod.price * qty;
    total += lineTotal;
    const div = document.createElement('div');
    div.className='card';
    div.innerHTML = `
      <div style="display:flex;gap:12px;align-items:center">
        <img src="${prod.img}" style="width:90px;height:70px;object-fit:cover;border-radius:8px">
        <div style="flex:1">
          <strong>${prod.name}</strong>
          <div>$${prod.price.toFixed(2)} × ${qty} = $${lineTotal.toFixed(2)}</div>
        </div>
        <div>
          <button onclick="changeQty('${id}', -1)">-</button>
          <button onclick="changeQty('${id}', 1)">+</button>
          <button onclick="removeItem('${id}')" style="margin-left:8px">Remove</button>
        </div>
      </div>
    `;
    cartEl.appendChild(div);
  }
  document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

function changeQty(id, delta){
  const cart = getCart();
  cart[id] = Math.max(0,(cart[id]||0)+delta);
  if(cart[id]===0) delete cart[id];
  saveCart(cart);
  renderCartPage();
  updateCartCount();
}

function removeItem(id){
  const cart = getCart();
  delete cart[id];
  saveCart(cart);
  renderCartPage();
  updateCartCount();
}

document.addEventListener('DOMContentLoaded', ()=>{
  // attach add-to-cart handlers
  document.querySelectorAll('[data-add-to-cart]').forEach(btn=>{
    btn.addEventListener('click', ()=> addToCart(btn.dataset.addToCart, 1));
  });
  updateCartCount();
  renderCartPage();
});
