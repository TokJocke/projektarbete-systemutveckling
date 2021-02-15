<?php
 
    try {
        session_start();

        if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
            require("../repositories/userRepo.php");
     
        
            if ($_SERVER["REQUEST_METHOD"] == "POST") { //IF METHOD = POST
              
                  $myArray = json_decode($_POST["newUser"]);
              
                //  $regName, $regUsername, $regPassword, $email, $regAdress, $regZip, $regPhone, $isAdmin
                    regUser($myArray->regName, 
                    $myArray->regUsername, 
                    $myArray->registerPassword, 
                    $myArray->Email, 
                    $myArray->regAddress,
                    $myArray->regZip, 
                    $myArray->regPhone,
                    0);
                    
                    echo json_encode(true);
              
                    
            }
        
        }
    }
    catch (Exception $e) { // om error har felmeddelande
        http_response_code($e->getCode());
        echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
    }