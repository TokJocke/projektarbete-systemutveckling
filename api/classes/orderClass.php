<?php 

class Order {
    function __construct($name, $price, $quantity, $img) {
        $this->name = $name;
        $this->price = $price;
        $this->quantity = $quantity;
        $this->img = $img;
        
        }
}

?>