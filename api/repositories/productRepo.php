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
                $product = new Product((int)$item->productId, $item->productName, (int)$item->price, $item->description, (int)$item->unitsInStock, (int)$item->categoryId, $item->img);
                array_push($productArray, $product);
            }
            return $productArray;
        }
           
        function addProduct($name, $price, $description, $unitsInStock, $categoryID) {
            
            $query = ('INSERT INTO product (productName, price, description, unitsInStock, categoryID) 
            VALUES (:productName, :price, :description, :unitsInStock, :categoryID)');
            $entity = array(':productName' => $name, ':price' => $price, ':description' => $description, 
            ':unitsInStock' => $unitsInStock, 'categoryID' => $categoryID);
            
            $this->db->runQuery($query, $entity);
    
        } 
        //method for upploading image
        function uploadImage($image) {
            $target_dir = "../../assets/products/";
            $target_file = $target_dir . time() . basename($image["name"]);
            $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));


            $check = getimagesize($image["tmp_name"]);
            if($check == false) {
                return "file is not an image";
            }
            if(file_exists($target_file)) {
                return "File already exists";
            }
            if($image["size"] > 5000000) {
                return "File to large";
            }
            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
                return "file has to be by format jpg/png/jpeg/gif";
            
            }
            if (move_uploaded_file($image["tmp_name"], $target_file)) {
                    return "The image " . basename($image["name"]) . " has been uploaded";
                }else {
                    return "Something went wrong with the upload";
                }
            



        }



    }


?>

