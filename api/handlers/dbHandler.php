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

/*         function add() {
            $preparedQuery = $this->db->prepare('INSERT INTO product (productName, price, description, categoryID) 
            VALUES (:productName, :price, :description, :categoryID)'); 
            $preparedQuery->execute(array(':productName' => 'hallonbot', ':price' => 10, ':description' => 'smakar skit', 'categoryID' => 1));
            exit;
        }
 */
}




?>