<?php

 
    try {
    
        if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
            session_start();

            require("../repositories/cartRepo.php");
            session_start();
            $userId = $_SESSION["user"];
            $cr = new CartRepo;
     
        
            if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET

                 
                if(isset($_GET["count"])){
                    echo json_encode($cr->countAmount($userId));
                }else{
                    echo json_encode($cr->getCart($userId));    

                }
                
                   
                
            }
            else if ($_SERVER["REQUEST_METHOD"] == "POST") {
                    $productId = $_POST["productId"];
                    /* $cr = new CartRepo;  */

                    // action = remove
                    //! parametern $userId måste vara samma som session userid
                if($_POST["action"] == "remove"){ 
                    echo json_encode($cr->deleteProducts($productId,$userId));

                // action = increase
                }else if($_POST["action"] == "increase"){ 
                    echo json_encode($cr->update( $productId,$userId));

                // action = decrease
                }else if($_POST["action"] == "decrease"){  
                    echo json_encode($cr->decrease($productId,$userId));

                // action = add
                }else if($_POST["action"] == "add"){
                    echo json_encode($cr->addProductToCart($userId ,$productId));
                }
                                    
                

            }


            ////update($userId,$productId,$quantity) tar in 3 para
        }
    
} catch (Exception $e) { // om error har felmeddelande
    http_response_code($e->getCode());
    echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
}
