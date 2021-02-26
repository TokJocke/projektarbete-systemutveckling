<?php 
    require "../handlers/dbHandler.php";
    require "../classes/offerClass.php";
   
    class ProductRepo {
        function __construct()  {
            $this->db = new Database();
           }


    }

?>