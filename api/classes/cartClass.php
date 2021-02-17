<?php 

class Cart {
    function __construct($productList, $totalPrice) {
        $this->productList = $productList;
        $this->totalPrice = $totalPrice;

        
        }
}
class CartItem {
    function __construct($product, $quantity, $totalPrice) {
        $this->product = $product;
        $this->quantity = $quantity;
        $this->totalPrice = $totalPrice;

        
        }
}

?>


