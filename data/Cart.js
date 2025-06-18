export const cart = [];
export let totalQuantity = 0;
export function addToCart(productId,dropDownValue){
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
    totalQuantity = 0;
    cart.forEach((item)=>{
    totalQuantity += item.quantity;

  });
  
  document.querySelector('.js-cart-quantity').innerHTML = totalQuantity;

}