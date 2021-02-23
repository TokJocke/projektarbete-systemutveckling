<?php
 
    try {
    
        if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
            require("../repositories/cartRepo.php");
            $userId = 1;
     
        
            if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET
                
                $cr = new CartRepo; 
                echo json_encode($cr->getCart($userId));    
                
            }
            else if ($_SERVER["REQUEST_METHOD"] == "POST") {
                    $productId = $_POST["productId"];
                    $cr = new CartRepo; 
                    
                 if($_POST["action"] == "remove"){ // action = remove
                        echo json_encode($cr->deleteProducts( $productId));

                    }else if($_POST["action"] == "increase"){ // action = increase
                        echo json_encode($cr->update( $productId));
                        
                        }else if($_POST["action"] == "decrease"){ // action = decrease                          
                            echo json_encode($cr->decrease($productId));
                                
                            }else if($_POST["action"] == "add"){ // action = add'
                                    
                                    if(isset($productId))
                                    
                                    echo json_encode($cr->addProductToCart($userId ,$productId));
                                    }
                                    else{
                                        echo json_encode("hej");
                                    }  
                                
                                /* if(array_key_exists($productId, $productId)){
                                    echo json_encode("hej");
                                } */
                                   /*  echo json_encode($productId); */
                                /* $pr = new CartRepo; 
                                echo json_encode($pr->decrease($productId)); */
                            
                 
                
                ////update($userId,$productId,$quantity) tar in 3 para
            }
        }
    }
    catch (Exception $e) { // om error har felmeddelande
        http_response_code($e->getCode());
        echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
    }