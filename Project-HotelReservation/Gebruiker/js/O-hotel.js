"use strict";
/*global Framework7, Dom7 */
//import myApp from './libs/framework7';
//import framework, {Component} from 'framework7-vue';
var $$ = Dom7;
var app = new Framework7({
    root: '#app', // App root element
    id: 'io.framework7.testapp', // App bundle ID
    name: 'Framework7', // App name
    theme: 'auto', // Automatic theme detection
});
var link = 'https://o-hotel.000webhostapp.com/Gebruiker/php/get_gegevens.php';
var IDProfiel;
var idInfo = "";



window.onload = KamersOphalen();

function KamersOphalen() {

    var data = {};
    data.bewerking = "GetKamers";
    app.request.post(link, data, function (data, responseText, status) {

            // console.log(data);
            var list = (JSON.parse(status.responseText)).data;

            var i;
            for (i = 0; i < list.length; i++) {

                $$("#kamersBeschikbaar").append(`
                <div class="card data-table data-table-collapsible data-table-init">
                    <f7-card>
 <div class="card-header">
                        <div class="data-table-title"> ${list[i].soort_kamer}</div>

                       
                        
                <a data-popup="#MyPopup" onclick="MeerInfoKamer(${list[i].kamer_id});" class="link icon-only  button-raised popup-open">
                <i class="icon f7-icons ios-only">info</i>
                <i class="icon material-icons md-only">info</i>
                </a>    
</div>
                 
   
               <p > <img src="Images/foto${list[i].kamer_id}.jpg" style="width: 100%;height:auto;">  </p>


                        <f7-card-content>
                        <h4 style="padding-left: 10px;" >Informatie</h4>
                            <p class="date"></p>
                            <p style="padding-left: 10px;">${list[i].beschrijving}</p>
                    <h4 style="padding-left: 10px;" >Prijs: ${list[i].prijs} € </h4>
                 <h4 style="text-align:center; color:red;" >Aantal beschikbbaar: ${list[i].aantal}  </h4>
                        </f7-card-content>
                        <f7-card-footer>
                        <Button id="btnBookNow"  data-popup="#MyPopupBooking" Class="btnBookNow popup-open" onclick="BookNow(${list[i].kamer_id});">Book Now</Button><br>
                       
                      </f7-card-footer>
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
 function BookNow(intValue) {
     var data = {};
     data.bewerking = "GetKamerInfo";
   data.kamerid = intValue; //kamer_id
   var Email = sessionStorage.getItem("Email"); //email
     
    app.request.post(link, data, function (data, responseText, status) {

        console.log(data);
            var list = (JSON.parse(status.responseText)).data;

            var i;
            for (i = 0; i < list.length; i++) {

     
     
    $$("#popupBooking").append(`
                        <div class="list no-hairlines-md">
  <ul>
    <li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">Kamer Naam</div>
        <div class="item-input-wrap">
          <input id="soort_kamer"type="text" placeholder="${list[i].soort_kamer}" value="${list[i].soort_kamer}">
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>
<li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">Personen</div>
        <div class="item-input-wrap">
          <input id="personen" type="text" placeholder="${list[i].personen}" value="${list[i].personen}">
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>

    <li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">Email</div>
        <div class="item-input-wrap">
          <input id="beschikbaarheid" type="text" value="${Email}">
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>
 
 <li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">Check In</div>
        <div class="item-input-wrap">
         <input id="CheckIn" type="date" >
          
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>
<li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">Check Out</div>
        <div class="item-input-wrap">
               <input id="CheckOut" type="date" >
          
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>
        <li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">Prijs</div>
        <div class="item-input-wrap">
          <input id="prijs" type="text" placeholder="${list[i].prijs}" value="${list[i].prijs}">
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>

  </ul>
 <Button id="BookNow" @click="$f7router.navigate('/reservaties/')"  Class="btnBewerkKamer popup-close" onclick="reserveerKamer(${list[i].kamer_id});">Book Now</Button><br>
</div>







`);

     
            }
        });
     
     
 }
function reserveerKamer(intValue){
    
    
    
}
     
function MeerInfoKamer(intValue) {

    idInfo = intValue;
    var data = {};
    data.id = idInfo;
    console.log(data.id);
    data.bewerking = "GetKamerInfo";


    app.request.post(link, data, function (data, responseText, status) {
        //console.log(status.responseText);
        //  console.log(data);
        var list = (JSON.parse(status.responseText)).data;
     
        $$("#popup").append(`
                    <div class="card data-table data-table-collapsible data-table-init">
                    <f7-card>
 <div class="card-header">
                        <div class="data-table-title"> ${list[0].soort_kamer}</div>

                       
                        
                 
</div>
                 
   
               <p > <img src="Images/foto${list[0].kamer_id}.jpg" style="width: 100%;height:auto;">  </p>


                        <f7-card-content>
                        <h4 style="padding-left: 10px;" >Informatie</h4>
                            <p class="date"></p>
                            <p style="padding-left: 10px;">${list[0].beschrijving}</p>
                            <p style="padding-left: 10px;">${list[0].beschrijving}</p>
                            <p style="padding-left: 10px;">${list[0].beschrijving}</p>
                            <h4 style="padding-left: 10px;" >Prijs: ${list[0].prijs} € </h4>
                        </f7-card-content>
                        <f7-card-footer>
                       
                       
                      </f7-card-footer>
                </f7-card>
                 
</div><br>
  `);
     
    
        // Create notification with close button
        var notificationWithButton = app.notification.create({
            icon: '<i class="icon material-icons md-only ">watch_later</i>',
            title: 'Belangerijk melding',
            titleRightText: 'now',
            subtitle: `Aantal beschikbaar ${list[0].soort_kamer} zijn ${list[0].aantal}`,
            text: 'Doe snel om te reserveren...',
            closeButton: true,
        });

 notificationWithButton.open();


        var control = data;

        if (control == 1) {
            app.dialog.alert('Geen records beschikbaar', 'Foutmelding');
        }

    });





}
// reset van id *_*
function popFunction() {
    app.dialog.preloader("Loading");
    if (window.location.href = "Gebruiker/index.html") {
        location.reload();



    }

}

// het deactiveren van focus op tab id's

$$('#kamertabGeb').click(function () {

    $$('#reservationtab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#accounttabGeb').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#logout').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$(this).removeClass('tab-link').addClass('tab-link tab-link-active');


});
$$('#reservationtab').click(function () {

    $$('#kamertabGeb').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#accounttabGeb').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#logout').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$(this).removeClass('tab-link').addClass('tab-link tab-link-active');


});
$$('#accounttabGeb').click(function () {

    $$('#reservationtab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#kamertabGeb').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#logout').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$(this).removeClass('tab-link').addClass('tab-link tab-link-active');


});
$$('#logout').click(function () {

    $$('#reservationtab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#kamertabGeb').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#accounttabGeb').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$(this).removeClass('tab-link').addClass('tab-link tab-link-active');


});





function getProfile() {
    app.preloader.show();
    var cookies = [];

    if (document.cookie != "") {
        app.preloader.hide();
        // cookies = JSON.parse(document.cookie);
        //console.log(document.cookie);
        var data = document.cookie
        cookies = JSON.parse(data);
        // console.log(cookies[0].klant_id);




        document.getElementById("klant_id").value = cookies[0].klant_id;
        document.getElementById("Voornaam").value = cookies[0].voornaam;
        document.getElementById("Naam").value = cookies[0].naam;
        document.getElementById("Straat").value = cookies[0].adres;
        document.getElementById("Gemeente").value = cookies[0].gemeente;
        document.getElementById("Postcode").value = cookies[0].postcode;
        document.getElementById("Geboortedatum").value = cookies[0].geboortedatum;
        document.getElementById("Geslacht").value = cookies[0].geslacht;
        document.getElementById("Phone").value = cookies[0].telefoonnummer;
        document.getElementById("Email").value = cookies[0].email;
        document.getElementById("Password").value = cookies[0].password;
        IDProfiel = cookies[0].klant_id;

    } else {
        var data = {};
        data.bewerking = "profiel";
        data.Email = sessionStorage.getItem("Email");

        app.request.post(link, data, function (data, responseText, status) {
                //console.log(status.responseText);
                app.preloader.hide();
                var list = (JSON.parse(status.responseText)).data;

                console.log(status);
                document.getElementById("klant_id").value = list[0].klant_id;
                document.getElementById("Voornaam").value = list[0].voornaam;
                document.getElementById("Naam").value = list[0].naam;
                document.getElementById("Straat").value = list[0].adres;
                document.getElementById("Gemeente").value = list[0].gemeente;
                document.getElementById("Postcode").value = list[0].postcode;
                document.getElementById("Geboortedatum").value = list[0].geboortedatum;
                document.getElementById("Geslacht").value = list[0].geslacht;
                document.getElementById("Phone").value = list[0].telefoonnummer;
                document.getElementById("Email").value = list[0].email;
                document.getElementById("Password").value = list[0].password;
                IDProfiel = list[0].klant_id;
                //console.log(IDProfiel);
                var myObject = JSON.parse(status.responseText).data;
                document.cookie = JSON.stringify(myObject);
                console.log(document.cookie);


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



function AccountBewerken() {
    app.dialog.confirm('Wil u uw account berwerken?', 'Bewerking controle', function () {
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
        if (!email || !password || !voornaam || !naam || !phone || !straat || !gemeente || !postcode || !geboortedatum) {
            app.dialog.alert('Gelieve alle tekstvelden in te vullen', 'Lege tekstvelden');
            return;
        } else {
            var data = {};
            data.id = IDProfiel;
            data.bewerking = "update";
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
                    app.preloader.show();
                    // console.log(data);
                    var control = data;

                    if (control == 1) {
                        app.preloader.hide();
                        document.cookie = "";
                        app.dialog.alert('Update is met success gelukt', 'Update van uw profiel');

                    } else if (control == 2) {
                        app.preloader.hide();
                        app.dialog.alert('Er is een fout opgetreden, Probeer straks nog eens');
                    }

                    //mainView.router.loadPage('profiel.html');

                }, function (error, status) {

                    if (status === 0) {
                        app.dialog.alert('Geen internetverbinding', "Foutmelding");
                    } else {
                        app.dialog.alert('De server is momenteel niet toegankelijk', "Foutmelding");
                    }

                }

            );
        }
    });
}
//verwijderen van account
function AccountVerwijderen() {
    app.dialog.confirm('Bent u zeker  account te verwijderen?', 'Verwijdering controle', function () {
        sendAjax(IDProfiel);
    });
}

// afmelden
function afmelden() {

    if (document.cookie != "") {
        document.cookie = "";
        //console.log(document.cookie);
        sessionStorage.setItem("Email", "");
        app.preloader.show();
        window.location.href = "../index.html";
    } else {
        sessionStorage.setItem("Email", "");
        app.preloader.show();
        window.location.href = "../index.html";
    }
}

function sendAjax(id) {
    // ajax call opzetten om een item te verwijderen.
    var data = {};
    data.id = id;
    data.bewerking = "delete";

    // opgelet : niet doorsturen als JSON :
    // CORS & json data --> preflight == problemen!
    // var JSONData = JSON.stringify(data);
    // Daarom ook geen dataType : 'json' zetten ...
    app.request.post(link, data, function (data) {
            app.preloader.show();
            var control = data;
            if (control == 1) {
                app.preloader.hide();
                app.dialog.alert('Uw Account is met succes verwijderd. U wordt terug gestuurd naar Homepagina.', 'Verwijderen van uw profiel');
                sessionStorage.setItem("Email", "");
                setTimeout(function () {
                    location.replace("../index.html");
                }, 2000);
            } else if (control == 2) {
                app.dialog.alert('Er is een fout opgetreden, Probeer straks nog eens');
            }

            //mainView.router.loadPage('profiel.html');

        }, function (error, status) {

            if (status === 0) {
                app.dialog.alert('Geen internetverbinding', "Foutmelding");
            } else {
                app.dialog.alert('De server is momenteel niet toegankelijk', "Foutmelding");
            }

        }

    );

}
