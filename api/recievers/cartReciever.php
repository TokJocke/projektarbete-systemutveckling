<?php
 
    try {
    
        if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
            require("../repositories/cartRepo.php");
            
     
        
            if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET

                $pr = new CartRepo; 
                echo json_encode($pr->getCart());
            
            }
            else if ($_SERVER["REQUEST_METHOD"] == "POST") {
                
                 if($_POST["action"] == "remove"){ // action = remove
                        
                        $productID = $_POST["productID"];
                      
                        $pr = new CartRepo; 
                        echo json_encode($pr->deleteProducts( $productID));

                    }else if($_POST["action"] == "increase"){ // action = increase
                       
                       
                        $quantity = $_POST["quantity"];
                        $productID = $_POST["productID"];
                      
                       $pr = new CartRepo; 
                        echo json_encode($pr->update( ++$quantity, $productID));
                        
                        }
                            else if($_POST["action"] == "decrease"){ // action = decrease
                                
                                
                                $quantity = $_POST["quantity"];
                                $productID = $_POST["productID"];
                                
                                
                                $pr = new CartRepo; 
                                echo json_encode($pr->update( --$quantity, $productID));
                                
                                }
                 
                
                ////update($userId,$productId,$quantity) tar in 3 para
            }
        }
    }
    catch (Exception $e) { // om error har felmeddelande
        http_response_code($e->getCode());
        echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
    }