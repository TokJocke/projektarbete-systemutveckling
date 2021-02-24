<?php

require "../handlers/dbHandler.php";
require "../classes/orderClass.php";

class OrderRepo
{
public function __construct()
{
$this->db = new Database();
}

function placeOrder($userId, $orderDate, $shippingId)
{
$query = ('
INSERT INTO orders (userId, orderDate, shippingId) 
VALUES (:userId, :orderDate, :shippingId)');
$entity = array(
':userId' => $userId,
':orderDate' => $orderDate,
':shippingId' => $shippingId,
);

$this->db->runQuery($query, $entity);
return "order placed";
}

function createOrderItem($userId)
{
$cart = $this->db->fetchQuery(
"SELECT * 
FROM product 
INNER JOIN cart 
ON product.productId = cart.productId 
WHERE userID = '$userId'"
);

$myArray = array();
foreach ($cart as $cartItem) {
$cartItem;
array_push($myArray, $cartItem);
}
return $myArray;
}


function getAllOrders() {
    $allOrders = $this->db->fetchQuery("SELECT * FROM orders");  
    /* $orderArray = $this->createOrderList($allOrders);  */
    return $allOrders;
}
 
function createOrderList($array) {
    $orderArray = array();
    foreach ($array as $item) { 
        $order = new Order($item->orderId, $item->userId, $item->orderDate, $item->shipped, $item->shippingId);
        array_push($orderArray, $order);
    }
    return $orderArray;
}
 
}