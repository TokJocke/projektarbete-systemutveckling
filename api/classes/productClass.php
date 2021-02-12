/*      function fetchQuerry($sqlQuery) { 
        //kommunikation med db minst i tre steg, förbered, execute, fetch
        $preparedQuery = $this->db->prepare($sqlQuery);
        $preparedQuery->execute();
        echo json_encode($preparedQuery->fetchAll(PDO::FETCH_OBJ));       
        exit;
        }

        function runQuerry($sqlQuery) { 
        //kommunikation med db minst i tre steg, förbered, execute, fetch
        $preparedQuery = $this->db->prepare($sqlQuery);
        $status = $preparedQuery->execute();
        
        return $status;
        }
 */


/* 
    class ProductRepo extends Database {

        function fetchAllProducts() {

            $this->fetchQuery("SELECT * FROM product");

        }
 */
/*         function addProduct() {

            $preparedQuery = $this->db->prepare("INSERT INTO product (productName, price, description, unitsInStock) VALUES (:productName, :price, :description, :unitsInStock)");
            $status = $preparedQuery->execute(array("productName" => "lakritsknapp", "price" => 10, "description" => "supergod", "unitsInStock" => 3));

            echo json_encode($status)
            exit;
        }
 */
