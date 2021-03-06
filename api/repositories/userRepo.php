<?php
require "../handlers/dbHandler.php";


class UserRepo {
  function __construct()
  {
    $this->db = new Database();
  }




function regUser($regName, $regUsername, $regPassword, $email, $regAdress, $regZip, $regPhone, $isAdmin) {

  $qry = "SELECT userName FROM user WHERE userName='$regUsername'";
  $result = $this->db->fetchQuery($qry);
 
  $qery = "SELECT email FROM user WHERE email='$email'";
  $newResult = $this->db->fetchQuery($qery);

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


    $this->db->runQuery($query, $entity);
  }
}

function login($un, $pw)
{

  $query = "SELECT userName, password FROM user WHERE userName='" . $un . "' and password='" . $pw . "'";


  $this->db->fetchQuery($query);
  $userID = $this->fetchuId($un);
  $hashedPw = $this->fetchUserInfo($un);
  // om $pw == hashat pw och matchar med username == success login.  
  if (password_verify($pw, $hashedPw) == true) {

    session_start();
    $_SESSION["user"] = $userID;

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

  $myResult = $this->db->fetchQuery($query);
  return $myResult[0]->password;
}

function signUpNewsletter($username) { //Skicka in userid vid reg, email och namn kan vara null
  //Om ej inloggad, newsletter reg = namn/email.  
  
  $query = ('INSERT INTO newsletter (userId) VALUES (:userId)'); //Glöm ej ändra email/name till NULL i databas.

  $entity = array(':userId' => $this->fetchuId($username));


  $this->db->runQuery($query, $entity);
}

function fetchuId($username)
{

  $qery = "SELECT userId FROM user WHERE userName='$username'";
  $result = $this->db->fetchQuery($qery);
  return $result[0]->userId;
}


function fetchUsers()
{

  $query = "SELECT * FROM user";
  $result = $this->db->fetchQuery($query);
  return json_encode($result);
}


function newsNoSignUp($email, $name) { //skicka med userid och göra en check om inloggad, skicka då userid istället.
  // ändra så man ej kan skicka upp samma email. 
  $activeUser = $_SESSION["user"];
  
  $myQuery = "SELECT email FROM newsletter WHERE email='$email'";
  $newResult = $this->db->fetchQuery($myQuery);

  $myQry = "SELECT userId FROM newsletter WHERE userId='$activeUser'";
  $Result = $this->db->fetchQuery($myQry);

  if($Result == true) { //kollar om email redan finns
    echo json_encode("You are already signed up"); 
    exit;
  }
  
  if($newResult == true) { //kollar om email redan finns
    echo json_encode("Email taken"); 
    exit;
  }

    if(isset($_SESSION["user"])) { //Skickar bara upp userId om inloggad.
    $uid = $this->fetchuserId($activeUser);
    $qry = ('INSERT INTO newsletter (userId) VALUES (:userId)');
    $entity = array(':userId' => $uid);
    $this->db->runQuery($qry, $entity);
  } 

  else{
  $query = ('INSERT INTO newsletter (email, name) VALUES (:email, :name)'); 

  $entity = array(':email' => $email, ':name' => $name);
  
  $this->db->runQuery($query, $entity);
  }
}

function fetchuserId($userId)
{
  $qery = "SELECT userId FROM user WHERE userId='$userId'";
  $result = $this->db->fetchQuery($qery);
  return $result[0]->userId;
}

function getAllUsers() {
  $allUsers = $this->db->fetchQuery("SELECT * FROM user");  
  $userArray = $this->createUserList($allUsers); 
  return $userArray;
}

function createUserList($array) {
  $userArray = array();
  foreach ($array as $item) { 
      array_push($userArray, $item);
  }
  return $userArray;
}

function updateUser($isAdmin, $isAdm) { 
    
  foreach ($isAdmin as $usn) {       
  
  $query = "UPDATE user SET isAdmin=:isAdmin WHERE userName =:un";

  $entity = array(
      'un' => $usn, 
      'isAdmin' => $isAdm); 

      $this->db->runQuery($query, $entity);
            
  } 
  return "Admin permission was given";
}

  // fetch userInfo except username & password
  function userInfo($userId){

    $query = 
    "SELECT userId, name, email,address,zipCode,phoneNr,isAdmin 
    FROM user
    WHERE userId = $userId";
    $result = $this->db->fetchQuery($query);
    return $result;

  }

//fetch admin info on logged in 
  function isAdminInfo($userId){

    $query = 
    "SELECT isAdmin 
    FROM user
    WHERE userId = $userId";
    $result = $this->db->fetchQuery($query);
    if($result[0]->isAdmin == 0){
      $result = "Nej";
    }else {
      $result = "Ja";
    }
    return $result;
  
  }

  // fetch all from newsletter
function fetchNewsInfo(){
  $query = "SELECT * FROM newsletter";
  $result = $this->db->fetchQuery($query);
  return $result;
}
// lista på alla som subscribar på newsletter
function getFromNewsletter() {
  $emailsArray = array();
  $allEmails = $this->db->fetchQuery("SELECT newsletter.email, user.email, user.name, user.userId FROM newsletter INNER JOIN user ON newsletter.userId = user.userId"); 
  $anotherEmails = $this->db->fetchQuery("SELECT email, name from newsletter"); 
  array_push($emailsArray, $allEmails, $anotherEmails);
  $emailsArray = $this->createUserList($emailsArray); 
  return $emailsArray;
}

function createNewsList($array) {
  $emailArray = array();
  foreach ($array as $item) { 
      array_push($emailArray, $item);
  }
  return $emailArray;
}

}
