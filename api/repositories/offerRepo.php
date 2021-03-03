<?php 
    require "../handlers/dbHandler.php";
    require "../classes/offerClass.php";
   
    class OfferRepo {
        function __construct()  {
            $this->db = new Database();
           }


        function testing($name) {
            $allInOffer = $this->db->fetchQuery("SELECT * FROM offer INNER JOIN product ON offer.productId = product.productId WHERE offerName = '$name'");
            $productArray = $this->createOfferList($allInOffer);
        
        
        
            $totalPrice = array();
     
     
     
     
            /*       foreach($productArray as $product) {
                array_push($totalPrice, $product->price);
            }
            array_push($productArray, array_sum($totalPrice)); */
            
            return $productArray; 
        }

    

    function getAllOffers() {
        $allOffers = $this->db->fetchQuery("SELECT DISTINCT offerName, discount FROM offer");
        $offersArray = $this->createOfferList($allOffers);
        return $offersArray;
    }

    function createOfferList($array) {
        $offersArray = array();
        foreach ($array as $item) { //Kan uppnås med array_map
            $offer = new Offer($item->offerName, $item->discount, $item->productId, $item->quantity, $item->productName);
            array_push($offersArray, $offer);
        }
        return $offersArray;
    }

    function addOffer($name, $discount, $offerArray) {
          
        foreach ($offerArray as $offer) {
            
            $query = ('
                INSERT INTO offer (offerName, discount, productId, quantity) 
                VALUES (:offerName, :discount, :productId, :quantity)');
            $entity = array(
                ':offerName' => $name, 
                'discount' => $discount,
                'productId' => $offer->checked,
                'quantity' => $offer->quantity);
            
            $this->db->runQuery($query, $entity);
        }
      
        return $name . " added new offer"; 


    } 

    function removeOffer($offerId) {

        $query = "DELETE FROM offer WHERE offerId = :offerId";

        $entity = array(
            'offerId' => $offerId
        );

        $this->db->runQuery($query, $entity);

        return 'Offer "' . $offerId . '" removed';
    }

    function changeOffer($productsToOffer, $offerId) {

        foreach ($productsToOffer as $product) {
            $query = "UPDATE product SET offerId = :offerId WHERE productId = :productId";

            $entity = array(
                'offerId' => $offerId,
                'productId' => (int)$product
            );

            $this->db->runQuery($query, $entity);
        }
        
        return "Offer changed";
        
    }

}
?>