<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
require_once('php/Connection.php');

if (empty($_GET)) {
    echo "Deze pagina is voor jou niet toegankelijk";
    die();
}
if (!isset($_GET['id'])) {
    echo "Deze pagina is voor jou niet toegankelijk";
    die();
}


    $id=$_GET['id'];

    $sql=$conn -> query("SELECT * from klanten where md5(concat(email,'wijzigdezetekstvoordebeveiliging')) = '".$id."'");
    $row = mysqli_fetch_assoc($sql);
    if (empty($row)) {
        echo "Gebruiker niet gevonden !!!";
        die();
    }else{

        $temp =$row['email'];
        echo $temp;
    
    }
?>
<script>
   
 
      var test = "<?php echo $temp; ?>";
      sessionStorage.setItem("EmailChangePass", test);
    window.location.href = "http://localhost/O-Hotel/O-Hotel/www/wachtwoord.html";    

</script>
