const products = [
  {
    id: "kaze-runner",
    name: "KAZE Runner",
    category: "Shoes",
    detail: "Everyday running shoe · 3 colors",
    description: "Light on your feet, ready for wherever. The KAZE Runner pairs soft cushioning with a pop of color and an easy everyday fit.",
    price: 120,
    tag: "NEW DROP",
    color: "Pop red",
    image: "assets/kaze-runner.svg",
    images: [
      "assets/kaze-runner.svg",
      "assets/cloud-step.svg",
      "assets/street-low.svg"
    ],
    alt: "Bright red running sneaker",
    sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: "cloud-step",
    name: "Cloud Step",
    category: "Shoes",
    detail: "Cushioned daily sneaker · 3 colors",
    description: "Easy cushioning and a clean, low-key profile make the Cloud Step a natural fit for all-day plans.",
    price: 110,
    tag: "BESTSELLER",
    color: "Cloud blue",
    image: "assets/cloud-step.svg",
    alt: "Modern cushioned everyday sneaker",
    sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: "street-low",
    name: "Street Low",
    category: "Shoes",
    detail: "Low-top street sneaker · 2 colors",
    description: "A classic low-top, remixed for the everyday rotation. Comfortable, versatile, and easy to make your own.",
    price: 98,
    tag: "",
    color: "Soft cream",
    image: "assets/street-low.svg",
    alt: "Low-top streetwear sneaker",
    sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: "easy-tee",
    name: "The Easy Tee",
    category: "Tops",
    detail: "Heavyweight cotton · 4 colors",
    description: "A little structure, a lot of comfort. The heavyweight cotton tee you will reach for on repeat.",
    price: 32,
    tag: "BESTSELLER",
    image: "https://images.pexels.com/photos/9775889/pexels-photo-9775889.jpeg?auto=compress&cs=tinysrgb&w=720",
    alt: "Diverse male models wearing relaxed white t-shirts and jeans",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "weekend-shirt",
    name: "Weekend Shirt",
    category: "Tops",
    detail: "Soft cotton poplin · 3 colors",
    description: "A relaxed button-up for slow mornings, last-minute plans, and everywhere in between.",
    price: 58,
    tag: "JUST IN",
    image: "https://images.pexels.com/photos/30953656/pexels-photo-30953656.jpeg?auto=compress&cs=tinysrgb&w=720",
    alt: "Male models wearing relaxed, layered streetwear",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "everyday-pant",
    name: "Everyday Pant",
    category: "Bottoms",
    detail: "Easy stretch twill · 3 colors",
    description: "Easy stretch, clean lines, no overthinking. Your everyday pants, sorted.",
    price: 68,
    tag: "",
    image: "https://images.pexels.com/photos/2244954/pexels-photo-2244954.jpeg?auto=compress&cs=tinysrgb&w=720",
    alt: "Man wearing an easy casual outfit outdoors",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "club-hoodie",
    name: "Club Hoodie",
    category: "Tops",
    detail: "Brushed fleece · 4 colors",
    description: "Soft brushed fleece and a relaxed fit. The one you borrow, then never give back.",
    price: 72,
    tag: "GOOD ONE",
    image: "https://images.pexels.com/photos/5840463/pexels-photo-5840463.jpeg?auto=compress&cs=tinysrgb&w=720",
    alt: "Two male models wearing minimalist hoodies",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "daily-cap",
    name: "Daily Cap",
    category: "Accessories",
    detail: "Cotton twill · 3 colors",
    description: "A simple cotton cap that goes with pretty much everything. Good hair day optional.",
    price: 28,
    tag: "",
    image: "https://images.pexels.com/photos/14241847/pexels-photo-14241847.jpeg?auto=compress&cs=tinysrgb&w=720",
    alt: "Male model wearing a cap and black hoodie",
    sizes: ["One size"]
  },
  {
    id: "straight-jean",
    name: "Straight Jean",
    category: "Bottoms",
    detail: "Better denim · 2 washes",
    description: "A straight fit with just enough room. A dependable classic for the everyday lineup.",
    price: 76,
    tag: "FAN FAVORITE",
    image: "https://images.pexels.com/photos/16069736/pexels-photo-16069736.jpeg?auto=compress&cs=tinysrgb&w=720",
    alt: "Man wearing straight blue jeans and sneakers",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "overshirt",
    name: "The Overshirt",
    category: "Tops",
    detail: "Everyday layer · 2 colors",
    description: "The just-right layer for unpredictable weather and plans that go a little longer.",
    price: 84,
    tag: "",
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=720&q=82",
    alt: "Male streetwear models wearing casual layers",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "weekender-tote",
    name: "Weekender Tote",
    category: "Accessories",
    detail: "Recycled canvas · 1 color",
    description: "Room for the essentials and the little extras. Made to come along for the ride.",
    price: 36,
    tag: "MADE TO GO",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=720&q=82",
    alt: "Minimal canvas tote bag",
    sizes: ["One size"]
  }
];

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const cartStorageKey = "kaze-shopping-bag";
const cart = new Map();
let toastTimeout;
let cameraStream;
let activeProduct;

function showToast(message) {
  const toast = document.querySelector(".toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function saveCart() {
  try {
    localStorage.setItem(cartStorageKey, JSON.stringify([...cart.values()]));
  } catch (error) {
    console.error("Could not save the KAZE shopping bag.", error);
    showToast("Your bag could not be saved on this device.");
  }
}

function restoreCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(cartStorageKey) || "[]");
    if (!Array.isArray(stored)) throw new TypeError("Saved shopping bag is not a list.");
    stored.forEach((item) => {
      if (item && typeof item.key === "string" && Number.isInteger(item.quantity) && item.quantity > 0) {
        cart.set(item.key, item);
      }
    });
  } catch (error) {
    console.error("Could not restore the KAZE shopping bag.", error);
    showToast("Your saved bag could not be restored.");
  }
}

function renderCart() {
  const items = [...cart.values()];
  const quantity = items.reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll(".bag-count").forEach((counter) => {
    counter.textContent = quantity;
  });

  const count = document.querySelector(".drawer-count");
  const subtotal = document.querySelector(".subtotal strong");
  const cartItems = document.querySelector(".cart-items");
  if (count) count.textContent = `(${quantity})`;
  if (subtotal) {
    subtotal.textContent = money.format(items.reduce((total, item) => total + item.price * item.quantity, 0));
  }
  if (cartItems) {
    cartItems.innerHTML = items.map((item) => `
      <article class="cart-row">
        <img src="${item.image}" alt="${item.alt}" />
        <div>
          <h3>${item.name}</h3>
          <p>${money.format(item.price)} · Size ${item.size}</p>
          <div class="quantity-control" aria-label="Quantity for ${item.name}">
            <button type="button" data-quantity="${item.key}" data-change="-1" aria-label="Remove one ${item.name}">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-quantity="${item.key}" data-change="1" aria-label="Add one ${item.name}">+</button>
            <button class="remove-item" type="button" data-remove="${item.key}">Remove</button>
          </div>
        </div>
        <strong>${money.format(item.price * item.quantity)}</strong>
      </article>
    `).join("");
  }
  const empty = document.querySelector(".cart-empty");
  const footer = document.querySelector(".cart-footer");
  if (empty) empty.style.display = items.length ? "none" : "flex";
  if (footer) footer.style.display = items.length ? "block" : "none";
}

function setCartOpen(open) {
  const drawer = document.querySelector(".cart-drawer");
  const backdrop = document.querySelector(".drawer-backdrop");
  if (!drawer || !backdrop) return;
  drawer.classList.toggle("is-open", open);
  backdrop.hidden = !open;
  requestAnimationFrame(() => backdrop.classList.toggle("is-open", open));
  drawer.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("no-scroll", open);
  if (open) document.querySelector(".close-drawer")?.focus();
}

function addToCart(product, size = product.sizes[0]) {
  const key = `${product.id}:${size}`;
  const existing = cart.get(key);
  cart.set(key, { ...product, key, size, quantity: (existing?.quantity || 0) + 1 });
  saveCart();
  renderCart();
  showToast(`${product.name} · ${size} added to your bag`);
}

function productCard(product, index) {
  return `
    <article class="product-card" style="animation-delay:${index * 55}ms">
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.alt}" loading="lazy" />
        <a class="product-image-link" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="View ${product.name}"></a>
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
        <button class="favorite-button" type="button" data-favorite="${product.id}" aria-label="Add ${product.name} to favorites" aria-pressed="false">♡</button>
        <a class="add-button" href="product.html?id=${encodeURIComponent(product.id)}">See the details <span aria-hidden="true">↗</span></a>
      </div>
      <div class="product-info">
        <div><h3 class="product-name">${product.name}</h3><p class="product-meta">${product.detail}</p></div>
        <p class="product-price">${money.format(product.price)}</p>
      </div>
    </article>
  `;
}

function renderProducts(filter = "All") {
  const grid = document.querySelector("#product-grid");
  if (!grid) return;
  const sort = document.querySelector("#sort-products")?.value || "featured";
  let visibleProducts = filter === "All"
    ? [...products]
    : products.filter((product) => product.category === filter);
  if (sort === "price-low") visibleProducts.sort((a, b) => a.price - b.price);
  if (sort === "price-high") visibleProducts.sort((a, b) => b.price - a.price);
  grid.innerHTML = visibleProducts.map(productCard).join("");
  const count = document.querySelector("#catalog-count");
  if (count) count.textContent = String(visibleProducts.length).padStart(2, "0");
}

function setupCatalog() {
  const filterList = document.querySelector(".filter-list");
  if (!filterList) return;
  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get("category");
  const validCategory = ["Shoes", "Tops", "Bottoms", "Accessories"].includes(requestedCategory)
    ? requestedCategory
    : "All";
  const filterButtons = [...filterList.querySelectorAll("[data-filter]")];
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === validCategory);
  });
  renderProducts(validCategory);
  filterList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    filterButtons.forEach((filterButton) => {
      filterButton.classList.toggle("active", filterButton === button);
    });
    const url = new URL(window.location.href);
    if (button.dataset.filter === "All") url.searchParams.delete("category");
    else url.searchParams.set("category", button.dataset.filter);
    window.history.replaceState({}, "", url);
    renderProducts(button.dataset.filter);
  });
  document.querySelector("#sort-products")?.addEventListener("change", () => {
    renderProducts(document.querySelector(".filter-button.active")?.dataset.filter || "All");
  });
}

function setupProductDetail() {
  const image = document.querySelector("#detail-image");
  if (!image) return;
  const params = new URLSearchParams(window.location.search);
  activeProduct = products.find((product) => product.id === params.get("id")) || products[0];
  const pageTitle = `${activeProduct.name} — KAZE`;
  document.title = pageTitle;
  document.querySelector("#detail-name").textContent = activeProduct.name;
  document.querySelector("#detail-description").textContent = activeProduct.description;
  document.querySelector("#detail-price").textContent = money.format(activeProduct.price);
  document.querySelector("#detail-price-button").textContent = money.format(activeProduct.price);
  document.querySelector("#breadcrumb-product").textContent = activeProduct.name;
  document.querySelector("#detail-color-name").textContent = activeProduct.color;
  image.src = activeProduct.images?.[0] || activeProduct.image;
  image.alt = activeProduct.alt;
  document.querySelector("#detail-thumbs").innerHTML = (activeProduct.images || [activeProduct.image]).map((src, index) => `
    <button type="button" class="${index === 0 ? "selected" : ""}" data-gallery-image="${src}" aria-label="View product image ${index + 1}">
      <img src="${src}" alt="" />
    </button>
  `).join("");
  const sizeList = document.querySelector(".size-list");
  const isOneSize = activeProduct.sizes.length === 1;
  const galleryImages = activeProduct.images || [activeProduct.image];
  document.querySelector("#size-help").textContent = activeProduct.category === "Shoes" ? "US MENS" : "APPAREL";
  sizeList.innerHTML = activeProduct.sizes.map((size) => `
    <button type="button" data-size="${size}" ${isOneSize ? 'class="selected" aria-pressed="true"' : 'aria-pressed="false"'}>${size}</button>
  `).join("");
  document.querySelector(".detail-image-count").innerHTML = `01 <i>/</i> ${String(galleryImages.length).padStart(2, "0")}`;
  const sizeDialog = document.querySelector(".size-guide-dialog");
  if (activeProduct.category === "Shoes") {
    sizeDialog.querySelector("h2").textContent = "Shoe size guide";
    sizeDialog.querySelector("p").textContent = "Our shoes run true to size. Between sizes? Go up for a little more room.";
    sizeDialog.querySelector("table").innerHTML = "<thead><tr><th>US</th><th>EU</th><th>CM</th></tr></thead><tbody><tr><td>7</td><td>40</td><td>25</td></tr><tr><td>8</td><td>41</td><td>26</td></tr><tr><td>9</td><td>42</td><td>27</td></tr><tr><td>10</td><td>43</td><td>28</td></tr><tr><td>11</td><td>44</td><td>29</td></tr><tr><td>12</td><td>45</td><td>30</td></tr></tbody>";
  } else {
    sizeDialog.querySelector("h2").textContent = "Apparel size guide";
    sizeDialog.querySelector("p").textContent = "Our everyday fits are relaxed. If you like a closer fit, consider sizing down.";
    sizeDialog.querySelector("table").innerHTML = "<thead><tr><th>SIZE</th><th>CHEST</th><th>FIT</th></tr></thead><tbody><tr><td>S</td><td>36–38 in</td><td>Relaxed</td></tr><tr><td>M</td><td>38–40 in</td><td>Relaxed</td></tr><tr><td>L</td><td>40–42 in</td><td>Relaxed</td></tr><tr><td>XL</td><td>42–44 in</td><td>Relaxed</td></tr></tbody>";
  }
  document.querySelector(".detail-add").addEventListener("click", () => {
    const selectedSize = sizeList.querySelector(".selected")?.dataset.size;
    const error = document.querySelector(".size-error");
    if (!selectedSize) {
      error.textContent = "Choose a size to add this one to your bag.";
      sizeList.classList.add("needs-size");
      sizeList.querySelector("button")?.focus();
      return;
    }
    error.textContent = "";
    sizeList.classList.remove("needs-size");
    addToCart(activeProduct, selectedSize);
  });
  document.querySelector(".size-list").addEventListener("click", (event) => {
    const button = event.target.closest("[data-size]");
    if (!button) return;
    sizeList.querySelectorAll("[data-size]").forEach((item) => {
      item.classList.toggle("selected", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
    document.querySelector(".size-error").textContent = "";
    sizeList.classList.remove("needs-size");
  });
  document.querySelector("#detail-thumbs").addEventListener("click", (event) => {
    const button = event.target.closest("[data-gallery-image]");
    if (!button) return;
    image.src = button.dataset.galleryImage;
    document.querySelectorAll("#detail-thumbs button").forEach((item) => {
      item.classList.toggle("selected", item === button);
    });
    const counter = document.querySelector(".detail-image-count");
    counter.innerHTML = `${[...button.parentElement.children].indexOf(button) + 1} <i>/</i> ${button.parentElement.children.length}`;
  });
  document.querySelectorAll(".color-swatch:not([data-try-color])").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".color-swatch:not([data-try-color])").forEach((item) => item.classList.toggle("selected", item === button));
      document.querySelector("#detail-color-name").textContent = button.dataset.color;
      const filter = button.dataset.color === "Cloud blue" ? "hue-rotate(155deg) saturate(.8)" : button.dataset.color === "Soft cream" ? "grayscale(.4) brightness(1.25)" : "none";
      image.style.filter = filter;
    });
  });
  document.querySelector(".detail-heart").addEventListener("click", (event) => {
    const button = event.currentTarget;
    const selected = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(selected));
    button.classList.toggle("is-favorite", selected);
    button.textContent = selected ? "♥" : "♡";
    showToast(selected ? "Saved to your favorites" : "Removed from your favorites");
  });
  const recommendations = document.querySelector("#recommend-grid");
  if (recommendations) {
    recommendations.innerHTML = products.filter((product) => product.id !== activeProduct.id).slice(0, 4).map(productCard).join("");
  }
  document.querySelector("[data-size-guide]").addEventListener("click", () => sizeDialog.showModal());
  document.querySelector(".close-size-guide").addEventListener("click", () => sizeDialog.close());
  sizeDialog.addEventListener("click", (event) => {
    if (event.target === sizeDialog) sizeDialog.close();
  });
}

const tryShoes = {
  "kaze-runner": {
    name: "KAZE Runner", price: 120,
    image: "assets/kaze-runner.svg",
    description: "Light, cushioned, and ready for wherever."
  },
  "cloud-step": {
    name: "Cloud Step", price: 110,
    image: "assets/cloud-step.svg",
    description: "Easy cushioning for all-day plans."
  },
  "street-low": {
    name: "Street Low", price: 98,
    image: "assets/street-low.svg",
    description: "A classic low-top, remixed for your everyday."
  }
};

function setupTryOn() {
  const viewport = document.querySelector("#try-viewport");
  if (!viewport) return;
  let currentShoe = "kaze-runner";
  let currentColor = "red";
  const overlay = document.querySelector("#try-shoe-overlay");
  const shoeName = document.querySelector("#try-product-name");
  const shoePrice = document.querySelector("#try-product-price");
  const productLink = document.querySelector("#try-product-link");
  const cameraButton = document.querySelector("#camera-toggle");

  function updateTryOn() {
    const shoe = tryShoes[currentShoe];
    overlay.src = shoe.image;
    overlay.style.filter = currentColor === "blue"
      ? "hue-rotate(155deg) saturate(.8)"
      : currentColor === "cream"
        ? "grayscale(.4) brightness(1.25)"
        : "none";
    shoeName.textContent = shoe.name;
    shoePrice.textContent = money.format(shoe.price);
    document.querySelector(".try-description").textContent = shoe.description;
    productLink.href = `product.html?id=${currentShoe}`;
  }

  document.querySelector(".try-shoe-options").addEventListener("click", (event) => {
    const option = event.target.closest("[data-shoe]");
    if (!option) return;
    currentShoe = option.dataset.shoe;
    document.querySelectorAll("[data-shoe]").forEach((button) => button.classList.toggle("selected", button === option));
    updateTryOn();
  });
  document.querySelector(".try-color-options").addEventListener("click", (event) => {
    const option = event.target.closest("[data-try-color]");
    if (!option) return;
    currentColor = option.dataset.tryColor;
    document.querySelectorAll("[data-try-color]").forEach((button) => button.classList.toggle("selected", button === option));
    document.querySelector("#try-color-name").textContent = { red: "Pop red", blue: "Cloud blue", cream: "Soft cream" }[currentColor];
    updateTryOn();
  });
  document.querySelector("#shoe-scale").addEventListener("input", (event) => {
    const scale = Number(event.target.value);
    overlay.style.width = `${scale * 2.45}px`;
    document.querySelector("#scale-value").textContent = `${scale}%`;
  });
  cameraButton.addEventListener("click", async () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      cameraStream = undefined;
      document.querySelector("#camera-feed").srcObject = null;
      viewport.classList.remove("camera-active");
      cameraButton.innerHTML = '<span aria-hidden="true">◉</span> Turn on camera';
      showToast("Camera preview turned off.");
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      showToast("Camera preview needs a secure HTTPS page and a supported browser.");
      return;
    }
    cameraButton.disabled = true;
    cameraButton.textContent = "Opening camera…";
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      document.querySelector("#camera-feed").srcObject = cameraStream;
      viewport.classList.add("camera-active");
      cameraButton.innerHTML = '<span aria-hidden="true">×</span> Turn off camera';
      showToast("Camera preview is on. Drag the shoe to position it.");
    } catch (error) {
      console.error("Could not start the KAZE camera preview.", error);
      const reason = error.name === "NotAllowedError" ? "Allow camera access in your browser settings." : "Check your camera and try again.";
      showToast(reason);
      cameraButton.innerHTML = '<span aria-hidden="true">◉</span> Try camera again';
    } finally {
      cameraButton.disabled = false;
    }
  });

  let dragOffsetX = 0;
  let dragOffsetY = 0;
  overlay.addEventListener("pointerdown", (event) => {
    const overlayRect = overlay.getBoundingClientRect();
    dragOffsetX = event.clientX - overlayRect.left;
    dragOffsetY = event.clientY - overlayRect.top;
    overlay.setPointerCapture(event.pointerId);
    overlay.classList.add("is-dragging");
  });
  overlay.addEventListener("pointermove", (event) => {
    if (!overlay.hasPointerCapture(event.pointerId)) return;
    const bounds = viewport.getBoundingClientRect();
    const x = Math.min(bounds.width - overlay.offsetWidth / 2, Math.max(overlay.offsetWidth / 2, event.clientX - bounds.left - dragOffsetX + overlay.offsetWidth / 2));
    const y = Math.min(bounds.height - overlay.offsetHeight / 2, Math.max(overlay.offsetHeight / 2, event.clientY - bounds.top - dragOffsetY + overlay.offsetHeight / 2));
    overlay.style.left = `${x}px`;
    overlay.style.top = `${y}px`;
    overlay.style.right = "auto";
    overlay.style.bottom = "auto";
    overlay.style.transform = "translate(-50%, -50%) rotate(-12deg)";
  });
  overlay.addEventListener("pointerup", () => overlay.classList.remove("is-dragging"));
  overlay.addEventListener("pointercancel", () => overlay.classList.remove("is-dragging"));
  window.addEventListener("pagehide", () => {
    cameraStream?.getTracks().forEach((track) => track.stop());
  }, { once: true });
  updateTryOn();
}

document.querySelector(".bag-button")?.addEventListener("click", () => setCartOpen(true));
document.querySelector(".close-drawer")?.addEventListener("click", () => setCartOpen(false));
document.querySelector(".drawer-backdrop")?.addEventListener("click", () => setCartOpen(false));
document.querySelector(".cart-empty a")?.addEventListener("click", () => setCartOpen(false));
document.querySelectorAll(".whatsapp-order-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const items = [...cart.values()];
    if (!items.length) {
      showToast("Add an item to your bag before placing an order.");
      return;
    }

    const customer = new FormData(form);
    const name = String(customer.get("name") || "").trim();
    const phone = String(customer.get("phone") || "").trim();
    const address = String(customer.get("address") || "").trim();
    if (!name || !phone || !address) {
      showToast("Please enter your name, phone number, and delivery address.");
      return;
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderId = `KZ-${Date.now().toString().slice(-7)}`;
    const orderedAt = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata"
    }).format(new Date());
    const lines = items.map((item) =>
      `• ${item.name} | Size: ${item.size} | Qty: ${item.quantity} | ${money.format(item.price * item.quantity)}`
    );
    const message = [
      "🛍️ *NEW KAZE ORDER*",
      `Order: ${orderId}`,
      `Time: ${orderedAt} (IST)`,
      "",
      "*Customer details*",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Delivery address: ${address}`,
      "",
      "*Items*",
      ...lines,
      "",
      `*Total: ${money.format(total)}*`
    ].join("\n");
    const whatsappUrl = `https://wa.me/919946375868?text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open(whatsappUrl, "_blank");
    if (!whatsappWindow) {
      showToast("Allow pop-ups in your browser to open WhatsApp.");
      return;
    }
    whatsappWindow.opener = null;
    showToast("WhatsApp opened with your order. Tap Send to confirm.");
  });
});
document.querySelector(".cart-items")?.addEventListener("click", (event) => {
  const remove = event.target.closest("[data-remove]");
  if (remove) {
    cart.delete(remove.dataset.remove);
    saveCart();
    renderCart();
    return;
  }
  const change = event.target.closest("[data-quantity]");
  if (!change) return;
  const item = cart.get(change.dataset.quantity);
  if (!item) return;
  item.quantity += Number(change.dataset.change);
  if (item.quantity <= 0) cart.delete(item.key);
  saveCart();
  renderCart();
});
document.querySelector("#product-grid")?.addEventListener("click", (event) => {
  const favorite = event.target.closest("[data-favorite]");
  if (!favorite) return;
  const selected = favorite.getAttribute("aria-pressed") !== "true";
  favorite.setAttribute("aria-pressed", String(selected));
  favorite.classList.toggle("is-favorite", selected);
  favorite.textContent = selected ? "♥" : "♡";
  showToast(selected ? "Saved to your favorites" : "Removed from your favorites");
});
document.querySelector(".menu-toggle")?.addEventListener("click", (event) => {
  const button = event.currentTarget;
  const open = button.getAttribute("aria-expanded") !== "true";
  button.setAttribute("aria-expanded", String(open));
  button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  document.querySelector(".main-nav")?.classList.toggle("is-open", open);
});
document.querySelector(".main-nav")?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    document.querySelector(".main-nav").classList.remove("is-open");
    document.querySelector(".menu-toggle")?.setAttribute("aria-expanded", "false");
  }
});
document.querySelector(".newsletter-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector(".form-message").textContent = "Thanks! Newsletter sign-up is ready to connect.";
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setCartOpen(false);
});
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
restoreCart();
renderCart();
setupCatalog();
setupProductDetail();
setupTryOn();
