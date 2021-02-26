<?php

require "../handlers/dbHandler.php";
require "../classes/shipperClass.php";

$db = new Database();

class shipperRepo
{
    public function __construct()
    {
        $this->db = new Database();
    }

    function getAllShippers()
    {
        $allShippers = $this->db->fetchQuery("SELECT * FROM shipping");
        $shipperArray = $this->createShipperList($allShippers);
        return $shipperArray;
    }

    function createShipperList($array)
    {
        $shipperArray = array();
        foreach ($array as $item) { //Kan uppnås med array_map
            $shipper = new Shipper($item->shippingId, $item->companyName, $item->shippingPrice, $item->description);
            array_push($shipperArray, $shipper);
        }
        return $shipperArray;
    }
}
