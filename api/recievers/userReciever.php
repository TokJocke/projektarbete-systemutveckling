<?php
 
    try {
        
        if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
            require("../repositories/userRepo.php");
            

            
            if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET
         
            }
        
            if ($_SERVER["REQUEST_METHOD"] == "POST") { //IF METHOD = POST

                if($_POST["action"] == "register") {

                  $myArray = json_decode($_POST["newUser"]);
              
                //  $regName, $regUsername, $regPassword, $email, $regAdress, $regZip, $regPhone, $isAdmin
                    $name = $myArray->regName; 
                    $reguserName = $myArray->regUsername;
                    $regPassword = $myArray->registerPassword;
                    $Email = $myArray->Email;
                    $regAddress = $myArray->regAddress;
                    $regZip = $myArray->regZip; 
                    $regPhone = $myArray->regPhone;

                    $newsletter = $myArray->newsletter;

                    regUser($name, $reguserName, $regPassword, $Email, $regAddress, $regZip, $regPhone, 0);

                    if($newsletter == "Yes") {
                        signUpNewsletter($reguserName);
                    }
                    
                    echo json_encode("Successfully signed up" . " " . $reguserName);
                }   
            }      
                    if($_POST["action"] == "login") {

                       $myArray = json_decode($_POST["logdetails"]);

                        $un = $myArray->username;
                        $pw = $myArray->pw;

                        login($un, $pw);            
                        
            } 
        }

                    
    }
    catch (Exception $e) { // om error har felmeddelande
        http_response_code($e->getCode());
        echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
    }