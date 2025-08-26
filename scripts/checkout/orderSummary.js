import {totalQuantity, showtotalQuantity, cart, removeFromCart, updateQuantity,updateDeliveryOption} from '../../data/Cart.js';
import {products,getProduct } from '../../data/products.js';
import formatCurrency from '../utils/money.js';

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';  
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){
   let cartSummaryHTML = '';
cart.forEach((cartItem) => {
  
  const productId = cartItem.productId; //id of the product in cart
  const matchingProduct = getProduct(productId); // object of that product in product.js
 
  const deliveryOptionsId = cartItem.deliveryOptionsId;
  let deliveryOption = getDeliveryOption(deliveryOptionsId);
  
   const today = dayjs();
    
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    
    const dateString = deliveryDate.format('dddd, MMMM, D');
 
  cartSummaryHTML += 
  `
  <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: ${dateString}
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
                ${deliveryOptionsHTML(matchingProduct,cartItem)}
                
                  
              </div>
            </div>
          </div>

  `
} );
function deliveryOptionsHTML(matchingProduct,cartItem){
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    
    const dateString = deliveryDate.format('dddd, MMMM, D');
    const priceString = deliveryOption.priceCents ===0 ? 'FREE': formatCurrency(deliveryOption.priceCents);
    
    const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;
    html += 
    `
    <div class="delivery-option js-delivery-option" data-product-id = "${matchingProduct.id}"
    data-delivery-option-id = "${deliveryOption.id}">
      <input type="radio" 
      ${isChecked ? 'checked' : ''}
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
            ${dateString}
        </div>
        <div class="delivery-option-price">
            ${priceString} Shipping
        </div>
      </div>
    </div>
      `
  })
  return html;
  

}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
document.querySelector('.js-cart-quantity-checkout').innerHTML = showtotalQuantity();

document.querySelectorAll('.js-delete-link').forEach((link) => {link.addEventListener('click',()=> {
  const productId = link.dataset.productId;
  removeFromCart(productId);
  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  container.remove();
  document.querySelector('.js-cart-quantity-checkout').innerHTML = showtotalQuantity();
  renderPaymentSummary();
  

  
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
    renderPaymentSummary();

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
document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click',() => {
    console.log('hello');
    const {productId,deliveryOptionId} = element.dataset;
    
    updateDeliveryOption(productId,deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary();

  });
});


}


