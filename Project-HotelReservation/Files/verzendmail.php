
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
require_once('php/Connection.php');
require_once('mailer/PHPMailerAutoload.php');
$mail = new PHPMailer;

//Enable SMTP debugging. 
$mail->SMTPDebug = 0;                               
//Set PHPMailer to use SMTP.
$mail->isSMTP();            
//Set SMTP host name                          
$mail->Host = "smtp.gmail.com";
//Set this to true if SMTP host requires authentication to send email
$mail->SMTPAuth = true;                          
//Provide username and password     
$mail->Username = "Qais.odisee@gmail.com";                 
$mail->Password = "143QAIS54726q";                           
//If SMTP requires TLS encryption then set it
$mail->SMTPSecure = "tls";                           
//Set TCP port to connect to 
$mail->Port = 587;                                   
if(isset($_POST['email'])){
    $emailAdres = $_POST['email'];
   // echo $emailAdres;
    $sql=$conn -> query("SELECT * FROM klanten WHERE klanten.email =  '".$emailAdres."'");
    $row = mysqli_fetch_assoc($sql);
   // $test = $row['email'];
  // $test = $row['naam'];
   //$test2 = $row['voornaam'];
 // Free result set
    //echo $test , $test2;
   
    if (empty($row)) {
    echo "No email";
    die();
}
}else{
    echo "no email get";
}

$mail->From = "Qais.odisee@gmail.com";
$mail->FromName = "O-Hotel";

//$mail->addAddress("yvh@telenet.be", "Yves Van Hal");
$mail->addAddress($row['email'], $row['naam'] . " " . $row['voornaam']);
//echo $row['email'], $row['naam'] . " " . $row['voornaam'];
$mail->isHTML(true);
$id = md5($emailAdres . 'wijzigdezetekstvoordebeveiliging');

$mail->Subject = "Paswoord wijzigen";
$mail->Body = "<img src=\"cid:logo\">";
$mail->Body .= "<h1 class='text-center'>Aanvraag tot wijzigen van Wachtwoord</h1>";
$mail->Body .= "<p class='description'>Er werd gevraagd om het paswoord te wijzigen voor deze email adres : $emailAdres.</p>";
$mail->Body .= "<p>Wanneer je zelf deze aanvraag niet hebt gedaan, gelieve dit bericht dan te negeren.</p>";
$mail->Body .= "<p>Wil je toch je paswoord wijzigen, klik dan op onderstaande koppeling.</p>";
$mail->Body .= "<a href=\"http://localhost/O-Hotel/O-Hotel/www/wijzigwachtwoord.php?id=$id\">Wachtwoord wijzigen</a>";
$mail->AddEmbeddedImage('Images/Logo/apple-icon-180x180.ico','logo');
$mail->AltBody = "Aanvraag tot wijzigen van paswoord\n";
$mail->AltBody .= "Er werd gevraagd om het paswoord te wijzigen voor deze gebruiker.\n";
$mail->AltBody .= "Wanneer je zelf deze aanvraag niet hebt gedaan, gelieve dit bericht dan te negeren.\n";
$mail->AltBody .= "Wil je toch je paswoord wijzigen, kopieer onderstaande koppeling dan in je browser.\n";
$mail->AltBody .= "http://localhost/O-Hotel/O-Hotel/www/wijzigwachtwoord.php?id=$id\n";

if(!$mail->send()) 
{
    echo "Mailer Error: " . $mail->ErrorInfo;
} 
else 
{
    echo "1";
}
?>