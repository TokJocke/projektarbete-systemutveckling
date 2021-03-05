<?php 

class Offer {
    function __construct($offerName, $discount, $productId, $quantity, $productName, $price) {
        $this->offerName = $offerName;
        $this->discount = $discount;
        $this->productId = $productId;
        $this->quantity = $quantity;
        $this->productName = $productName;
        $this->price = $price;

        }
}


?>