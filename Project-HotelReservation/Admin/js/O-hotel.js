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
var link = 'https://o-hotel.000webhostapp.com/Admin/php/get_gegevens_Admin.php';
var IDProfiel;
var idInfo = 0;

//$(document).ready(function () {
//
//        
//         }
//    });

// het deactiveren van focus op tab id's

$$('#kamertab').click(function () {

    $$('#reservationtab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#accounttab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#logout').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$(this).removeClass('tab-link').addClass('tab-link tab-link-active');


});
$$('#reservationtab').click(function () {

    $$('#kamertab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#accounttab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#logout').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$(this).removeClass('tab-link').addClass('tab-link tab-link-active');


});
$$('#accounttab').click(function () {

    $$('#reservationtab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#kamertab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#logout').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$(this).removeClass('tab-link').addClass('tab-link tab-link-active');


});
$$('#logout').click(function () {

    $$('#reservationtab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#kamertab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#accounttab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$(this).removeClass('tab-link').addClass('tab-link tab-link-active');


});

function getKamers() {
   
    var data = {};
    data.bewerking = "getKamers";
    app.request.post(link, data, function (data, responseText, status) {

            // console.log(data);
            var list = (JSON.parse(status.responseText)).data;

            var i;
            for (i = 0; i < list.length; i++) {

                $$("#getKamer").append(`
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
                        <f7-card-footer>
                       
                        <Button id="btnKamer"  data-popup="#MyPopupKamer" Class="btnKamer popup-open" onclick="BewerkInfo(${list[i].kamer_id});">Kamer Info Bewerken</Button><br>
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

function BewerkInfo(intValue) {
    idInfo = intValue;
    var data = {};
    data.id = idInfo;
    data.bewerking = "getKamersInfo";
    app.request.post(link, data, function (data, responseText, status) {

        // console.log(data);
        var list = (JSON.parse(status.responseText)).data;

        var i;
        for (i = 0; i < list.length; i++) {
            $$("#popupKamer").append(`
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
        <div class="item-title item-label">Beschikbaarheid</div>
        <div class="item-input-wrap">
          <input id="beschikbaarheid" type="text" placeholder="${list[i].beschikbaarheid}" value="${list[i].beschikbaarheid}">
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
 <li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">Aantal kamers</div>
        <div class="item-input-wrap">
          <input id="aantal" type="text" placeholder="${list[i].aantal}" value="${list[i].aantal}">
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>
 <li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">Beschrijving</div>
        <div class="item-input-wrap">
        <textarea id="beschrijving" rows="20" cols="100">${list[i].beschrijving}
        </textarea>
          
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>
  </ul>
 <Button id="btnBewerkKamer" @click="$f7router.navigate('/kamers/')"  Class="btnBewerkKamer popup-close" onclick="updateInfoKamer(${list[i].kamer_id});">Bewerken</Button><br>
</div>

`);


        }
    });
}

function updateInfoKamer(intValue) {
app.dialog.confirm('Bent u zeker ?', 'Update Kamer controle', function () {
       
   
 idInfo = intValue;
    var soort = $$('#soort_kamer').val();
    var personen = $$('#personen').val();
    var prijs = $$('#prijs').val();
    var beschkbaar = $$('#beschikbaarheid').val();
    var aantalBesch = $$('#aantal').val();
    var beschrij = $$('#beschrijving').val();
    if (!soort || !personen || !prijs || !beschkbaar || !aantalBesch || !beschrij ) {

            app.dialog.alert('Gelieve alle tekstvelden in te vullen', 'Lege tekstvelden');
            return;
        } else {
            app.dialog.close();
             var data = {};
            data.id = idInfo;
            data.bewerking = "updateKamerInfo";
            data.soort = soort;
            data.personen = personen;
            data.prijs = prijs;
            data.beschkbaar = beschkbaar;
            data.aantalBesch = aantalBesch;
            data.beschrij = beschrij;
                    app.request.post(link, data, function (data) {

                       app.preloader.show();
                    var control = data;
                    if (control == 1) {
                     
                        
                        app.dialog.alert('Update is met success gelukt', 'Update van Kamer', function () {
                          app.preloader.hide();
                            this.$f7router.navigate('/kamers/');
                            
                        });

                    } else if (control == 2) {
                        app.dialog.alert('Er is een fout opgetreden, Probeer straks nog eens');
                        app.preloader.hide();
                    }

                    //mainView.router.loadPage('profiel.html');

                }, function (error, status) {

                    if (status === 0) {
                        app.dialog.alert('Geen internetverbinding', "Foutmelding");
                        app.preloader.hide();
                    } else {
                        app.dialog.alert('De server is momenteel niet toegankelijk', "Foutmelding");
                        app.preloader.hide();
                    }

                }

            );
            
            
            
            
        } });


}

function getProfile() {
    app.preloader.show();
    var cookies = [];
    if (document.cookie != "") {
        app.preloader.hide();
        // cookies = JSON.parse(document.cookie);
        //console.log(document.cookie);
        var data = document.cookie
        cookies = JSON.parse(data);
        console.log(cookies.data);
        document.getElementById("Admin_id").value = cookies.data[0].klant_id;
        document.getElementById("Ad_Voornaam").value = cookies.data[0].voornaam;
        document.getElementById("Ad_Naam").value = cookies.data[0].naam;
        document.getElementById("Ad_Straat").value = cookies.data[0].adres;
        document.getElementById("Ad_Gemeente").value = cookies.data[0].gemeente;
        document.getElementById("Ad_Postcode").value = cookies.data[0].postcode;
        document.getElementById("Ad_Geboortedatum").value = cookies.data[0].geboortedatum;
        document.getElementById("Ad_Geslacht").value = cookies.data[0].geslacht;
        document.getElementById("Ad_Phone").value = cookies.data[0].telefoonnummer;
        document.getElementById("Ad_Email").value = cookies.data[0].email;
        document.getElementById("Ad_Password").value = cookies.data[0].password;
        IDProfiel = cookies.data[0].klant_id;




    } else {
        var data = {};
        data.bewerking = "profielAdmin";
        data.Email = sessionStorage.getItem("Email");

        app.request.post(link, data, function (data, responseText, status) {
                //console.log(status.responseText);
                app.preloader.hide();
                var list = (JSON.parse(status.responseText)).data;
                console.log(status);
                document.getElementById("Admin_id").value = list[0].klant_id;
                document.getElementById("Ad_Voornaam").value = list[0].voornaam;
                document.getElementById("Ad_Naam").value = list[0].naam;
                document.getElementById("Ad_Straat").value = list[0].adres;
                document.getElementById("Ad_Gemeente").value = list[0].gemeente;
                document.getElementById("Ad_Postcode").value = list[0].postcode;
                document.getElementById("Ad_Geboortedatum").value = list[0].geboortedatum;
                document.getElementById("Ad_Geslacht").value = list[0].geslacht;
                document.getElementById("Ad_Phone").value = list[0].telefoonnummer;
                document.getElementById("Ad_Email").value = list[0].email;
                document.getElementById("Ad_Password").value = list[0].password;
                IDProfiel = list[0].klant_id;
                //console.log(IDProfiel);
                var myObject = JSON.parse(status.responseText);
                document.cookie = JSON.stringify(myObject);



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
        var email = $$('#Ad_Email').val();
        var password = $$('#Ad_Password').val();
        var voornaam = $$('#Ad_Voornaam').val();
        var naam = $$('#Ad_Naam').val();
        var straat = $$('#Ad_Straat').val();
        var gemeente = $$('#Ad_Gemeente').val();
        var postcode = $$('#Ad_Postcode').val();
        var geboortedatum = $$('#Ad_Geboortedatum').val();
        var geslacht = $$('#Ad_Geslacht').val();
        var phone = $$('#Ad_Phone').val();

        if (!email || !password || !voornaam || !naam || !phone || !straat || !gemeente || !postcode || !geboortedatum || !geslacht) {

            app.dialog.alert('Gelieve alle tekstvelden in te vullen', 'Lege tekstvelden');
            return;
        } else {
            var data = {};
            data.id = IDProfiel;
            data.bewerking = "updateAdmin";
            data.Email = email;
            data.Password = password;
            data.Voornaam = voornaam;
            data.Naam = naam;
            data.Straat = straat;
            data.Gemeente = gemeente;
            data.Geboortedatum = geboortedatum;
            data.Postcode = postcode;
            data.Geslacht = geslacht;
            data.userlevel = "admin";
            data.Phone = phone;

            app.request.post(link, data, function (data) {

                    app.preloader.show();
                    var control = data;
                    if (control == 1) {
                        app.preloader.show();
                        document.cookie = "";
                        app.dialog.alert('Update is met success gelukt', 'Update van uw profiel', function () {
                            location.reload();
                            //window.location.href = "Gebruiker/index.html";
                        });

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
    data.bewerking = "deleteAdmin";

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
//Klanten uithalen
function GetKlanten() {

    var data = {};
    data.bewerking = "Getklanten";
    data.userlevel = "klant";
    app.request.post(link, data, function (data, responseText, status) {
            //console.log(status.responseText);
            //console.log(data);
            var list = (JSON.parse(status.responseText)).data;

            var i;
            for (i = 0; i < list.length; i++) {

                $$("#klanten").append(`
                    <div class="card data-table data-table-collapsible data-table-init">
                      <div class="card-header">
                        <div class="data-table-title">${list[i].email}</div>

                        <div class="data-table-actions">
                   
                           <a onclick="ActiveerKlant(${list[i].klant_id});"  class="link icon-only">
                <i class="icon f7-icons ios-only">restore_from_trash</i>
                <i class="icon material-icons md-only">restore_from_trash</i>

                </a>
                <a data-popup="#MyPopup" onclick="MeerInfoKlant(${list[i].klant_id});" class="link icon-only  button-raised  popup-open">
                <i class="icon f7-icons ios-only">info</i>
                <i class="icon material-icons md-only">info</i>
                </a>
              
                <a onclick="VerwijderKlant(${list[i].klant_id});"  class="link icon-only">
                <i class="icon f7-icons ios-only">delete_sweep</i>
                <i class="icon material-icons md-only">delete_sweep</i></a>
                        
                        </div>
                      </div>
                      <div class="card-content">
                        <table>
                         <thead>
                            <tr>
                              <th class="label-cell">Id</th>
                              <th class="label-cell">Naam</th>
                                 <th class="label-cell">status</th> 
                            </tr>
                         </thead>
                          <tbody>
                            <tr>
                              <td class="label-cell">${list[i].klant_id}</td>
                              <td class="label-cell">${list[i].naam} ${list[i].voornaam}</td>
                             <td class="label-cell"> ${list[i].status}</td>
              
                           
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div> `);

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

function VerwijderKlant(intValue) {
    app.dialog.confirm('Ben jij zeker dat jij deze klant wilt verwijderen ?', 'Verwijder controle', function () {

        var idKlant = intValue;
        SendAjaxKlant(idKlant);
    });
}

function ActiveerKlant(intValue) {
    app.dialog.confirm('Ben jij zeker dat jij deze klant wilt activeren ?', 'Active controle', function () {


        var data = {};
        data.id = intValue;
        data.bewerking = "activeerKlant";

        // opgelet : niet doorsturen als JSON :
        // CORS & json data --> preflight == problemen!
        // var JSONData = JSON.stringify(data);
        // Daarom ook geen dataType : 'json' zetten ...
        app.request.post(link, data, function (data) {
                app.preloader.show();
                var control = data;
                if (control == 1) {
                    app.preloader.hide();
                    app.dialog.alert('Gekozen klant is met succes activeert', 'Activeren van de klant ');
                    app.$f7router.navigate('/klanten/');
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
    });
}

function MeerInfoKlant(intValue) {

    idInfo = intValue;
    var data = {};
    data.id = idInfo;
    data.bewerking = "GetklantInfo";
    data.userlevel = "klant";

    app.request.post(link, data, function (data, responseText, status) {
        //console.log(status.responseText);
        //console.log(data);
        var list = (JSON.parse(status.responseText)).data;

        $$("#popup").append(`
                    <div class="card data-table data-table-collapsible data-table-init">
                      <div class="card-header">
                        <div class="data-table-title">${list[0].email}</div>

                        <div class="data-table-actions">                       
                        </div>
                      </div>
                      <div class="card-content">
                        <table>
                          <thead>
                            <tr>
                              <th class="label-cell active">Id</th>
                              <th class="label-cell">Naam</th>
                              <th class="label-cell">Voornaam </th>
                              <th class="label-cell">Geboortedatum</th>
                                <th class="label-cell">Geslacht</th>
                                <th class="label-cell">Adres</th>
                                <th class="label-cell">Gemeente</th>
                                <th class="label-cell">Postcode</th>
                                <th class="label-cell">Nummer</th>
                             

                         
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="label-cell">${list[0].klant_id}</td>
                              <td class="label-cell">${list[0].naam}</td>
                              <td class="label-cell">${list[0].voornaam}</td>
                                <td class="label-cell">${list[0].geboortedatum}</td>
                                <td class="label-cell">${list[0].geslacht}</td>
                                <td class="label-cell">${list[0].adres}</td>
                                <td class="label-cell">${list[0].gemeente}</td>
                                <td class="label-cell">${list[0].postcode}</td>
                                <td class="label-cell">${list[0].telefoonnummer}</td>
                          

                            </tr>
                         
                          </tbody>
                        </table>
                      </div>
                    </div>
                        `);


    });



}

function SendAjaxKlant(idK) {
    // ajax call opzetten om een item te verwijderen.
    var data = {};
    data.id = idK;
    data.bewerking = "deleteKlant";

    // opgelet : niet doorsturen als JSON :
    // CORS & json data --> preflight == problemen!
    // var JSONData = JSON.stringify(data);
    // Daarom ook geen dataType : 'json' zetten ...
    app.request.post(link, data, function (data) {
            app.preloader.show();
            var control = data;
            if (control == 1) {
                app.preloader.hide();
                app.dialog.alert('Gekozen Account is met succes verwijderd', 'Verwijderen van de profiel');
                location.reload();
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


//Klanten te contacteren
function tecontacteren() {
    var data = {};
    data.bewerking = "GetContacten";

    app.request.post(link, data, function (data, responseText, status) {
            //console.log(status.responseText);
            //console.log(data);
            var list = (JSON.parse(status.responseText)).data;

            var i;
            for (i = 0; i < list.length; i++) {

                $$("#contacten").append(`
                    <div class="card data-table data-table-collapsible data-table-init">
                      <div class="card-header">
                        <div class="data-table-title">${list[i].email}</div>

                        <div class="data-table-actions">
                         
                <a onclick="Verwijdercontact(${list[i].Contact_ID});" class="link icon-only">
                <i class="icon f7-icons ios-only">highlight_off</i>
                <i class="icon material-icons md-only">highlight_off</i>
                </a>
                        
                        </div>
                      </div>
                      <div class="card-content">
                        <table>
                          <thead>
                            <tr>
                              <th class="label-cell active">Id</th>
                              <th class="label-cell">Naam</th>
                              <th class="label-cell">Nummer </th>
                              <th class="label-cell">Message</th>
                         
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="label-cell">${list[i].Contact_ID}</td>
                              <td class="label-cell">${list[i].Naam}</td>
                              <td class="label-cell">${list[i].gsmnummer}</td>
                                <td class="label-cell">${list[i].Message}</td>
                            </tr>
                         
                          </tbody>
                        </table>
                      </div>
                    </div>
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

function Verwijdercontact(intValue) {
    app.dialog.confirm('Ben jij zeker dat jij deze Contact wilt verwijderen ?', 'Verwijder controle', function () {


        var data = {};
        data.id = intValue;
        data.bewerking = "deleteContact";

        // opgelet : niet doorsturen als JSON :
        // CORS & json data --> preflight == problemen!
        // var JSONData = JSON.stringify(data);
        // Daarom ook geen dataType : 'json' zetten ...
        app.request.post(link, data, function (data) {
                app.preloader.show();
                var control = data;
                if (control == 1) {
                    app.preloader.hide();
                    app.dialog.alert('Gekozen Contact is met succes verwijderd', 'Verwijderen van de Contact Message');
                    location.reload();
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
    });
}
