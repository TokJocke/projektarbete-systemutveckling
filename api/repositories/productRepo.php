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

        function getAllProductsInCategory($id) {
            $allInCategory = $this->db->fetchQuery("SELECT * FROM Product WHERE categoryId='$id'");
            $productArray = $this->createProductList($allInCategory);
            return $productArray;
        }

        function getAllProductsInOffer($id) {
            $allInOffer = $this->db->fetchQuery("SELECT * FROM Product WHERE offerId='$id'");
            $productArray = $this->createProductList($allInOffer);
            return $productArray;
        }

        //Skapa lista med produktinstanser
        function createProductList($array) {
            $productArray = array();
            foreach ($array as $item) { //Kan uppnås med array_map
                $product = new Product((int)$item->productId, $item->productName, (int)$item->price, $item->description, (int)$item->unitsInStock, (int)$item->categoryId, (int)$item->offerId, $item->img);
                array_push($productArray, $product);
            }
            return $productArray;
        }
           
        function addProduct($name, $price, $description, $unitsInStock, $categoryId, $offerId, $img) {
            
            $query = ('
                INSERT INTO product (productName, price, description, unitsInStock, categoryId, offerId, img) 
                VALUES (:productName, :price, :description, :unitsInStock, :categoryId, :offerId, :img)');
            $entity = array(
                ':productName' => $name, 
                ':price' => $price, 
                ':description' => $description, 
                ':unitsInStock' => $unitsInStock, 
                'categoryId' => $categoryId, 
                'offerId' => $offerId,
                'img' => $img);
            
            $this->db->runQuery($query, $entity);
            return $name . " added to products";
        } 

        function removeProduct($id, $img) {
            
            $query = "DELETE FROM product WHERE productId='$id'";


            $this->db->fetchQuery($query);
            $this->removeImage($img);
            return "remove success";
        }

        function updateProduct($name, $price, $desc, $inStock, $category, $id) {
            $query = "
                UPDATE product 
                SET productName=:name, price=:price, description=:desc, unitsInStock=:inStock, categoryId=:category 
                WHERE productId =:id";
            
/*                 UPDATE product SET productName = "sdasd" WHERE productId = 26
 */
            
            $entity = array(
                'name' => $name, 
                'price' => $price, 
                'desc' => $desc, 
                'inStock' => $inStock, 
                'category' => $category, 
                'id' => $id);

                error_log(json_encode($entity));
                
            $this->db->runQuery($query, $entity);
            return "product with id = " . $id . " updated";
        }

        function removeImage($img) {
            $check = getimagesize($img);
            //check if $img = image file
            if($check == true) {
                unlink($img);
            }
         
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
            if(file_exists($target_file)) { //Då namnet är randomiserat på datum blir denna useless
                return "File already exists";
            }
            if($image["size"] > 5000000) {
                return "File to large";
            }
            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
                return "file has to be by format jpg/png/jpeg/gif";
            
            }
            if (move_uploaded_file($image["tmp_name"], $target_file)) {
                    return $target_file;
                }else {
                    return "Something went wrong with the upload";
                }
            



        }



    }


?>

