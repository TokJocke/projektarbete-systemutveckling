<?php
    require "../handlers/dbHandler.php";
    require "../classes/categoryClass.php";

class CategoryRepo {
    function __construct()  {
        $this->db = new Database();
    }

    function getAllCategorys() {
        $allCategorys = $this->db->fetchQuery("SELECT * FROM Category");
        $categoryArray = $this->createCategoryList($allCategorys);
        return $categoryArray;
    }

    function createCategoryList($array) {
        $categoryArray = array();
        foreach ($array as $item) { //Kan uppnås med array_map
            $category = new Category($item->categoryId, $item->name);
            array_push($categoryArray, $category);
        }
        return $categoryArray;
    }


}



?>