<?php

    $servername = "localhost"; // vervang dit door de servernaam die je van je hosting firma hebt ontvangen
    $username   = "id7578167_ohotel"; // vervang dit door de gebruikersnaam die je van je hosting firma hebt ontvangen
    $password   = "Emmy2110"; // vervang dit door het paswoord dat je van je hosting firma hebt ontvangen
  
    $dbname     = "id7578167_ohotel"; // vervang dit door de naam van de databank die je van je hosting firma hebt ontvangen

    // Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname) or die(mysqli_connect_error());
    
if (!$conn) {
       echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}




?>