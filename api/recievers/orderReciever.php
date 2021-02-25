<?php
 
try {
 
    if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
       


 
        if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET
 
                echo json_encode(true);
        }
 
       
            
    
        
    }
} catch (Exception $e) { // om error har felmeddelande
    http_response_code($e->getCode());
    echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
}