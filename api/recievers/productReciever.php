<?php
 
    try {
    
        if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
            require("../repositories/productRepo.php");
            
     
        
            if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET
        
                // här blir det fel med att hämta getTotalPrice, funkar ej
                $pr = new ProductRepo; 
                echo json_encode($pr->getAllProducts()); 

            }
            else if ($_SERVER["REQUEST_METHOD"] == "POST") {

             
                //Add product
                if($_FILES["image"]) {
                   
                    $productData = json_decode($_POST["productData"]);
                    $pr = new ProductRepo;
                        
                       //Parametrar = $name, $price, $description, $unitsInStock, $categoryID, $img
                       echo json_encode($pr->addProduct($productData->inputName, $productData->inputPrice, $productData->inputDesc, null, $productData->inputCategory, $pr->uploadImage($_FILES["image"])));
                      
                        exit;
                }
                //Remove product
                else if($_POST["action"] == "removeProduct"){

                    $products = json_decode($_POST["product"]);
                 
                    $pr = new ProductRepo;
                    echo json_encode($pr->removeProduct($products->productId, $products->img));  
                }
                //Update product
                else if($_POST["action"] == "updateProduct"){ 

                    $product = json_decode($_POST["product"]);
                    $pr = new ProductRepo;
                    echo json_encode($pr->updateProduct($product[0], $product[1], $product[2], $product[3], $product[4], $product[5]));
                    

                }
             
   
            } 


        
        }
    } 
    catch (Exception $e) { // om error har felmeddelande
    http_response_code($e->getCode());
    echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
}
