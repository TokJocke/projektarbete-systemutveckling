<?php
require "../handlers/dbHandler.php";
require "../classes/productClass.php";
require "../classes/cartClass.php";
class CartRepo {
        function __construct()  {
            $this->db = new Database();
           }
           
    function getAllProducts() {
            $allProducts = $this->db->fetchQuery("SELECT * FROM Product");
            $productArray = $this->createProductList($allProducts);
            return $productArray;
        }
    function getCart() {
        
        $cartList = $this->db->fetchQuery(
        "SELECT * FROM product INNER JOIN cart ON  product.productID = cart.productID");
        $productArray = $this->createProductList($cartList);
        return $productArray;
    }

    //View to get SUM of price incomplete
    /* function getTotalPrice() {
        
        $cartList = $this->db->fetchQuery(
        "SELECT sum(price) as totalprice
        FROM product INNER JOIN cart ON  product.productID = cart.productID");
        $productArray = $this->createProductList($cartList);
        return $productArray;
    } */
    
    //Skapa lista med produktinstanser    DENNA FUNKAR ISCH
    function createProductList($array) {
        $productArray = array();
        foreach ($array as $item) { //Kan uppnås med array_map
            $product = new Product($item->productName, $this->calculatePrice($item->quantity, $item->price), $item->description, $item->img);
            $cartItem = new Cart($product, $item->quantity);
            array_push($productArray, $cartItem); 
        }
        

        return $productArray;
    }
    //$name, $price, $description, $img
   /*  function createProductList($array) {
        $productArray = array();
        foreach ($array as $item) { //Kan uppnås med array_map
            $name = $item->product->name;
            $price = $item->product->price;
            $description = $item->product->description;
            $img = $item->product->img;
            $quantity = $item->quantity;
            $products = new Product($name, $price, $description, $img);
            $orderItem = new Cart($product, $quantity);
            array_push($productArray, $orderItem);

            
        }
        return $productArray;
    } */

    function calculatePrice($quantity, $price){
        $finalPrice = $price * $quantity;
        return $finalPrice;
    }
    /* function totalPrice ($test) {
        
        $result = count($test);
        
        
        return $result;
    } */
    
}