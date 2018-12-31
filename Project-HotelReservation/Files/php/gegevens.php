<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
require "Connection.php" ; 
//require "Connection2.php" ; 

  
// bewerking ophalen
    if(isset($_POST['bewerking'])){
        $bewerking = $_POST['bewerking'];
    }
if ($bewerking == "check") {
        if (isset($_POST['Gebruikersnaam']) && isset($_POST['Wachtwoord']) && isset($_POST['usrlvl']) ){
          
        //$_POST['Wachtwoord'] = md5($_POST['Wachtwoord']);
            $Gebruikersnaam= $_POST['Gebruikersnaam'];
            $Password=  md5($_POST['Wachtwoord']);
             $usrlevel= $_POST['usrlvl'];
        
            
        } else {
            die(json_encode("missing data"));
        }

     
         $test = $conn -> query("SELECT * FROM klanten where email ='$Gebruikersnaam' and password ='$Password' and userlevel = '$usrlevel' and status = 'active' ");
        
        $count = mysqli_num_rows($test);

      
      

 
     
        
        $checkStatus = $conn -> query("SELECT * FROM klanten where email ='$Gebruikersnaam' and password ='$Password' and userlevel = '$usrlevel' and status = 'deactive' ");
        $resultGebruikersnaam = $conn -> query("SELECT * FROM klanten where email ='$Gebruikersnaam'");
    
         
          
       
        if ($count == 1 ) { 
        echo "success";
     
            
           
        }elseif(mysqli_num_rows($checkStatus) == 1 ) {
             
                die(json_encode(4));
                } elseif(mysqli_num_rows($resultGebruikersnaam) == 1 ) {
             
                die(json_encode(2));
                }else{
                die(json_encode(3));
            
            
        
    }
}else if ($bewerking == "contactgegevens") {
     if (isset($_POST['nameContact']) && isset($_POST['emailContact'])
        && isset($_POST['gsmContact']) && isset($_POST['messageContact'])) {
 
            $nameContact = $_POST['nameContact'];
            $emailContact= $_POST['emailContact'];
            $gsmContact = $_POST['gsmContact'];
            $messageContact = $_POST['messageContact'];  
        
            if ($conn -> query("insert into Contact (Naam, email, gsmnummer, Message) values('".$nameContact."','".$emailContact."','".$gsmContact."','".$messageContact."')")) { // into $t
            
            die(json_encode(1));
        } else {
             die(json_encode(2, $conn -> error));
        }

        } else {
            die(json_encode(3));
        }
        

}elseif ($bewerking == "add") {
        if (isset($_POST['Password'])
        && isset($_POST['Email']) && isset($_POST['Voornaam']) && isset($_POST['Naam']) && isset($_POST['Straat']) && isset($_POST['Geboortedatum']) && isset($_POST['Gemeente'])&& isset($_POST['Postcode'])&& isset($_POST['Geslacht'])&& isset($_POST['userlevel'])&& isset($_POST['Phone']) ) {
            // hier MOET je controle plaatsen om o.a. SQL injection 
            // te voorkomen.
            $_POST['Password'] = md5($_POST['Password']);
     
            $Password= $_POST['Password'];
            $Email = $_POST['Email'];
            $Naam = $_POST['Naam'];
            $Voornaam = $_POST['Voornaam'];
            $Straat = $_POST['Straat'];
            $Geboortedatum = $_POST['Geboortedatum'];
            $Gemeente = $_POST['Gemeente'];
            $Postcode = $_POST['Postcode'];
            $Geslacht = $_POST['Geslacht'];
            $userlevel = $_POST['userlevel']; 
            $Phone = $_POST['Phone'];
          

        } else {
            die(json_encode("missing data"));
        }
 $checkEmail = $conn -> query("SELECT * FROM klanten where Email ='$Email'");
 $countCheckEmail = mysqli_num_rows($checkEmail);
 
 if(mysqli_num_rows($checkEmail) == 1){
die(json_encode(3));

 }else{
     
if ($conn -> query("insert into klanten (naam, voornaam, geslacht, geboortedatum, adres, gemeente, postcode, telefoonnummer, email, password, userlevel) values('"
        .$Naam."','".$Voornaam."','".$Geslacht."','".$Geboortedatum."','".$Straat."','".$Gemeente."','".$Postcode."','".$Phone."','".$Email."','".$Password."','".$userlevel."')") === TRUE) {
            die(json_encode(1));
        } else {
            die(json_encode(2). $conn -> error);
        }
    } 

 }elseif($bewerking =="GetKamers"){
    if($result = $conn -> query("SELECT soort_kamer.soort_id , soort_kamer.soort_kamer, soort_kamer.beschrijving, 
    soort_kamer.personen, soort_kamer.prijs, kamers.kamers_id, kamers.id_soort, kamers.beschikbaar from soort_kamer, kamers 
    WHERE soort_kamer.soort_id = kamers.id_soort GROUP BY soort_kamer.soort_id")){


        // maak van de inhoud van deze result een json object waarvan
        // ook in android de juiste gegeventypes herkend worden
       $return = getJsonObjFromResult($result);

        // maak geheugenresources vrij :
       echo mysqli_free_result($result);

        die($return);   
    }else{
        die(json_encode(1));
    
    }
    
}elseif($bewerking == "changePassword"){
    if(isset($_POST['password']) && isset($_POST['email'])){
        $pass = md5($_POST['password']);
        $ema = $_POST['email'];
        if ($conn -> query("UPDATE klanten SET password = '".$pass."'
                WHERE email = '".$ema."'") === TRUE) { // FROM $t
                die(json_encode(1));
            } else {
                 die(json_encode(2 . $conn -> error));
            }    


    }else{
        echo "missing data";
    }
}
function getJsonObjFromResult(&$result){
    // de & voor de parameter zorgt er voor dat we de de parameter
    // by reference doorgeven, waardoor deze niet gekopieerd word
    // naar een nieuwe variabele voor deze functie.

    $fixed = array();
    
    $typeArray = array(
                    MYSQLI_TYPE_TINY, MYSQLI_TYPE_SHORT, MYSQLI_TYPE_INT24,    
                    MYSQLI_TYPE_LONG, MYSQLI_TYPE_LONGLONG,
                    MYSQLI_TYPE_DECIMAL, 
                    MYSQLI_TYPE_FLOAT, MYSQLI_TYPE_DOUBLE );
    $fieldList = array();
    // haal de veldinformatie van de velden in deze resultset op
    while($info = $result->fetch_field()){
        $fieldList[] = $info;
    }
    // haal de data uit de result en pas deze aan als het veld een
    // getaltype zou moeten bevatten
    while ($row = $result -> fetch_assoc()) {
        $fixedRow = array();
        $teller = 0;

        foreach ($row as $key => $value) {
            if (in_array($fieldList[$teller] -> type, $typeArray )) {
                $fixedRow[$key] = 0 + $value;
            } else {
                $fixedRow[$key] = $value;
            }
            $teller++;
        }
        $fixed[] = $fixedRow;
    }

    // geef een json object terug
    return '{"data":'.json_encode($fixed).'}';
}
?>
