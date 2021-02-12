<?php 
    require "../handlers/dbHandler.php";

   
     function getAllProducts() {
        $db = new Database();
        $db->fetchQuery("SELECT * FROM Product");
       
    }


/*     function addTestProduct() {
        $db = new Database();
        $db->addTestProduct();
    }  */

    function addTestProduct() {
            
        $db = new Database() ;

        $db->runQuery("INSERT INTO product (productName, price, description, unitsInStock) 
        VALUES (:productName, :price, :description, :unitsInStock)", 
        array("productName" => "lakritsknapp", "price" => 10, "description" => "supergod", "unitsInStock" => 3));

    }


?>

