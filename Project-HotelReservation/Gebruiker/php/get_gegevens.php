<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
require "Connection.php" ; 
// de vars ophalen die via POST meegestuurd zijn
// $_POST werkt niet als de data via Volley gestuurd is :-(
// Dit is nodig wanneer je native Android gebruikt.

$body = file_get_contents('php://input');
$postvars = json_decode($body, true);
$bewerking = $postvars["bewerking"];

// bewerking ophalen
    if(isset($_POST['bewerking'])){
        $bewerking = $_POST['bewerking'];
    }
if(isset($_POST['Email'])){
        $Email = $_POST['Email'];
    }
    if(isset($_POST['id'])){
        $id = $_POST['id'];
    }
        

if ($bewerking == "profiel") {
    
     $result = $conn -> query("SELECT * FROM klanten where Email ='$Email'");
        // maak van de inhoud van deze result een json object waarvan
        // ook in android de juiste gegeventypes herkend worden
       $return = getJsonObjFromResult($result);

        // maak geheugenresources vrij :
       echo mysqli_free_result($result);

        die($return);

   
    
}elseif ($bewerking == "update") {
        if (isset($_POST['Password'])
        && isset($_POST['Email']) && isset($_POST['Voornaam']) && isset($_POST['Naam']) && isset($_POST['Straat']) && isset($_POST['Geboortedatum']) && isset($_POST['Gemeente'])&& isset($_POST['Postcode'])&& isset($_POST['Geslacht'])&& isset($_POST['userlevel'])&& isset($_POST['Phone']) ) {
            // hier MOET je controle plaatsen om o.a. SQL injection 
            // te voorkomen.
           // $_POST['Password'] = md5($_POST['Password']);
     
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
          
        }
               
        // update data
        if ($conn -> query("UPDATE klanten SET password = '".$Password."'
    ,email = '".$Email."',naam = '".$Naam."',voornaam = '".$Voornaam."',adres = '".$Straat."',geboortedatum = '".$Geboortedatum."',gemeente = '".$Gemeente."',postcode = '".$Postcode."',geslacht = '".$Geslacht."',userlevel = '".$userlevel."' ,telefoonnummer = '".$Phone."' 
    WHERE klant_id = '".$id."'") === TRUE) { // FROM $t
            die(json_encode(1));
        } else {
             die(json_encode(2 . $conn -> error));
        }
        
        
}elseif ($bewerking == "delete") {
          $statusdeactive = "deactive";
        if ($conn -> query("UPDATE klanten SET status = '".$statusdeactive."' where klant_id = '".$id."'") === TRUE) { // FROM $t
            die(json_encode(1));
        } else {
             die(json_encode(2). $conn -> error);
        }
        
        
    }elseif($bewerking =="GetKamers"){
    if($result = $conn -> query("SELECT * FROM kamers ")){
        
     
        // maak van de inhoud van deze result een json object waarvan
        // ook in android de juiste gegeventypes herkend worden
       $return = getJsonObjFromResult($result);

        // maak geheugenresources vrij :
       echo mysqli_free_result($result);

        die($return);   
    }else{
        die(json_encode(1));
    
    }
    
}elseif($bewerking == "GetKamerInfo"){
    if( $result = $conn -> query("SELECT * FROM kamers where kamer_id = '".$id."'")){
       

       
        // maak van de inhoud van deze result een json object waarvan
        // ook in android de juiste gegeventypes herkend worden
       $return = getJsonObjFromResult($result);

        // maak geheugenresources vrij :
       echo mysqli_free_result($result);

        die($return);
    }else{
        die(json_encode(1));
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
