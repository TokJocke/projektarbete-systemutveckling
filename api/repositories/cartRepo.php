<?php
require "../handlers/dbHandler.php";
require "../classes/productClass.php";
require "../classes/cartClass.php";
class CartRepo {
        function __construct()  {
            $this->db = new Database();
           }

    function getCart() {
        $cartList = $this->db->fetchQuery(
        "SELECT * FROM product INNER JOIN cart ON  product.productID = cart.productID");
        $productArray = $this->createProductList($cartList);
        return $productArray;
    }
    
    function createProductList($productList) {
        $cartItems = array();
        $totalPrice = 0;
        foreach ($productList as $item) { 
            $product = new Product($item->productName,(int) $item->price, $item->description, $item->img);
            $cartItem = new CartItem($product, (int) $item->quantity, $this->calculatePrice($item->quantity, $item->price));
            $totalPrice += $cartItem->totalPrice;
            array_push($cartItems, $cartItem); 
        }
        return new Cart($cartItems, $totalPrice);
    }
    
    //funktion som räknar kvantitet * styck pris
    function calculatePrice($quantity, $price){
        $finalPrice = $price * $quantity;
        return $finalPrice ;
    }

}