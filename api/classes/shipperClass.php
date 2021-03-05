
<?php
class Shipper
{

    public function __construct($shippingId, $shippingCompany, $shippingPrice, $description)
    {
        $this->shippingId = $shippingId;
        $this->shippingCompany = $shippingCompany;
        $this->shippingPrice = $shippingPrice;
        $this->description = $description;
    }
}
