import {cart} from '../data/Cart.js';
import { products } from '../data/products.js';
let productsHtml = '';


products.forEach((product) => {
  
    productsHtml += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class = "js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button"
          data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>`;
        
});
const timeoutMap = {};
  

 let totalQuantity = 0;
document.querySelector('.js-products-grid').innerHTML = productsHtml;
document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    totalQuantity = 0;

    clearTimeout(timeoutMap[productId]);
    const addedButtonElement = document.querySelector(`.js-added-to-cart-${button.dataset.productId}`);
    
    addedButtonElement.classList.add('added-to-cart-2');
    timeoutMap[productId] = setTimeout(() => {
      addedButtonElement.classList.remove('added-to-cart-2');
    },2000);
    
    const dropDownValue = Number(document.querySelector(`.js-quantity-selector-${button.dataset.productId}`).value);
    

    
    
    let matchingItem;
    cart.forEach((item) => {
      if(productId === item.productId){
        matchingItem = item;

      }
    });
    if(matchingItem){
      matchingItem.quantity += dropDownValue;
    }else{
       cart.push({
      productId : productId,
      quantity: dropDownValue
    });
    

    }
    
      cart.forEach((item)=>{
    totalQuantity += item.quantity;

  });
  
  document.querySelector('.js-cart-quantity').innerHTML = totalQuantity;
    
    
    });
  

});




