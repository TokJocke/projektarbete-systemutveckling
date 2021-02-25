<?php

try {

    if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
        require("../repositories/cartRepo.php");



        if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET
            $userId = $_SESSION["user"];
            $pr = new CartRepo;
            echo json_encode($pr->getCart($userId));
        } else if ($_SERVER["REQUEST_METHOD"] == "POST") {

            if ($_POST["action"] == "remove") { // action = remove

                $productId = $_POST["productId"];

                $pr = new CartRepo;
                echo json_encode($pr->deleteProducts($productId));
            } else if ($_POST["action"] == "increase") { // action = increase


                $quantity = $_POST["quantity"];
                $productId = $_POST["productId"];

                $pr = new CartRepo;
                echo json_encode($pr->update(++$quantity, $productId));
            } else if ($_POST["action"] == "decrease") { // action = decrease


                $quantity = $_POST["quantity"];
                $productId = $_POST["productId"];


                $pr = new CartRepo;
                echo json_encode($pr->update(--$quantity, $productId));
            }


            ////update($userId,$productId,$quantity) tar in 3 para
        }
    }
} catch (Exception $e) { // om error har felmeddelande
    http_response_code($e->getCode());
    echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
}
