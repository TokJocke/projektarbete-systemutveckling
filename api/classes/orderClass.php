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
    public function __construct($orderId, $userId, $orderDate, $shipped, $shippingId,$pending)
    {
        $this->orderId = $orderId;
        $this->userId = $userId;
        $this->orderDate = $orderDate;
        $this->shipped = $shipped;
        $this->shippingId = $shippingId;
        $this->pending = $pending;
    }

}

