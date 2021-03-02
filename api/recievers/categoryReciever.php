<?php
 
    try {
    
        if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
            require("../repositories/categoryRepo.php");
     
        
            if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET
        
                $cr = new CategoryRepo; 
                echo json_encode($cr->getAllCategorys()); 
           
            }
            else if ($_SERVER["REQUEST_METHOD"] == "POST") {
             
              

                    
                
              
            } 
        }
    }
    catch (Exception $e) { // om error har felmeddelande
        http_response_code($e->getCode());
        echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
    }