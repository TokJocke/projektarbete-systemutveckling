<?php
 
    try {
    
        if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
            require("../repositories/cartRepo.php");
            
     
        
            if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET
        
                
                $pr = new CartRepo; 
                echo json_encode($pr->getCart());
                

            }
            else if ($_SERVER["REQUEST_METHOD"] == "POST") {
           
            }
        }
    }
    catch (Exception $e) { // om error har felmeddelande
        http_response_code($e->getCode());
        echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
    }