const loadProducts = () => {
    const url = `https://fakestoreapi.com/products`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => showProducts(data));
  };
  loadProducts();
  
  // show all product in UI 
  const showProducts = (products) => {
    console.log(products)
    const allProducts = products.map((pd) => pd);
    for (const product of allProducts) {
      const image = product.images;
      const div = document.createElement("div");
      div.classList.add("product");
      div.innerHTML = `<div class="single-product">
        
          <img class="product-image" src=${product.image}></img>
  
          <div class = "card-body">
          
          <h3>${product.title}</h3>
          <p>Category: ${product.category}</p>
          <div class = "rating">
              <div class = "avg-rating">Avg.rating : ${product.rating.rate}
              </div>
              <div class = "total-rating"> Total ratings : ${product.rating.count}</div>
          </div>
          <h2>Price: $ ${product.price}</h2>
          </div>
  
        <div class = "card-footer">
          <button onclick="addToCart(${product.id},${product.price})" 
          id="addToCart-btn" class="buy-now btn btn-success">Add To Cart</button>
          <button onclick ="detailsClicked(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
        </div>
        
          
      </div>
        `;
      document.getElementById("all-products").appendChild(div);
    }
  };
  
  
  // // // details of products // // //
  
  const detailsClicked = productId =>{
    // console.log(productId)
    const url = `https://fakestoreapi.com/products/${productId}`
    fetch(url)
    .then(res => res.json())
    .then(data =>displayProductDetails(data))
  } 
  
  const displayProductDetails = product =>{
    console.log(product)
    const productDetails = document.getElementById('singleProductDetails')
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
            <h2 class = "text-info text-center">Product Details</h2>
            <img src="${product.image}" class="details-img p-2" height = 400 width = 250 alt="">
            <div class="card-body">
              <h3 class="card-title">${product.title}</h3>
              <p class="card-text">${product.description}</p>
              <a href="#" class="btn btn-primary">Continue Shopping</a>
            </div>
    `
  
    productDetails.appendChild(div)
  }
  
  //  // //  Add to cart section // // //
  
  let count = 0;
  const addToCart = (id, price) => {
    count = count + 1;
    updatePrice("price", price);
  
    updateTaxAndCharge();
    document.getElementById("total-Products").innerText = count;
  };
  
  const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element);
    return converted;
  };
  
  // // // main price update function // //
  const updatePrice = (id, value) => {
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = total.toFixed(2);
  };
  
  // set innerText function
  const setInnerText = (id, value) => {
    document.getElementById(id).innerText =parseFloat(value.toFixed(2));
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
  
    updateTotal()
  };
  
  //grandTotal update function
  const updateTotal = () => {
    const productPriceText = document.getElementById('price').innerText
    const productPrice = parseFloat(productPriceText)
  
    const dileveryChargeText = document.getElementById('delivery-charge').innerText
    const dileveryCharge = parseFloat(dileveryChargeText)
  
    const totalTaxText = document.getElementById('total-tax').innerText
    const totaltax = parseFloat(totalTaxText)
  
    const lastTotal = productPrice + dileveryCharge + totaltax
  
    const grandTotal = document.getElementById('total')
  
    
    grandTotal.innerText = lastTotal.toFixed(2)
  };
  
  