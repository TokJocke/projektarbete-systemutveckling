<?php
require "../handlers/dbHandler.php";
require "../classes/productClass.php";
require "../classes/cartClass.php";
class CartRepo
{
    function __construct()
    {
        $this->db = new Database();
    }


    function getCart($userId)
    {
        $cartList = $this->db->fetchQuery(
            "SELECT * FROM product 
        INNER JOIN cart 
        ON  product.productId = cart.productId
        WHERE userId = $userId"
        );

        if (empty($cartList)) {
            return false;
        } else {
            $productArray = $this->createProductList($cartList);
            return $productArray;
        }
    }

    function createProductList($productList)
    {
        $cartItems = array();
        $totalPrice = 0;

        foreach ($productList as $item) {
            $product = new Product($item->productId, $item->productName,(int) $item->price, $item->description, $item->unitsInStock,(int) $item->categoryId, $item->offerId, $item->img);
            $cartItem = new CartItem($product, (int) $item->quantity, $this->calculatePrice($item->quantity, $item->price), (int)$item->productId, (int)$item->userId);

            $totalPrice += $cartItem->totalPrice;
            array_push($cartItems, $cartItem);
        }
        return new Cart($cartItems, $totalPrice);
    }

    //funktion som räknar kvantitet * styck pris
    function calculatePrice($quantity, $price)
    {
        $finalPrice = $price * $quantity;
        return $finalPrice;
    }

    // funktion som lägger till en produkt i cart
    function addProductToCart($userId, $productId)
    {
        $cartList = $this->db->fetchQuery(
            "SELECT * FROM cart 
            WHERE userId = $userId
            AND productId = $productId"
        );
        $result = $cartList[0]->quantity;
        if ($result > 0) {
            $this->update($productId, $userId);
        }

        $query = ("INSERT INTO cart (userId, productId, quantity) 
            VALUES ($userId, $productId, quantity +1)");

        $entity = array($userId, $productId);
        $this->db->runQuery($query, $entity);
        return "added $productId to $userId";
    }


    //funktion update som tar in value i parametern som avgör vilken produkt vars kvantitet ska updateras
    function update($productId, $userId)
    {
        $query = ("UPDATE cart SET quantity = quantity + 1 
            WHERE productId = $productId
            AND userId = $userId");
        $entity = array($productId);
        $this->db->runQuery($query, $entity);
        return "added 1";
    }
    //funktion update som tar in value i parametern som avgör vilken produkt vars kvantitet ska updateras

    function decrease($productId, $userId)
    {
        //gör en fetch på productid
        $query = ("UPDATE cart SET quantity = quantity - 1 
            WHERE productId = $productId
            AND userId = $userId");
        $entity = array($productId);
        $this->db->runQuery($query, $entity);
        return "removed 1";
    }
    //funktion deleteProducts som tar in ett value i parametern som avgör vilken produkt som ska tas bort i cart
    function deleteProducts($productId, $userId)
    {
        $query = ("DELETE FROM cart 
            WHERE productId = $productId
            AND userId = $userId");
        $entity = array($productId);
        $this->db->runQuery($query, $entity);
        return "remove sucessfull";
    }

    // function hämtar och summerar antalet i quantity i cart
    function countAmount($userId)
    {
        $query = $this->db->fetchquery(
            "SELECT sum(quantity) as antal  FROM cart
            WHERE userId = $userId"
        );
        return $query;
    }
}
