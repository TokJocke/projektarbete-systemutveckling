<?php
 
    try {
    
        if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
            require("../repositories/productRepo.php");
     
        
            if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET
        
                 
                $pr = new ProductRepo; 
                echo json_encode($pr->getAllProducts()); 

            }
            else if ($_SERVER["REQUEST_METHOD"] == "POST") {
             
                $productData = json_decode($_POST["productData"]);
          /*      
                 echo json_encode($productData); 
 */
                    if($_FILES["image"]) {
                        $pr = new ProductRepo;
                       /*  echo json_encode($pr->uploadImage($_FILES["image"])); */
                        
                       //Parametrar = $name, $price, $description, $unitsInStock, $categoryID
                       echo json_encode($pr->addProduct($productData->inputName, $productData->inputPrice, $productData->inputDesc, null, $productData->inputCategory, $pr->uploadImage($_FILES["image"])));
                      
                        exit;
                    }
                
              
             
             
                //Parametrar = $name, $price, $description, $unitsInStock, $categoryID
         /*        addProduct("glada nappar", 10, "Sur som fan", null, 1) ;
                echo json_encode("true"); */
            } 
        }
    }
    catch (Exception $e) { // om error har felmeddelande
        http_response_code($e->getCode());
        echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
    }