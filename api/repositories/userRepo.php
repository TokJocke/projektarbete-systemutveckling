<?php 
    require "../handlers/dbHandler.php";


       function regUser($regName, $regUsername, $regPassword, $email, $regAdress, $regZip, $regPhone, $isAdmin) {
 
            $query = ('INSERT INTO user (name, userName, password, email, address, zipCode, phoneNr, isAdmin) 
            VALUES (:name, :userName, :password, :email, :address, :zipCode, :phoneNr, :isAdmin)');
  
            $entity = array(':name' => $regName, ':userName' => $regUsername, ':password' => $regPassword, 
            ':email' => $email, ':address' => $regAdress, ':zipCode' => $regZip, 'phoneNr' => $regPhone, ':isAdmin' => $isAdmin);
            
            $db = new Database();
            $db->runQuery($query, $entity); 
    
         
    }

   
     


?>