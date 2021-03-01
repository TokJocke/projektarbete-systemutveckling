<?php



try {

    if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
        require "../repositories/orderRepo.php";
        /* require "../handlers/dbHandler.php"; */

        if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET
 
            $or = new OrderRepo(); 
            echo json_encode($or->getAllOrders()); 
        }
    

        if ($_SERVER["REQUEST_METHOD"] == "POST") { //IF METHOD = POST

            if ($_POST["action"] == "sendOrder") {
 
                $or = new OrderRepo();
                echo json_encode($or->placeOrder($_POST["shipper"]));
            }
           
            if ($_POST["action"] == "loadAdminOrder") {
   
                $cbArray = json_decode($_POST["cbArray"]);
                
                $or = new OrderRepo();
                $or->updateShipped($cbArray); 
     
                echo json_encode($cbArray);
            }

        }
        


        

    
    }
} catch (Exception $e) { // om error har felmeddelande
    http_response_code($e->getCode());
    echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
}

?>