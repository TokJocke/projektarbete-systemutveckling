<?php
require "../handlers/dbHandler.php";
require "../classes/orderClass.php";
class orderRepo {
        function __construct()  {
            $this->db = new Database();
           }
function getCart() {
        $db = new Database();
        $db->fetchQuery("SELECT cart.productID AS cartID, productName, price, quantity 
        FROM product
        INNER JOIN cart
        ON product.productID = cart.productID");
    }
}