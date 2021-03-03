<?php 

class Product {
    function __construct($productId, $name, $price, $description, $unitsInStock, $categoryId, $img) {
        $this->productId = $productId;
        $this->name = $name;
        $this->price = $price;
        $this->description = $description;
        $this->unitsInStock = $unitsInStock;
        $this->categoryId = $categoryId;
        $this->img = $img;
        
        }
}


?>