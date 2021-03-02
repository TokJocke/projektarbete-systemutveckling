<?php 

class Product {
    function __construct($productId, $name, $price, $description, $unitsInStock, $categoryId, $offerId, $img) {
        $this->productId = $productId;
        $this->name = $name;
        $this->price = $price;
        $this->description = $description;
        $this->unitsInStock = $unitsInStock;
        $this->categoryId = $categoryId;
        $this->offerId = $offerId;
        $this->img = $img;
        
        }
}


?>