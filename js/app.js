const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;  
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product text-white">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title.slice(0,35)}</h3>
      <p>Category: ${product.category}</p>
      <p>Avarage rating: ${product.rating.rate}</p>
      <p>Total rating: ${product.rating.count}</p>
      <h2>Price: $ ${product.price}</h2>
      <div class="card-footer">
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">Add to cart</button>
      <button onclick="loadSingleProduct(${product.id})" id="details-btn" class="btn btn-danger"type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
      </div>
      
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal()
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};



const updateTotal = () => {
  const grandTotal =
   getInputValue("price")+ getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};



const loadSingleProduct= (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showSingleProduct(data));
};
const showSingleProduct = product => {
  const singleProductContainer = document.getElementById("single-product");
  singleProductContainer.textContent= '';
    const image = product.image;  
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product-detail">
    <div>
  <img class="product-image" src=${image}></img>
    </div>
    <h3>${product.title}</h3>
    <p>${product.description.slice(0,200)}</p>
    <h2>Price: $ ${product.price}</h2>
    <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
    <p class="mt-2">Avarage rating- ${product.rating.rate}</p>
    <p>Total rating: ${product.rating.count}</p>
      </div>
      </div>`;
    singleProductContainer.appendChild(div);

  };
/*-- -------------------
You've all been very supportive, patient, and you've given us so much.Thank you all
---------------------- --*/