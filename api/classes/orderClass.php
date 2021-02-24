<?php

class orderItem
{

public function __construct($productId, $quantity)
{
$this->productId = $productId;
$this->quantity = $quantity;
}
}
class Order
{
public function __construct($orderId, $userId, $orderDate, $shipped, $shippingId)
{
$this->orderId = $orderId; 
$this->userId = $userId;
$this->orderDate = $orderDate;
$this->shipped = $shipped;
$this->shippingId = $shippingId;
}
}