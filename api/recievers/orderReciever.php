<?php
 
try {
 
    if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
        require("../repositories/orderRepo.php");

 
        if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET

                $or = new OrderRepo(); 
                echo json_encode($or->getAllOrders()); 
 
        }
       
    }
} catch (Exception $e) { // om error har felmeddelande
    http_response_code($e->getCode());
    echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
}