<?php
 
    try {
    
        if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
            require("../repositories/offerRepo.php");
     
        
            if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET
               
                $or = new OfferRepo; 

                echo json_encode($or->getAllOffers()); 

           
            }
            else if ($_SERVER["REQUEST_METHOD"] == "POST") {
             
                $or = new OfferRepo; 
                $offerData = json_decode($_POST["offerData"]);

                
                if($_POST["offerData"]) {
                    echo json_encode($or->addOffer($offerData->offerName, $offerData->offerDiscount)); 
                } 
                else if($_POST["offerCheck"] && $_POST["offerId"]) {
                    $offerId = json_decode($_POST["offerId"]);
                    $offerCheck = json_decode($_POST["offerCheck"]);

                    echo json_encode($or->changeOffer($offerCheck, (int)$offerId));
                   // echo json_encode($offerCheck);
                } 
                else if($_POST["removeOfferCheck"]) {
                    $removeOfferCheck = json_decode($_POST["removeOfferCheck"]);
                    echo json_encode($or->changeOffer($removeOfferCheck, null));

                }
                else if($_POST["removeOffer"]) {
                    $offerId = json_decode($_POST["removeOffer"]);
                    echo json_encode($or->removeOffer($offerId));
                }
                    
                
              
            } 
        }
    }
    catch (Exception $e) { // om error har felmeddelande
        http_response_code($e->getCode());
        echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
    }