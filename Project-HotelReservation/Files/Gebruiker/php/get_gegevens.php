<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
require "Connection.php" ; 
//require "Connection2.php" ; 
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
        if (isset($_POST['InDate'])){
            $CheckinDate= $_POST['InDate'];  
      
           /** SELECT soort_kamer.soort_id , soort_kamer.soort_kamer, soort_kamer.beschrijving, 
            **soort_kamer.personen, soort_kamer.prijs, kamers.kamers_id, kamers.id_soort, kamers.beschikbaar from soort_kamer, kamers 
            **WHERE soort_kamer.soort_id = kamers.id_soort GROUP BY soort_kamer.soort_id*/ 

            $result = $conn -> query("SELECT soort_kamer.soort_id , soort_kamer.soort_kamer, soort_kamer.beschrijving, 
            soort_kamer.personen, soort_kamer.prijs, kamers.kamers_id, kamers.id_soort, kamers.beschikbaar from soort_kamer, kamers 
            WHERE soort_kamer.soort_id = kamers.id_soort and kamers.beschikbaar = 'Ja' and kamers.kamer_id != ANY(SELECT kamer_id FROM reservatie WHERE aankomst_datum ='".$CheckinDate."')");
          
            
                if($result > 0){
                   
                // maak van de inhoud van deze result een json object waarvan 
                // ook in android de juiste gegeventypes herkend worden
               $return = getJsonObjFromResult($result);
        
                // maak geheugenresources vrij :
               echo mysqli_free_result($result);
        
                die($return);   
            }elseif($result == 0){
                $result1 = $conn -> query("SELECT soort_kamer.soort_id , soort_kamer.soort_kamer, soort_kamer.beschrijving, 
                soort_kamer.personen, soort_kamer.prijs, kamers.kamers_id, kamers.id_soort, kamers.beschikbaar from soort_kamer, kamers 
                WHERE soort_kamer.soort_id = kamers.id_soort and kamers.beschikbaar = 'Ja'");
         
           
              
            // maak van de inhoud van deze result een json object waarvan 
            // ook in android de juiste gegeventypes herkend worden
           $return = getJsonObjFromResult($result1);
    
            // maak geheugenresources vrij :
           echo mysqli_free_result($result1);
    
            die($return);   
        }else{
                die(json_encode(1));
            
            }   
             
              die($return);
        } else {
            
            die(json_encode("missing data"));
        }
    

    
    
}elseif($bewerking == "GetKamerInfo"){
  
   
    if( $result = $conn -> query("SELECT soort_kamer.soort_id , soort_kamer.soort_kamer, soort_kamer.beschrijving, 
    soort_kamer.personen, soort_kamer.prijs, kamers.kamers_id, kamers.id_soort, kamers.beschikbaar from soort_kamer, kamers 
    WHERE soort_kamer.soort_id = kamers.id_soort and kamers.kamers_id = '".$id."' and kamers.beschikbaar = 'Ja'")){
      

       
        // maak van de inhoud van deze result een json object waarvan
        // ook in android de juiste gegeventypes herkend worden
       $return = getJsonObjFromResult($result);

        // maak geheugenresources vrij :
       echo mysqli_free_result($result);
       
        die($return);
    }else{
        die(json_encode(1));
    }
   
    
}elseif($bewerking =="opslaanReservatie"){

        if (isset($_POST['CheckIn']) && isset($_POST['CheckOut']) && isset($_POST['idGetKl']) && isset($_POST['prijs']) && isset($_POST['idKamer']) && isset($_POST['status']) && isset($_POST['betalingOk']) ){
            $InDate= $_POST['CheckIn'];  
            $OutDate = $_POST['CheckOut'];
            $tebetalen = $_POST['prijs'];
             $idKm = $_POST['idKamer'];
             $st = $_POST['status'];
             $idKt = $_POST['idGetKl'];
            $betaling = $_POST['betalingOk'];
            if ($conn -> query("insert into reservatie (klant_id, kamer_id, aankomst_datum, Vertrek_datum, Statuut, tebetalen, betalingOk )
             values('".$idKt."','".$idKm."','".$InDate."','".$OutDate."','".$st."','".$tebetalen."','".$betaling."')") === TRUE)
             { // into $t
              
               
                die(json_encode(1));
            } else {
                 die(json_encode(2));
            }
          
    }else{
        die(json_encode("missing data"));
    }
    
    
}elseif($bewerking == "GetInfoBooking"){
    if(isset($_POST['soortid'])){
        $soortId = $_POST['soortid'];
    }
    $beschikbaarheid = $conn ->query("UPDATE `kamers` SET `beschikbaar` = 'nee' WHERE `kamers`.`kamers_id` = '".$id."' ");

    if($result = $conn -> query("SELECT soort_kamer.soort_id , soort_kamer.soort_kamer, 
    soort_kamer.personen, kamers.kamers_id, kamers.id_soort, kamers.beschikbaar from soort_kamer, kamers where kamers.kamers_id = '".$id."' and soort_kamer.soort_id = '".$soortId."'
    ")){
       

       
        // maak van de inhoud van deze result een json object waarvan
        // ook in android de juiste gegeventypes herkend worden
       $return = getJsonObjFromResult($result);

        // maak geheugenresources vrij :
       echo mysqli_free_result($result);

        die($return);
    }else{
        die(json_encode(1));
    }
    
}elseif($bewerking == "ChangeStatus"){

    if(isset($_POST['id'])){
        $idRoom = $_POST['id'];
        
        $result = $conn -> query("UPDATE `kamers` SET `beschikbaar` = 'Ja' WHERE `kamers`.`kamers_id` = '".$id."' ");
       
        die(json_encode(1));
    }else{
        die(json_encode(2));
    }
}elseif($bewerking == "GetReservaties"){

    if(isset($_POST['idK'])){
        $idK = $_POST['idK'];
     
    if($result = $conn -> query("SELECT * FROM reservatie where klant_id = '".$idK."' and Statuut = 'Booked'")){
   // maak van de inhoud van deze result een json object waarvan
            // ook in android de juiste gegeventypes herkend worden
            $return = getJsonObjFromResult($result);
    
            // maak geheugenresources vrij :
           echo mysqli_free_result($result);
    
            die($return); 
    }else{
        die(json_encode(2));
    }
  
        }else{
        die(json_encode(1));
        }
}elseif($bewerking == "GetAantal"){
    if($result = $conn -> query("SELECT  COUNT(*) as aantal FROM kamers
    WHERE kamers.id_soort = '".$id."' and  `beschikbaar` = 'Ja'")){
      

       
        // maak van de inhoud van deze result een json object waarvan
        // ook in android de juiste gegeventypes herkend worden
        $return = getJsonObjFromResult($result);

        // maak geheugenresources vrij :
       echo mysqli_free_result($result);
       
        die($return);
    }else{
        die(json_encode(1));
    }
}elseif($bewerking =="getreserSelect"){
    if(isset($_POST['idReser'])){
        $id = $_POST['idReser'];
     
      $result = $conn -> query("SELECT * FROM reservatie WHERE reservatie_id = '".$id."'");

       
            // maak van de inhoud van deze result een json object waarvan
            // ook in android de juiste gegeventypes herkend worden
            $return = getJsonObjFromResult($result);
    
            // maak geheugenresources vrij :
           echo mysqli_free_result($result);
           
            die($return);

    }else{
        die(json_encode("missing data"));
    }


}elseif($bewerking =="annuleerReservatie"){
    if(isset($_POST['idAnnul']) && isset($_POST['kamerIdBesch'])){
        $idt = $_POST['idAnnul'];
        $KamerIdBes = $_POST['kamerIdBesch'];
        $kamerBeschikbaarMaken = $conn -> query("UPDATE `kamers` SET `beschikbaar` = 'Ja' WHERE `kamers`.`kamers_id` = '".$KamerIdBes."' ");
     if($result = $conn -> query("UPDATE `reservatie` SET `Statuut` = 'Cancelled' WHERE `reservatie`.`reservatie_id` = '".$idt."' " )) { // FROM $t
        die(json_encode(1));
    } else {
         die(json_encode(2));
    }
    }else{
        die(json_encode("missing data"));
    }  
    

}elseif($bewerking == "GetCancelledreservation"){

    if(isset($_POST['idK'])){
        $idK = $_POST['idK'];
     
    if($result = $conn -> query("SELECT * FROM reservatie where klant_id = '".$idK."' and Statuut = 'Cancelled'")){
   // maak van de inhoud van deze result een json object waarvan
            // ook in android de juiste gegeventypes herkend worden
            $return = getJsonObjFromResult($result);
    
            // maak geheugenresources vrij :
           echo mysqli_free_result($result);
    
            die($return); 
    }else{
        die(json_encode(2));
    }
  
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
