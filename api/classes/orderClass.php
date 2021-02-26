<?php


class OrderItem
{

    public function __construct($productId, $quantity, $unitPrice)
    {
        $this->productId = $productId;
        $this->unitPrice = $unitPrice;
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
        $this->shipper = $shipped;
        $this->shippingId = $shippingId;
    }
}

