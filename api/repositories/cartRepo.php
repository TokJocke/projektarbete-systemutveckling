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
            $product = new Product($item->productId, $item->name,(int) $item->price, $item->description, $item->unitsInStock,(int) $item->categoryId, $item->img);
            $cartItem = new CartItem($product, (int) $item->quantity, $this->calculatePrice($item->quantity, $item->price), (int)$item->productID, (int)$item->userID);
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
    //funktion deleteProducts som tar in ett value i parametern som avgör vilken produkt som ska tas bort i cart
    function deleteProducts($productId){
        $query = ("DELETE FROM cart WHERE productID = $productId");
        $entity = array($productId);
        $db = new Database();
        $db->runQuery($query,$entity);
        return "remove sucessfull";
    }
    /* $query = ("INSERT INTO cart (productID, quantity) VALUES (:productID, :quantity)");
    $entity = array(":productID" =>$productId,":quantity" =>$quantity); */

    //funktion update som tar in value i parametern som avgör vilken produkt vars kvantitet ska updateras
    function update($quantity, $productId){ 
        $query = ("UPDATE cart SET quantity = $quantity WHERE productID = $productId");
        $entity = array($quantity,$productId);
        $db = new Database();
        $db->runQuery($query, $entity);
        return "sucess";
    }

}