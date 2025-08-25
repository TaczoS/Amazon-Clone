import {totalQuantity, showtotalQuantity, cart, removeFromCart, updateQuantity} from '../data/Cart.js';
import {products } from '../data/products.js';
import {formatCurrency} from './utils/money.js';
hello();
const today = dayjs();
const deliveryDate = today.add(7,'days');
console.log(deliveryDate.format('dddd, MMMM D'));
 let cartSummaryHTML = '';
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product)=> {
    if(product.id === productId){
      matchingProduct = product;
    }
  } );

 
  cartSummaryHTML += 
  `
  <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${productId}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id = "${productId}">
                    Update 
                  </span>
                  <input class = "quantity-input quantity-input-link js-quantity-input-${productId}" data-product-id = "${productId}">
                  <span class = "save-quantity-link link-primary  js-save-link" data-product-id = "${productId}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

  `
} );
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
document.querySelector('.js-cart-quantity-checkout').innerHTML = showtotalQuantity();

document.querySelectorAll('.js-delete-link').forEach((link) => {link.addEventListener('click',()=> {
  const productId = link.dataset.productId;
  removeFromCart(productId);
  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  container.remove();
  document.querySelector('.js-cart-quantity-checkout').innerHTML = showtotalQuantity();
  

  
});});
document.querySelectorAll('.js-update-link').forEach((link) =>{
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');

    

  });
});
function clickedSaved(container,productId){
  
    container.classList.remove('is-editing-quantity');
    const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    
    updateQuantity(productId,newQuantity);
    document.querySelector('.js-cart-quantity-checkout').innerHTML = showtotalQuantity();
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;

}
document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    clickedSaved(container,productId);

    
  });
});
document.querySelectorAll('.js-quantity-input-link').forEach((link) => {
  link.addEventListener('keyup',(event) =>{
    if(event.key === 'Enter'){
      event.preventDefault();
        const productId = link.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        clickedSaved(container,productId);

    }
  });
});

