<?php 

class Cart {
    function __construct($productList, $totalPrice) {
        $this->productList = $productList;
        $this->totalPrice = $totalPrice;

        
        }
}
class CartItem {
    function __construct($product, $quantity, $totalPrice, $productId,$userId) {
        $this->product = $product;
        $this->quantity = $quantity;
        $this->totalPrice = $totalPrice;
        $this->productId = $productId;
        $this->userId = $userId;

        
        }
}

?>


