<?php 
    require "../handlers/dbHandler.php";
    require "../classes/productClass.php";
   
    class ProductRepo {
        function __construct()  {
            $this->db = new Database();
           }
        //Hämta alla produkter från DB, instasera varje produkt, pusha in i ny array som returneras
        function getAllProducts() {
            $allProducts = $this->db->fetchQuery("SELECT * FROM Product");
            $productArray = $this->createProductList($allProducts);
            return $productArray;
        }
        //Skapa lista med produktinstanser
        function createProductList($array) {
            $productArray = array();
            foreach ($array as $item) { //Kan uppnås med array_map
                $product = new Product($item->productName, (int)$item->price, $item->description, $item->img);
                array_push($productArray, $product);
            }
            return $productArray;
        }
           
        function addProduct($name, $price, $description, $unitsInStock, $categoryID) {
            
            $query = ('INSERT INTO product (productName, price, description, unitsInStock, categoryID) 
            VALUES (:productName, :price, :description, :unitsInStock, :categoryID)');
            $entity = array(':productName' => $name, ':price' => $price, ':description' => $description, 
            ':unitsInStock' => $unitsInStock, 'categoryID' => $categoryID);
            
            $db = new Database();
            $db->runQuery($query, $entity);
    
        } 
    }


?>

