<?php

try {

    if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
        require("../repositories/userRepo.php");



        if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET


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
               /*  regUser($name, $reguserName, $regPassword, $Email, $regAddress, $regZip, $regPhone, 0); */

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
    }
} catch (Exception $e) { // om error har felmeddelande
    http_response_code($e->getCode());
    echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
}
