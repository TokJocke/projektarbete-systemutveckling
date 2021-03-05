<?php


require "../handlers/dbHandler.php";
require "../classes/orderClass.php";

session_start();

class OrderRepo
{

    function __construct()
    {
        $this->db = new Database();
    }


    function placeOrder($shippingId, $array)
    {
        // hämtar cart
        //$cart = $this->activeUserCart();
        
        
        $productCart = $array[0];
        $offerCart = $array[1];

        // gör en check på ifall unitsinstock är mindre än quantity
        if(!empty($productCart)) {
            foreach ($productCart as $product) {
                $quantity = $product->quantity;
                $unitsInStock = $product->unitsInStock;
                
                if($unitsInStock < $quantity){
                    return $product->productName . " har bara " . $unitsInStock . " kvar i lager";   
                    }
            } 
             //kontrollera ifall lagetstatus stämmer
             $userId = $_SESSION["user"];
             $orderDate = date("l jS \of F Y h:i:s A");
    
             $query = ('
             INSERT INTO orders (userId, orderDate, shippingId) 
             VALUES (:userId, :orderDate, :shippingId)');
             $entity = array(
                 ':userId' => $userId,
                 ':orderDate' => $orderDate,
                 ':shippingId' => $shippingId,
             );
             $this->db->runQuery($query, $entity);
             $this->turnCartToOrderItem($productCart);
            // return "ORDER SKICKAD";
             // foreach loop för alla cartitems,

        } 
        if(!empty($offerCart)) {

            $nyArray = array();
         
            foreach ($offerCart as $offer) {
                $offerPrice = array();
                $offers = $this->db->fetchQuery(
                    "SELECT product.productId, offer.quantity, offer.discount,  product.price FROM offer 
                    INNER JOIN product 
                    ON offer.productId = product.productId 
                    WHERE offerName = '$offer->offerName'"      
                ); 
                $userId = $_SESSION["user"];
                $orderDate = date("l jS \of F Y h:i:s A");
                $query = ('
                INSERT INTO orders (userId, orderDate, shippingId) 
                VALUES (:userId, :orderDate, :shippingId)');
                $entity = array(
                    ':userId' => $userId,
                    ':orderDate' => $orderDate,
                    ':shippingId' => $shippingId,
                );
                $this->db->runQuery($query, $entity);

                 foreach ($offers as $product) { 

        

                    $offerDiscount = $product->discount / 100;
                    $offerProductPrice = $product->price * ($product->quantity);   
                    array_push($offerPrice, $offerProductPrice);
                    $this->updateUnitsInStock($product->productId, $product->quantity * $offer->quantity);
                } 
                $offerProductTotalPrice = array_sum($offerPrice);
                $offerTotalDiscounted = $offerProductTotalPrice - ($offerProductTotalPrice * $offerDiscount);
               
                $flooredTotal = floor($offerTotalDiscounted);
                array_push($nyArray, $flooredTotal) ;

            } 
            $this->turnOfferToOrderItem($offerCart, $nyArray);
            
     
        } 
    $this->emptyCart($userId);  
    }
    
    
    function turnCartToOrderItem($products)
    {
        $userId = $_SESSION["user"];
        $orderId = $this->db->fetchQuery(
            "SELECT MAX(orderId) 
            FROM orders
            WHERE userId = '$userId'"
        );
        $id = get_object_vars($orderId[0]);
        foreach ($products as $item) {
            foreach ($item as $key) {
                $this->insertOrderdetails($key->productId, $id["MAX(orderId)"], $key->quantity, $key->product->price);
                $this->updateUnitsInStock($key->productId, $key->quantity); 
            }
        }  
    }

    function turnOfferToOrderItem($offer, $total)
    {
        $userId = $_SESSION["user"];
        $orderId = $this->db->fetchQuery(
            "SELECT MAX(orderId) 
            FROM orders
            WHERE userId = '$userId'"
        );
        $id = get_object_vars($orderId[0]);
        
        
        for($i = 0; $i < count($offer); $i++) {  
            $this->insertOrderdetails($offer[$i]->offerName, $id["MAX(orderId)"], $offer[$i]->quantity, $total[$i]); 
           
        }





    }



    function insertOrderdetails($productId, $orderId, $quantity, $unitPrice)
    {
        
        if (is_numeric($productId)) {   
            $query = ('
            INSERT INTO orderdetails (productId, orderId, quantity, unitPrice) 
            VALUES (:productId, :orderId, :quantity, :unitPrice)');
            $entity = array(
                ':productId' => $productId,
                ':orderId' => $orderId,
                ':quantity' => $quantity,
                ':unitPrice' => $unitPrice
            );
            $this->db->runQuery($query, $entity);
        }
        
        else if (is_string($productId)) {
            $query = ('
            INSERT INTO orderdetails (offerName, orderId, quantity, unitPrice) 
            VALUES (:offerName, :orderId, :quantity, :unitPrice)');
            $entity = array(
                ':offerName' => $productId,
                ':orderId' => $orderId,
                ':quantity' => $quantity,
                ':unitPrice' => $unitPrice
            );
            $this->db->runQuery($query, $entity);
        } 

    }


    function activeUserCart()
    {
        $userId = $_SESSION["user"];
        $cartList = $this->db->fetchQuery(
            "SELECT * FROM product INNER JOIN cart ON  product.productId = cart.productId WHERE userId = '$userId'"
        );
        return $cartList;
    }


    function updateUnitsInStock($productId, $quantity)
    {
        $query = ("UPDATE product SET unitsInStock = unitsInStock - '$quantity' WHERE productId = '$productId' ");
        $entity = array($productId, $quantity);
        $this->db->runQuery($query, $entity);
        return "productsRemoved";
    }

    function emptyCart($userId)
    {
        $query = ("DELETE FROM cart WHERE userID = '$userId'");
        $entity = array($userId);
        $this->db->runQuery($query, $entity);
        return "cartEmpy";
    }





    function getAllOrders()
    {
        $allOrders = $this->db->fetchQuery("SELECT * FROM orders");
        $orderArray = $this->createOrderList($allOrders);
        return $orderArray;
    }

    function getCurrentUsersOrder($userId)
    {

     
        $allOrders = $this->db->fetchQuery(
            "SELECT * FROM orders 
            WHERE userId = $userId
            ORDER BY pending ASC"
        );
        $orderArray = $this->createOrderList($allOrders);
        return $orderArray;
    }

    function createOrderList($array)
    {
        $orderArray = array();
        foreach ($array as $item) {
            $order = new Order($item->orderId, $item->userId, $item->orderDate, $item->shipped, $item->shippingId, $item->pending);
            array_push($orderArray, $order);
        }
        return $orderArray;
    }

        //ORGINAL
        /* function createOrderList($array) {
        $orderArray = array();
        foreach ($array as $item) { 
            $order = new Order($item->orderId, $item->userId, $item->orderDate, $item->shipped, $item->shippingId,$item->pending);
            array_push($orderArray, $order);
        }
        return $orderArray;
    } */


    function updateShipped($orderId)
    {

        foreach ($orderId as $id) {

            $query = "UPDATE orders SET shipped=:shipOut WHERE orderId =:id";

            $entity = array(
                'id' => $id,
                'shipOut' => 1
            );

            $this->db->runQuery($query, $entity);
        }
        return "Order(s) was set as shipped";
    }


    function updateRecieved($orderId, $sent)
    {

        foreach ($orderId as $id) {

            $query = "UPDATE orders SET pending=:recieved WHERE orderId =:id";

            $entity = array(
                'id' => $id,
                'recieved' => $sent
            );

            $this->db->runQuery($query, $entity);
        }
        return "Order(s) was set as recieved";
    }
}
