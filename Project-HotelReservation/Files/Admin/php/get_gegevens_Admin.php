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
        

if ($bewerking == "profielAdmin") {
    
     $result = $conn -> query("SELECT * FROM klanten where Email ='$Email'");
        // maak van de inhoud van deze result een json object waarvan
        // ook in android de juiste gegeventypes herkend worden
       $return = getJsonObjFromResult($result);

        // maak geheugenresources vrij :
       echo mysqli_free_result($result);

        die($return);

   
    
}elseif ($bewerking == "updateAdmin") {
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
        
        
}elseif ($bewerking == "deleteAdmin") {
        // verwijder data
        $statusdeactive = "deactive";
        if ($conn -> query("UPDATE klanten SET status = '".$statusdeactive."' where klant_id = '".$id."'") === TRUE) { 
            die(json_encode(1));
        } else {
             die(json_encode(2). $conn -> error);
        }
        
        
    }elseif($bewerking == "Getklanten"){
    if(isset($_POST['userlevel'])){
        $userlevel = $_POST['userlevel']; 

        $result = $conn -> query("SELECT * FROM klanten where userlevel ='$userlevel'");
        // maak van de inhoud van deze result een json object waarvan
        // ook in android de juiste gegeventypes herkend worden
       $return = getJsonObjFromResult($result);

        // maak geheugenresources vrij :
       echo mysqli_free_result($result);

        die($return);
    }else{
        die(json_encode(1));
    }
    
}elseif ($bewerking == "deleteKlant") {
        // verwijder data
    $statusdeactive = "deactive";
        if ($conn -> query("UPDATE klanten SET status = '".$statusdeactive."' where klant_id = '".$id."'") === TRUE) { 
            die(json_encode(1));
        } else {
             die(json_encode(2). $conn -> error);
        }
    
}elseif($bewerking =="GetContacten"){
    if($result = $conn -> query("SELECT * FROM contact")){
        
     
        // maak van de inhoud van deze result een json object waarvan
        // ook in android de juiste gegeventypes herkend worden
       $return = getJsonObjFromResult($result);

        // maak geheugenresources vrij :
       echo mysqli_free_result($result);

        die($return);   
    }else{
        die(json_encode(1));
    
    }
    }elseif($bewerking =="deleteContact"){
    // verwijder data
    
        if ($conn -> query("delete FROM contact where Contact_ID = '".$id."'") === TRUE) { 
            die(json_encode(1));
        } else {
             die(json_encode(2). $conn -> error);
        }
    
}elseif($bewerking == "GetklantInfo"){
    
        

        if($result = $conn -> query("SELECT * FROM klanten where klant_id = '".$id."'")){
        // maak van de inhoud van deze result een json object waarvan
        // ook in android de juiste gegeventypes herkend worden
       $return = getJsonObjFromResult($result);

        // maak geheugenresources vrij :
       echo mysqli_free_result($result);

        die($return);
    }else{
        die(json_encode(1));
    }
    
}elseif ($bewerking == "activeerKlant") {
        // verwijder data
    $statusActive = "active";
        if ($conn -> query("UPDATE klanten SET status = '".$statusActive."' where klant_id = '".$id."'") === TRUE) { 
            die(json_encode(1));
        } else {
             die(json_encode(2). $conn -> error);
        }
    
}elseif($bewerking =="getKamers"){
    if($result = $conn -> query("SELECT * FROM soort_kamer ")){
        
     
        // maak van de inhoud van deze result een json object waarvan
        // ook in android de juiste gegeventypes herkend worden
       $return = getJsonObjFromResult($result);

        // maak geheugenresources vrij :
       echo mysqli_free_result($result);

        die($return);   
    }else{
        die(json_encode(1));
    
    }
    
}elseif($bewerking =="getKamersInfo"){
    if($result = $conn -> query("SELECT * FROM soort_kamer where soort_id  = '".$id."'")){
        
     

        // maak van de inhoud van deze result een json object waarvan
        // ook in android de juiste gegeventypes herkend worden
       $return = getJsonObjFromResult($result);

        // maak geheugenresources vrij :
       echo mysqli_free_result($result);

        die($return);   
    }else{
        die(json_encode(1));
    
    }
    
}elseif ($bewerking == "updateKamerInfo") {
        if (isset($_POST['soort'])
        && isset($_POST['personen']) && isset($_POST['prijs']) &&  isset($_POST['beschrij']) ) {
            // hier MOET je controle plaatsen om o.a. SQL injection 
            // te voorkomen.
           // $_POST['Password'] = md5($_POST['Password']);
     
            $soort= $_POST['soort'];
            $personen = $_POST['personen'];
            $Prijs = $_POST['prijs'];
            $beschrijving = $_POST['beschrij'];
           
          
        }
       
        // update data
        if ($conn -> query("UPDATE soort_kamer SET soort_kamer = '". $soort."'
    ,personen = '".$personen."',prijs = '".$Prijs."',beschrijving = '".$beschrijving."' WHERE soort_id = '".$id."'") === TRUE) { // FROM $t
            die(json_encode(1));
        } else {
             die(json_encode(2 . $conn -> error));
        }
        
        
}elseif($bewerking =="GetReservaties"){
    
      
     
      if($result = $conn -> query("SELECT klanten.klant_id, klanten.naam, klanten.voornaam, klanten.email , reservatie.reservatie_id,
       reservatie.kamer_id, reservatie.aankomst_datum, reservatie.Vertrek_datum, reservatie.Statuut, reservatie.tebetalen, reservatie.betalingOk 
      from klanten, reservatie WHERE klanten.klant_id = reservatie.klant_id and reservatie.Statuut = 'Booked'")){

       
            // maak van de inhoud van deze result een json object waarvan
            // ook in android de juiste gegeventypes herkend worden
            $return = getJsonObjFromResult($result);
    
            // maak geheugenresources vrij :
           echo mysqli_free_result($result);
           
            die($return);

    }else{
        die(json_encode("missing data"));
    }


}elseif($bewerking =="Getcancelled"){
    
      
     
    if($result = $conn -> query("SELECT klanten.klant_id, klanten.naam, klanten.voornaam, klanten.email , reservatie.reservatie_id,
     reservatie.kamer_id, reservatie.aankomst_datum, reservatie.Vertrek_datum, reservatie.Statuut, reservatie.tebetalen, reservatie.betalingOk 
    from klanten, reservatie WHERE klanten.klant_id = reservatie.klant_id and reservatie.Statuut = 'Cancelled'")){

     
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


}elseif($bewerking =="checkedIn"){
    if(isset($_POST['idRes'])){
        $id = $_POST['idRes'];
         
    $result = $conn -> query("UPDATE `reservatie` SET 
      `Statuut` = 'Checked' , `betalingOk` = 'Yes' WHERE 
      `reservatie`.`reservatie_id` = '".$id."'");

          die(json_encode(1));
        } else {
             die(json_encode(2). $conn -> error);
        }

}elseif($bewerking =="checkreservatie"){
    
      
     
    if($result = $conn -> query("SELECT klanten.klant_id, klanten.naam, klanten.voornaam, klanten.email , reservatie.reservatie_id,
     reservatie.kamer_id, reservatie.aankomst_datum, reservatie.Vertrek_datum, reservatie.Statuut, reservatie.tebetalen, reservatie.betalingOk 
    from klanten, reservatie WHERE klanten.klant_id = reservatie.klant_id 
    and reservatie.Statuut = 'Checked'")){

  

     
          // maak van de inhoud van deze result een json object waarvan
          // ook in android de juiste gegeventypes herkend worden
          $return = getJsonObjFromResult($result);
  
          // maak geheugenresources vrij :
         echo mysqli_free_result($result);
         
          die($return);

  }else{
      die(json_encode(1));
  }


}elseif($bewerking =="checkOut"){
    if(isset($_POST['idR'])&& isset($_POST['idRoom'])){
        $id = $_POST['idR'];
        $idRoom  =$_POST['idRoom'];
        
    $result = $conn -> query("UPDATE `reservatie` SET 
      `Statuut` = 'Checked Out'  WHERE 
      `reservatie`.`reservatie_id` = '".$id."'");
      $result = $conn -> query("UPDATE `kamers` SET `beschikbaar` = 'Ja' WHERE `kamers`.`kamers_id` = '".$idRoom."' ");

          die(json_encode(1));
        } else {
             die(json_encode(2). $conn -> error);
        }

}elseif($bewerking =="checkedOutreservaties"){
    
      
     
    if($result = $conn -> query("SELECT klanten.klant_id, klanten.naam, klanten.voornaam, klanten.email , reservatie.reservatie_id,
     reservatie.kamer_id, reservatie.aankomst_datum, reservatie.Vertrek_datum, reservatie.Statuut, reservatie.tebetalen, reservatie.betalingOk 
    from klanten, reservatie WHERE klanten.klant_id = reservatie.klant_id 
    and reservatie.Statuut = 'Checked Out'")){

     
          // maak van de inhoud van deze result een json object waarvan
          // ook in android de juiste gegeventypes herkend worden
          $return = getJsonObjFromResult($result);
  
          // maak geheugenresources vrij :
         echo mysqli_free_result($result);
         
          die($return);

  }else{
      die(json_encode(1));
  }


}elseif($bewerking =="getReservationId"){
    if(isset($_POST['idCheckin'])){
        $id = $_POST['idCheckin'];
     
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
}
/*
elseif($bewerking =="getPrijs"){
    if(isset($_POST['idres'])){
        $id = $_POST['idres'];
     
      $result = $conn -> query("SELECT kamers.kamers_id, kamers.id_soort, kamers.beschikbaar,  reservatie.reservatie_id,reservatie.kamer_id, reservatie.aankomst_datum, reservatie.Vertrek_datum, reservatie.Statuut, reservatie.tebetalen, reservatie.betalingOk,soort_kamer.soort_id , soort_kamer.soort_kamer, soort_kamer.beschrijving,soort_kamer.personen, soort_kamer.prijs  FROM kamers,reservatie,soort_kamer WHERE kamers.kamers_id = reservatie.kamer_id and kamers.id_soort = soort_kamer.soort_id and reservatie.reservatie_id = '".$id."' ");

       
            // maak van de inhoud van deze result een json object waarvan
            // ook in android de juiste gegeventypes herkend worden
            $return = getJsonObjFromResult($result);
    
            // maak geheugenresources vrij :
           echo mysqli_free_result($result);
           
            die($return);

    }else{
        die(json_encode("missing data"));
    }
}*/

    
    
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
