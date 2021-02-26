<?php

try {

    if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
        require("../repositories/userRepo.php");
        $ur = new userRepo;


        if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET

            session_start();
            $userId = $_SESSION["user"];
            if(isset($_GET["check"])){
                echo json_encode($ur->isAdminInfo($userId));
            }else if (isset($_GET["user"])){
                
                echo json_encode($ur->UserInfo($userId));
            }/*else{
                
                echo json_encode($ur->UserInfo($userId));
            }*/
            /* echo json_encode($ur->userInfo($userId)); */

            $ur = new UserRepo(); 
            echo json_encode($ur->getAllUsers());


        }

        if ($_SERVER["REQUEST_METHOD"] == "POST") { //IF METHOD = POST

            if ($_POST["action"] == "register") {

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
    
                $ur = new UserRepo();

                $ur->regUser($name, $reguserName, $regPassword, $Email, $regAddress, $regZip, $regPhone, 0);

                if ($newsletter == "Yes") {
                    $ur->signUpNewsletter($reguserName);
                }

                echo json_encode("Successfully signed up");
            }
        }
        if ($_POST["action"] == "login") {

            $myArray = json_decode($_POST["logdetails"]);

            $un = $myArray->username;
            $pw = $myArray->pw;

            $ur = new UserRepo();

            $ur->login($un, $pw);
        }

        if ($_POST["action"] == "newsletter") {

            $myArray = json_decode($_POST["newsL"]);
            $name = $myArray->name;
            $email = $myArray->email;

            $ur = new UserRepo();

            $ur->newsNoSignUp($email, $name);
            echo json_encode("Signed up for newsletter");
        }
        
        if ($_POST["action"] == "updateUser") {

            $checkedArr = json_decode($_POST["checkedArr"]);
            $notCheckedArr = json_decode($_POST["notCheckedArr"]);

            $ur = new UserRepo(); 
            $ur->updateUser($checkedArr, 1); 
            $ur->updateUser($notCheckedArr, 0); 
            
            echo json_encode(true);

        }
    }
} catch (Exception $e) { // om error har felmeddelande
    http_response_code($e->getCode());
    echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
}
