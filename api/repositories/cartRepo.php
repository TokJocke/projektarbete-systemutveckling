<?php
require "../handlers/dbHandler.php";
require "../classes/productClass.php";
require "../classes/cartClass.php";
require_once "../classes/offerClass.php";
class CartRepo
{
    function __construct()
    {
        $this->db = new Database();
    }


    function getProductsInCart($userId)
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

    function getOffersInCart($userId) {
       
        $allInOffer = $this->db->fetchQuery("
        SELECT DISTINCT offer.offerName, cart.quantity 
        FROM offer 
        INNER JOIN cart on offer.offerName = cart.offerName 
        WHERE userId = $userId");
       
        if (empty($allInOffer)) {
            return false;
        } else {
            $offerArray = $this->createOfferList($allInOffer);
            return $offerArray;
        }
            /* $allInOffer = $this->db->fetchQuery("
            SELECT offer.offerName, discount, offer.quantity, product.price, product.productName 
            FROM offer 
            INNER JOIN product ON offer.productId = product.productId 
            INNER JOIN cart on offer.offerName = cart.offerName 
            WHERE userId = $userId"); */


    }

    function getCart($userId) {
        $cart = array();
        $getOffers = $this->getOffersInCart($userId);
        $getProducts = $this->getProductsInCart($userId);
        array_push($cart, $getProducts, $getOffers);
        return $cart;
    }

    function createProductList($productList)
    {
        $cartItems = array();
        $totalPrice = 0;

        foreach ($productList as $item) {
            $product = new Product($item->productId, $item->productName, (int) $item->price, $item->description, $item->unitsInStock, (int) $item->categoryId, $item->img);
            $cartItem = new CartItem($product, (int) $item->quantity, $this->calculatePrice($item->quantity, $item->price), (int)$item->productId, (int)$item->userId);

            $totalPrice += $cartItem->totalPrice;
            array_push($cartItems, $cartItem);
        }
        return new Cart($cartItems, $totalPrice);
    }
 
    //Require buggar så vi kopierar funktionen
    function createOfferList($array) {
        $offersArray = array();
        foreach ($array as $item) { //Kan uppnås med array_map
            $offer = new Offer($item->offerName, $item->discount, $item->productId, $item->quantity, $item->productName, $item->price);
            array_push($offersArray, $offer);
        }
        return $offersArray;
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

        // funktion som lägger till en offer i cart
        function addOfferToCart($userId, $offerName)
        {
            $cartList = $this->db->fetchQuery(
                "SELECT quantity FROM cart 
                WHERE userId = $userId
                AND offerName = '$offerName'"
            );
            $result = $cartList[0]->quantity;
            if ($result > 0) {
                $this->updateOfferInCart($offerName, $userId);
            }  
    
            $query = ("INSERT INTO cart (userId, productId, quantity, offerName) 
                VALUES (:userId, null, quantity +1, :offerName)");
    
            $entity = array(
                ':userId' => $userId, 
                ':offerName' => $offerName);
            
            $this->db->runQuery($query, $entity);
            
            return "added $offerName to $userId";
        }


    //funktion update som tar in value i parametern som avgör vilken produkt vars kvantitet ska updateras
    // SKAPA if sats för update product/offer
    function update($productId, $userId) {

        if(is_numeric($productId)) {
            
            $query = ("UPDATE cart SET quantity = quantity + 1 
            WHERE productId = $productId
            AND userId = $userId");
            $entity = array($productId);
            $this->db->runQuery($query, $entity);
            return "added 1";

        }
        else if (is_string($productId)) {
            $query = ("UPDATE cart SET quantity = quantity + 1 
            WHERE offerName = $productId
            AND userId = $userId");
            $entity = array($productId);
            $this->db->runQuery($query, $entity);
            return "added 1";
        }


        
           /*       {
                    $query = ("UPDATE cart SET quantity = quantity + 1 
                    WHERE productId = $productId
                    AND userId = $userId");
                    $entity = array($productId);
                    $this->db->runQuery($query, $entity);
                    return "added 1";
               */
    }



         
    
    function updateOfferInCart($OfferName, $userId) {
        
            
        $query = ("UPDATE cart SET quantity = quantity + 1 
        WHERE offerName = '$OfferName'
        AND userId = $userId");
        $entity = array($OfferName);
        $this->db->runQuery($query, $entity);
        //  return "added 1";
    }
   
   
   
   
    //funktion update som tar in value i parametern som avgör vilken produkt vars kvantitet ska updateras

    function decrease($productId, $userId)
    {
        if(is_numeric($productId)) {
            //gör en fetch på productid
            $query = ("UPDATE cart SET quantity = quantity - 1 
                WHERE productId = $productId
                AND userId = $userId");
            $entity = array($productId);
            $this->db->runQuery($query, $entity);
            return "removed 1";
        }
        else if (is_string($productId)) {
            $query = ("UPDATE cart SET quantity = quantity - 1 
            WHERE offerName = $productId
            AND userId = $userId");
            $entity = array($productId);
            $this->db->runQuery($query, $entity);
            return "removed 1";
        }
        
    }
    //funktion deleteProducts som tar in ett value i parametern som avgör vilken produkt som ska tas bort i cart
    function deleteProducts($productId, $userId)
    {
        if(is_numeric($productId)) {
            $query = ("DELETE FROM cart 
                WHERE productId = $productId
                AND userId = $userId");
            $entity = array($productId);
            $this->db->runQuery($query, $entity);
            return "remove sucessfull";
        }
        else if (is_string($productId)) { 
            $query = ("DELETE FROM cart 
                WHERE offerName = $productId
                AND userId = $userId");
            $entity = array($productId);
            $this->db->runQuery($query, $entity);
            return "remove sucessfull";

        }


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
