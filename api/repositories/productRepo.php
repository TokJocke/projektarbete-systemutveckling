<?php 
    require "../handlers/dbHandler.php";

   
     function getAllProducts() {
        $db = new Database();
        $db->fetchQuery("SELECT * FROM Product");
       
    }

     function addProduct($name, $price, $description, $unitsInStock, $categoryID) {
        
        $query = ('INSERT INTO product (productName, price, description, unitsInStock, categoryID) 
        VALUES (:productName, :price, :description, :unitsInStock, :categoryID)');
        $entity = array(':productName' => $name, ':price' => $price, ':description' => $description, 
        ':unitsInStock' => $unitsInStock, 'categoryID' => $categoryID);
        
        $db = new Database();
        $db->runQuery($query, $entity);

    } 


?>

