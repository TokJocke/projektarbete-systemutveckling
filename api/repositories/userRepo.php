<?php
require "../handlers/dbHandler.php";


class userRepo
{
  function __construct()
  {
    $this->db = new Database();
  }
}

function regUser($regName, $regUsername, $regPassword, $email, $regAdress, $regZip, $regPhone, $isAdmin)
{

  $db = new Database();
  $qry = "SELECT userName FROM user WHERE userName='$regUsername'";
  $result = $db->fetchQuery($qry);
  $db = new Database();
  $qery = "SELECT email FROM user WHERE email='$email'";
  $newResult = $db->fetchQuery($qery);

  if ($newResult == true) { //kollar om username / email redan finns vid reg
    echo json_encode("Email taken");
    exit;
  }

  if ($result == true) {
    echo json_encode("Username taken");
    exit;
  } else if ($newResult == false && $result == false) { //om inte finns så regga användare.

    $query = ('INSERT INTO user (name, userName, password, email, address, zipCode, phoneNr, isAdmin) 
                VALUES (:name, :userName, :password, :email, :address, :zipCode, :phoneNr, :isAdmin)');

    $hashedPwd = password_hash($regPassword, PASSWORD_DEFAULT);

    $entity = array(
      ':name' => $regName, ':userName' => $regUsername, ':password' => $hashedPwd,
      ':email' => $email, ':address' => $regAdress, ':zipCode' => $regZip, 'phoneNr' => $regPhone, ':isAdmin' => $isAdmin
    );

    $db = new Database();
    $db->runQuery($query, $entity);
  }
}

function login($un, $pw)
{

  $query = "SELECT userName, password FROM user WHERE userName='" . $un . "' and password='" . $pw . "'";

  $db = new Database();
  $db->fetchQuery($query);

  $hashedPw = fetchUserInfo($un);
  // om $pw == hashat pw och matchar med username == success login.  
  if (password_verify($pw, $hashedPw) == true) {
    /* session_start();
    $_SESSION["user"] = $un; */
    echo json_encode("Login success"); //startar session här..
    exit;
  } else {
    echo json_encode("Login failed");
    exit;
  }
}
//Funktion för att hämta lösenord och matcha med användare.
function fetchUserInfo($username)
{
  $query = "SELECT password FROM user WHERE userName='$username'";
  $db = new Database();
  $myResult = $db->fetchQuery($query);
  return $myResult[0]->password;
}

function signUpNewsletter($username)
{ //Skicka in userid vid reg, email och namn kan vara null
  //Om ej inloggad, newsletter reg = namn/email.  
  $query = ('INSERT INTO newsletter (userId) VALUES (:userId)'); //Glöm ej ändra email/name till NULL i databas.

  $entity = array(':userId' => fetchuId($username));

  $db = new Database();
  $db->runQuery($query, $entity);
}

function fetchuId($username)
{
  $db = new Database();
  $qery = "SELECT userId FROM user WHERE userName='$username'";
  $result = $db->fetchQuery($qery);
  return $result[0]->userId;
}


function fetchUsers()
{
  $db = new Database();
  $query = "SELECT * FROM user";
  $result = $db->fetchQuery($query);
  return json_encode($result);
}
