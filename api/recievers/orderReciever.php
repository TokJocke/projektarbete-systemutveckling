<?php



try {

    if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
        require "../repositories/orderRepo.php";
        /* require "../handlers/dbHandler.php"; */
        /* session_start(); */
        $userId = $_SESSION["user"];
        if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET

 
            $or = new OrderRepo(); 
            if(isset($_GET["user"])){
                echo json_encode($or->getCurrentUsersOrder($userId));
            }else{
                echo json_encode($or->getAllOrders()); 
                    
            }
        }
    



        if ($_SERVER["REQUEST_METHOD"] == "POST") { //IF METHOD = POST'

            if ($_POST["action"] == "sendOrder") {

                $or = new OrderRepo();
                echo json_encode($or->placeOrder($_POST["shipper"]));
            } else if ($_POST["action"] == "loadAdminOrder") {

                $cbArray = json_decode($_POST["cbArray"]);

                $or = new OrderRepo();
                $or->updateShipped($cbArray);

                echo json_encode($cbArray);
            }
            else if ($_POST["action"] == "pending") {
                   
                    $checkedArr = json_decode($_POST["checkedArr"]);
                    $notCheckedArr = json_decode($_POST["notCheckedArr"]);
                
                $or = new OrderRepo();
                $or->updateRecieved($checkedArr, 1);
                $or->updateRecieved($notCheckedArr, 0); 
     
                echo json_encode(true);
            }

        }
    }
} catch (Exception $e) { // om error har felmeddelande
    http_response_code($e->getCode());
    echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
}
