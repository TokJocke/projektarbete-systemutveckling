<?php
 
    try {
    
        if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
/*         require("../repositories/productRepo.php");
 */    
    
        if (isset($_SERVER["REQUEST_METHOD"]) == "GET") { //IF METHOD = GET
    
/*             getAllProducts(); //GET ALL
 */
            print_r("get");
        }
        else if ($_SERVER["REQUEST_METHOD"] == "POST") {
/*             addTestProduct();
 */            echo "post";
        }
    }
    }
    catch (Exception $e) { // om error har felmeddelande
        http_response_code($e->getCode());
        echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
    }