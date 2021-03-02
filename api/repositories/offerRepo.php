<?php 
    require "../handlers/dbHandler.php";
    require "../classes/offerClass.php";
   
    class OfferRepo {
        function __construct()  {
            $this->db = new Database();
           }


    

    function getAllOffers() {
        $allOffers = $this->db->fetchQuery("SELECT * FROM offer");
        $offersArray = $this->createOfferList($allOffers);
        return $offersArray;
    }

    function createOfferList($array) {
        $offersArray = array();
        foreach ($array as $item) { //Kan uppnås med array_map
            $offer = new Offer($item->offerId, $item->offerName, $item->discount);
            array_push($offersArray, $offer);
        }
        return $offersArray;
    }

    function addOffer($name, $discount) {
            
        $query = ('
            INSERT INTO offer (offerName, discount) 
            VALUES (:offerName, :discount)');
        $entity = array(
            ':offerName' => $name, 
            'discount' => $discount);
        
        $this->db->runQuery($query, $entity);
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