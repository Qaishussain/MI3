"use strict";
/*global Framework7, Dom7 */
//import myApp from './libs/framework7';
//import framework, {Component} from 'framework7-vue';

var $$ = Dom7;
var link = 'https://o-hotel.000webhostapp.com/php/gegevens.php';
var app = new Framework7({
    root: '#app', // App root element
    id: 'io.framework7.testapp', // App bundle ID
    name: 'Framework7', // App name
    theme: 'auto', // Automatic theme detection
 

});

//Swiper
var swiper = app.swiper.get('.swiper-container');
swiper.slideNext();


var Email = "";

// het deactiveren van focus op tab id's

$$('#kamertab').click(function () {

    $$('#hometab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#logintab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$(this).removeClass('tab-link').addClass('tab-link tab-link-active');


});
$$('#hometab').click(function () {

    $$('#kamertab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#logintab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$(this).removeClass('tab-link').addClass('tab-link tab-link-active');


});
$$('#logintab').click(function () {

    $$('#hometab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#kamertab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$(this).removeClass('tab-link').addClass('tab-link tab-link-active');


});

function Contact() {
    var nameContact = $$('#nameContact').val();

    var emailContact = $$('#emailContact').val();

    var gsmContact = $$('#gsmnummerContact').val();
    var messageContact = $$('#messageContact').val();

    if (!nameContact || !emailContact || !gsmContact || !messageContact) {

        app.dialog.alert('Gelieve alle tekstvelden in te vullen', 'Lege tekstvelden');
        return;
    } else {
        var data = {};
        data.bewerking = "contactgegevens";
        data.nameContact = $$("#nameContact").val();
        data.emailContact = $$("#emailContact").val();
        data.gsmContact = $$("#gsmnummerContact").val();
        data.messageContact = $$("#messageContact").val();
        app.request.post(link, data, function (data) {
                app.preloader.show();
                var control = data;
                if (control == 1) {
                    app.dialog.alert('U Formulier is met succes doorgestuurd. We contacteren u zo snel mogelijk.', 'Beste ' + nameContact, function () {
                        window.location.href = "index.html";
                    });

                } else if (control == 2) {
                    app.dialog.alert('Er is een fout opgetreden, Probeer straks nog eens', data.nameContact);
                } else if (control == 3) {
                    app.dialog.alert('Missing data', data.nameContact);
                }
            }, function (error, status) {

                if (status === 0) {
                    app.dialog.alert('Geen internetverbinding', "Foutmelding");

                } else {
                    app.dialog.alert('De server is momenteel niet toegankelijk', "Foutmelding");

                }

            }

        );


    }

}

function KamersOphalen() {

    var data = {};
    data.bewerking = "GetKamers";
    app.request.post(link, data, function (data, responseText, status) {

            // console.log(data);
            var list = (JSON.parse(status.responseText)).data;

            var i;
            for (i = 0; i < list.length; i++) {

                $$("#kamers").append(`
                <div class="card data-table data-table-collapsible data-table-init">
                    <f7-card>
 <div class="card-header">
                        <div class="data-table-title"> ${list[i].soort_kamer}</div>

                       
          
</div>
                 
   
               <p > <img src="Images/foto${list[i].kamer_id}.jpg" style="width: 100%;height:auto;">  </p>


                        <f7-card-content>
                        <h4 style="padding-left: 10px;" >Informatie</h4>
                            <p class="date"></p>
                            <p style="padding-left: 10px;">${list[i].beschrijving}</p>
                    <h4 style="padding-left: 10px;" >Prijs: ${list[i].prijs} € </h4>
            
                        </f7-card-content>
                  
                </f7-card>
                 
</div><br>
`);

            }

            var control = data;

            if (control == 1) {
                app.dialog.alert('Geen records beschikbaar', 'Foutmelding');
            }

        }, function (error, status) {

            if (status === 0) {
                app.dialog.alert('Geen internetverbinding', "Foutmelding");
            } else {
                app.dialog.alert('De server is momenteel niet toegankelijk', "Foutmelding");
            }
        }

    );


}
function inschrijven() {
    var email = $$('#Email').val();
    var password = $$('#Password').val();
    var voornaam = $$('#Voornaam').val();
    var naam = $$('#Naam').val();
    var straat = $$('#Straat').val();
    var gemeente = $$('#Gemeente').val();
    var postcode = $$('#Postcode').val();
    var geboortedatum = $$('#Geboortedatum').val();
    var geslacht = $$('#Geslacht').val();
    var phone = $$('#Phone').val();


    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;




    if (!email || !password || !voornaam || !naam || !phone || !straat || !gemeente || !postcode || !geboortedatum) {
        app.dialog.alert('Gelieve alle tekstvelden in te vullen', 'Lege tekstvelden');
        return;
    } else if (email == '' || !re.test(email)) {
        app.dialog.alert('Please enter a valid email address. ' + email, ' Probleem');
        return false;
    } else {




        var data = {};
        data.bewerking = "add";
        data.Email = email;
        data.Password = password;
        data.Voornaam = voornaam;
        data.Naam = naam;
        data.Straat = straat;
        data.Gemeente = gemeente;
        data.Geboortedatum = geboortedatum;
        data.Postcode = postcode;
        data.Geslacht = geslacht;
        data.userlevel = "klant";
        data.Phone = phone;

        app.request.post(link, data, function (data) {
                app.dialog.preloader('Loading...');
                console.log(data);
                var control = data;
                app.dialog.close();
                if (control == 1) {

                    app.dialog.alert(' U bent met succes ingeschreven.', 'Beste ' + voornaam);
                    //window.location.reload();
              
                   


                } else if (control == 2) {
                    app.dialog.alert('Er is een fout opgetreden, Probeer straks nog eens', 'Probleem melding');
                    window.location.reload();
                } else if (control == 3) {
                    //  app.preloader.hide();
                    app.dialog.alert('Dit Email adres bestaat er al, gelieve een ander email adres in te geven', 'Probleem melding ');
                    //window.location.reload();



                }



            }, function (error, status) {

                if (status === 0) {
                    app.dialog.alert('Geen internetverbinding', "Foutmelding");
                } else {
                    app.dialog.alert('De server is momenteel niet toegankelijk', "Foutmelding");
                }

            }

        );
    }
}

function checkLogin() {

    var email = $$('#LEmail').val();
    var password = $$('#Lpassword').val();
    var usrlvl = $$('#usrlevel').val();

    if (!email || !password || !usrlvl) {
        app.dialog.alert('Gelieve alles in te vullen & selecteren', 'Lege tekstvelden');
        return;
    } else {
        var data = {};
        data.bewerking = "check";
        data.usrlvl = $$('#usrlevel').val();
        data.Gebruikersnaam = $$("#LEmail").val();
        data.Wachtwoord = $$("#Lpassword").val();

        app.request.post(link, data, function (data, status, XHR) {
                app.preloader.show();

                var control = data;
                app.preloader.hide();
                if (control == "success") {

                    loginsuccess();

                } else if (control == 2) {

                    app.dialog.alert("Password incorrect.", "Foutmelding");
                    app.preloader.hide();
                } else if (control == 3) {

                    app.dialog.alert("Gegevens bestaan niet.", "Foutmelding");
                    app.preloader.hide();
                } else if (control == 4) {

                    app.dialog.alert("Account is deactiveerd. Neem contact op via de contactpagina. ", "Foutmelding");
                    app.preloader.hide();
                }


            }, function (error, status) {

                if (status === 0) {
                    app.dialog.alert('Geen internetverbinding', "Foutmelding");
                } else {
                    app.dialog.alert('De server is momenteel niet toegankelijk', "Foutmelding");
                }

            }

        );

    }
}

function loginsuccess() {
    var usrlvl = $$('#usrlevel').val();
    var getInput = $$('#LEmail').val();
    //console.log(getInput);
    if (usrlvl == "klant") {
        sessionStorage.setItem("Email", getInput);

        window.location.href = "Gebruiker/index.html";
    } else if (usrlvl == "admin") {

        sessionStorage.setItem("Email", getInput);
        //  console.log(getInput);
        window.location.href = "Admin/index.html";
    }

}

