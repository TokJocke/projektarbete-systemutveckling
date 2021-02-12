<?php
 
    class Database {
        function __construct()  {
            $dns = "mysql:host=localhost;dbname=sottogott";
            $user = "root";
            $pass = "root";
            $this->db = new PDO($dns, $user, $pass);
            $this->db->exec("set names utf8");
           }
        
        public $db;

        function prepareQuery($query) {
            return $this->db->prepare($query);
        }
        function runQuery($query, $entity) {
            $preparedQuery = $this->prepareQuery($query);
            $status = $preparedQuery->execute($entity);
            return $status;
        }
        function fetchQuery($query) {
            $preparedQuery = $this->prepareQuery($query);
            $preparedQuery->execute();
            echo json_encode($preparedQuery->fetchAll(PDO::FETCH_OBJ));
        }

/*         function addTestProduct() {
            
            $this->runQuery("INSERT INTO product (productName, price, description, unitsInStock) 
            VALUES (:productName, :price, :description, :unitsInStock)", 
            array("productName" => "lakritsknapp", "price" => 10, "description" => "supergod", "unitsInStock" => 3));

        } */

}



    




?>