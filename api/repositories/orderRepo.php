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


    function placeOrder($shippingId)
    {
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
        $this->turnCartToOrderItem();
        return "ORDER SKICKAD";
        // foreach loop för alla cartitems,
    }

    function turnCartToOrderItem()
    {
        $userId = $_SESSION["user"];
        $cartList = $this->db->fetchQuery(
            "SELECT * 
            FROM product 
            INNER JOIN cart 
                ON  product.productId = cart.productId 
            WHERE userId = '$userId'"
        );

        $orderId = $this->db->fetchQuery(
            "SELECT  MAX(orderId) 
            FROM orders
            WHERE userId = '$userId'"
        );

        $id = get_object_vars($orderId[0]);

        foreach ($cartList as $item) {
            $this->insertOrderdetails($item->productId, $id["MAX(orderId)"], $item->quantity, $item->price);
            $this->updateUnitsInStock($item->productId, $item->quantity);
        }

        $this->emptyCart($userId);
        
    }



    function insertOrderdetails($productId, $orderId, $quantity, $unitPrice)
    {
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





function getAllOrders() {
    $allOrders = $this->db->fetchQuery("SELECT * FROM orders");  
    $orderArray = $this->createOrderList($allOrders); 
    return $orderArray;
}

function getCurrentUsersOrder($userId) {
    
/* 
    $allOrders = $this->db->fetchQuery(
    "SELECT DISTINCT orders.orderDate,orders.orderId,orders.pending,product.productName,orderdetails.quantity, orders.shipped, orders.shippingId, orders.userId    FROM orderdetails
    INNER JOIN orders
    ON orderdetails.orderId = orders.orderId
    INNER JOIN product
    ON orderdetails.productId = product.productId 
    WHERE orders.userId = $userId
    ORDER BY orders.pending DESC");
    return $allOrders; */
    /* $allOrders = $this->db->fetchQuery(
        "SELECT DISTINCT orders.orderDate,orders.orderId,orders.pending,product.productName,orderdetails.quantity, orders.shipped, orders.shippingId, orders.userId    FROM orderdetails
        INNER JOIN orders
        ON orderdetails.orderId = orders.orderId
        INNER JOIN product
        ON orderdetails.productId = product.productId 
        WHERE orders.userId = $userId
		ORDER BY orders.pending DESC");  
        $orderArray = $this->createOrderList($allOrders);

    return $orderArray; */
    //ORGINAL
    $allOrders = $this->db->fetchQuery(
    "SELECT * FROM orders 
    WHERE userId = $userId
    ORDER BY pending ASC"); 
    $orderArray = $this->createOrderList($allOrders); 
    return $orderArray;
}

function createOrderList($array) {
    $orderArray = array();
    foreach ($array as $item) { 
        $order = new Order($item->orderId,$item->userId, $item->orderDate,$item->shipped, $item->shippingId, $item->pending);
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


function updateRecieved($orderId, $sent) { 
    
    foreach ($orderId as $id) {       
    
    $query = "UPDATE orders SET pending=:recieved WHERE orderId =:id";

    $entity = array(
        'id' => $id, 
        'recieved' => $sent); 

        $this->db->runQuery($query, $entity);
            
    } 
    return "Order(s) was set as recieved";
}

}
