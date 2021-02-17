<?php 
    require "../handlers/dbHandler.php";

/*     class userRepo {
      function __construct()
      {
        $this->db = new Database();
      }
    } */

       function regUser($regName, $regUsername, $regPassword, $email, $regAdress, $regZip, $regPhone, $isAdmin) {
 
            $query = ('INSERT INTO user (name, userName, password, email, address, zipCode, phoneNr, isAdmin) 
            VALUES (:name, :userName, :password, :email, :address, :zipCode, :phoneNr, :isAdmin)');

            $hashedPwd = password_hash($regPassword, PASSWORD_DEFAULT);
          
            $entity = array(':name' => $regName, ':userName' => $regUsername, ':password' => $hashedPwd, 
            ':email' => $email, ':address' => $regAdress, ':zipCode' => $regZip, 'phoneNr' => $regPhone, ':isAdmin' => $isAdmin);
              
            $db = new Database();
            $db->runQuery($query, $entity);
                
    } 

        function login($un, $pw) {
       
        $query = "SELECT userName, password FROM user WHERE userName='".$un."' and password='".$pw."'";
     
        $db = new Database();
        $result = $db->fetchQuery($query);

          if($result == true) {
          echo json_encode("Login success");
          exit;
        }
          else {
          echo json_encode("login failed");
          exit;
        } 

    }   

   /*  function getPass() {
      $query = "SELECT password FROM user";
      $db = new Database();
      $result = $db->fetchQuery($query);
      return $result;
    } */

  

          

            
     


?>