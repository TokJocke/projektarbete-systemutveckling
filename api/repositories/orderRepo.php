<?php
require "../handlers/dbHandler.php";
require "../classes/orderClass.php";
class OrderRepo {
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
    function getTotalPrice() {
        
        $cartList = $this->db->fetchQuery(
        "SELECT sum(price) as totalprice
        FROM product INNER JOIN cart ON  product.productID = cart.productID");
        $productArray = $this->createProductList($cartList);
        return $productArray;
    }
    
    //Skapa lista med produktinstanser
    function createProductList($array) {
        $productArray = array();
        foreach ($array as $item) { //Kan uppnås med array_map
            $product = new Order($item->productName, (int)$item->price, $item->quantity, $item->img);
            array_push($productArray, $product);
        }
        return $productArray;
    }
}