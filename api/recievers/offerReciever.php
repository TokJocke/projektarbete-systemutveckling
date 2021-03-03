<?php
 
    try {
    
        if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
            require("../repositories/offerRepo.php");
     
        
            if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET
               
                $or = new OfferRepo; 

                if(isset($_GET["testing"])) {

                    echo json_encode($or->testing($_GET["testing"]));
                }
                else {
                    echo json_encode($or->getAllOffers()); 
                }


           
            }
            else if ($_SERVER["REQUEST_METHOD"] == "POST") {
             
                $or = new OfferRepo; 
               // $offerData = json_decode($_POST["offerData"]);

                
    /*             if($_POST["offerData"]) {
                     echo json_encode($or->addOffer($offerData->offerName, $offerData->offerDiscount)); 
                 }  */
                if($_POST["offerCheck"] && $_POST["newOfferName"]) {
                    $offerName = json_decode($_POST["newOfferName"]);
                    $offerDiscount = json_decode($_POST["offerDiscount"]);
                    $offerCheck = json_decode($_POST["offerCheck"]);
                    echo json_encode($or->addOffer($offerName, $offerDiscount, $offerCheck));
                 //   echo json_encode($offerCheck[0]->checked);
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