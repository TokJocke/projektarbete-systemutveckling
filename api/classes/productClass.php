<?php 

class Product {
    function __construct($name, $price, $description, $img) {
        $this->name = $name;
        $this->price = (int) $price;
        $this->description = $description;
        $this->img = $img;
        
        }
    
    public $price;
}


?>