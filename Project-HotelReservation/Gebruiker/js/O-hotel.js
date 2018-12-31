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
var Email = sessionStorage.getItem("Email");
var idKlantGet;
var idKamerss;

var fiveMinutes = 60*5,
display ;
var start = Date.now(),
        diff,
        minutes,
        seconds;
var intervalTimer;
window.onload=getId, app.view.current.router.navigate('/kamers/');

function getId() {
   
    if (Email == null) {
        app.dialog.alert("Please log in ", "Error", function () {
            window.location.href = "../index.html";
        });
    } else {
        var data = {};
        data.bewerking = "profiel";
        data.Email = Email;
        app.request.post(link, data, function (data) {
            var list = JSON.parse(data).data;
            idKlantGet = list[0].klant_id;
     

        });
    }
    
}
$$(document).on('click','a', function () {
    //define link
    var link = $$(this);

    //put link in timetout context, we need wait 1400 ms until animation finish then we can start animation to hide ripple effect
    setTimeout(function (link_a) {
        return function () {
            //we find all ripples -> for each of them we start hide animation -> then we need to wait another 1400 ms until finish application
            link_a.find(".ripple-wave").each(function (index, ripple) {
                $$(ripple).css('opacity', 0);

                setTimeout(function (ripple) {
                    return function () {
                        $$(ripple).remove();
                    }
                }(ripple), 500);

            })
        }
}(link), 500);   });
function backFunction(){
       
    app.view.current.router.navigate('/kamers/');

 
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

var today = new Date();

function KamersOphalen() {
   

    var checkInDate = $$("input#checkIn.input-with-value").val();
    var checkOutDate =$$("input#checkOut.input-with-value").val();
    if (!checkInDate || !checkOutDate) {
        app.dialog.alert('Please fill in all the fields.', 'Missing fields');
        return;
    } else {

        
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' +dd;

        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(checkInDate);
        var secondDate = new Date(checkOutDate);

        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
  
        if (checkInDate < today) {
          
            app.dialog.alert('Date can not be smaller than today', "Error");
            return;
        } else {
            if (checkOutDate <= checkInDate) {
              
                app.dialog.alert('Check-out date can not be smaller or equal to check-in date', "Error");
                return;
            } else {

                var data = {};
                data.bewerking = "GetKamers";
                data.InDate = checkInDate;
              
                app.request.post(link, data, function (data, responseText, status) {
                        
                  
                        var list = (JSON.parse(status.responseText)).data;
                        var i;
                        $$("#kamersBeschikbaar").empty();
                        for (i = 0; i < list.length; i++) {
                            var totaalprijs = diffDays * list[i].prijs;
                           
                            $$("#kamersBeschikbaar").append(`
                           
                <div class="card data-table data-table-collapsible data-table-init">
                    <f7-card>
 <div class="card-header">
                        <div class="data-table-title"> ${list[i].soort_kamer} Nr. ${list[i].kamers_id} </div>

                       
                        
                <a data-popup="#MyPopup" onclick="MeerInfoKamer(${list[i].kamers_id},${list[i].soort_id}  );" class="link icon-only  button-raised popup-open">
                <i class="icon f7-icons ios-only">info</i>
                <i class="icon material-icons md-only">info</i>
                </a>    
</div>
                 
   
               <p > <img src="Images/${list[i].kamers_id}.jpg" style="width: 100%;height:auto;">  </p>


                        <f7-card-content>
                        <h4 style="padding-left: 10px;" >Information</h4>
                            <p class="date"></p>
                            <p style="padding-left: 10px;">${list[i].beschrijving}</p>
                    <h4 style="padding-left: 10px;" >Price for ${diffDays} night/nights: ${totaalprijs} € </h4>
                 
                        </f7-card-content>
                        <f7-card-footer>
                       
                        <Button id="btnBookNow"  Class="btnBookNow" onclick="BookNow(${list[i].kamers_id}, ${totaalprijs},${list[i].soort_id} )">Select</Button><br>
                       
                      </f7-card-footer>
                </f7-card>
                 
</div><br>
`);
//<h4 style="text-align:center; color:red;" >Aantal beschikbbaar: ${list[i].aantal}  </h4>
                        }

                        var control = data;

                        if (control == 1) {
                            app.dialog.alert('No records available.', 'Error');
                        }

                    }, function (error, status) {

                        if (status === 0) {
                            app.dialog.alert('No internet connection.', "Error");
                        } else {
                            app.dialog.alert('The server is not available.', "Error");
                        }
                    }

                );
            }
        }
    }

}

function startTimer(duration, display) {
    start = Date.now();
    if(intervalTimer !== null){
        clearInterval(intervalTimer);
    }
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        for (var i = 0; i < display.length; i++) {

            display[i].textContent = minutes + ":" + seconds; 

        }
        if(diff <= 60){
   
            document.getElementsByClassName("time")[0].setAttribute("id", "time"); 

         
        }
        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
        //start = Date.now() + 0;
        clearInterval(intervalTimer);
           timeOutNow();
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    intervalTimer =  setInterval(timer, 1000);

}




function BookNow(idKamer, prijs, idSoort) {
    idKamerss = idKamer;
    app.view.current.router.navigate('/BookingForm/');
    var data = {};
    data.bewerking = "GetInfoBooking";
    data.id = idKamer; //soort_id
    data.soortid = idSoort;
   

    app.request.post(link, data, function (data, responseText, status) {

  
        var list = (JSON.parse(status.responseText)).data;

        var i;
        for (i = 0; i < list.length; i++) {


            $$("#BookNowForm").append(`
   
    <div class="list no-hairlines-md">
    <ul>
    

    <li class="item-content item-input">
        <div class="item-inner">
            <div class="item-title item-label">Timer</div>
            <div class="item-input-wrap">
                <div  class="time"></div>
            </div>
        </div>
    </li>
    <li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">Room no.</div>
        <div class="item-input-wrap">
          <input id="kamers_id"type="text" placeholder="${list[i].kamers_id}" value="${list[i].kamers_id}" readonly>
          <span class="input-clear-button"></span>
          </div>
          </div>
        </li>
    <li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">Room type</div>
        <div class="item-input-wrap">
          <input id="soort_kamer"type="text" placeholder="${list[i].soort_kamer}" value="${list[i].soort_kamer}" readonly>
          <span class="input-clear-button"></span>
          </div>
          </div>
        </li>

        <li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">People</div>
        <div class="item-input-wrap">
          <input id="personen" type="text" placeholder="${list[i].personen}" value="${list[i].personen}" readonly>
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>

    <li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">Email</div>
        <div class="item-input-wrap">
          <input id="emailBookingForm" type="text" value="${Email}" readonly>
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>
     
    <li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">Price</div>
        <div class="item-input-wrap">
          <input id="prijs" type="text" placeholder="${prijs}" value="${prijs}" readonly>
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>
    <li>
    <div class="item-content item-input">
        <div class="item-inner">
            <div class="item-title item-label">Check-in</div>
            <div class="item-input-wrap">
                <input type="text" name="checkIn" value="${$$("input#checkIn").val()}" readonly>
            </div>
        </div>
    </div>
</li>
<li>
    <div class="item-content item-input">
        <div class="item-inner">
            <div class="item-title item-label">Check-out</div>
            <div class="item-input-wrap">
                <input type="text" name="Checkout"  value="${$$("input#checkOut").val()}" readonly>
            </div>
        </div>
    </div>
</li>
  

  </ul>
  
 <Button id="BookNow"  Class="btnBewerkKamer popup-close" onclick="reserveerKamer(${list[i].kamers_id}, ${prijs});">Book Now (<span class="time"></span> left) </Button><br>
</div>
`);
display = document.getElementsByClassName('time');
    startTimer(fiveMinutes, display);

        }
    });

}
function timeOutNow(){
    
        app.dialog.alert('You have taken too long. You will be sent back to the index page', 'Timeout', function () {
            var changeStatus = {};
            changeStatus.bewerking = "ChangeStatus";
            changeStatus.id = idKamerss;

      app.request.post(link, changeStatus, function (changeStatus) {

             
                var control = changeStatus;
                if (control == 1) {
                    app.view.current.router.navigate('/kamers/');
                }else if(control == 2){
                    app.dialog.alert("There was a problem whilst booking. ", "Error");
                    app.dialog.alert("Try again.", "Error");
                    app.view.current.router.navigate('/kamers/');
                }

            });
        });
  
}
function reserveerKamer(kmr_id, prijskamer) {

    var In = $$("input#checkIn").val();
    var out = $$("input#checkOut").val();



    var data = {};
    data.bewerking = "opslaanReservatie";
    data.CheckIn = In;
    data.CheckOut = out;
    data.prijs = prijskamer;
    data.idKamer = kmr_id;
    data.idGetKl = idKlantGet;
    data.status = "Booked";
    data.betalingOk = "No";

 

    app.request.post(link, data, function (data) {

 
        app.dialog.preloader('Loading...');
        var control = data;
        app.dialog.close();
        if (control == 1) {

            app.dialog.alert('Reservation successfully booked.', 'Success');
            setTimeout(function () {
                app.view.current.router.navigate('/reservation/');
                reservatieTonen();

            }, 1000);
        } else if (control == 2) {
            app.dialog.alert('A problem has occurred. Please try again later.', 'Error');
            window.location.reload();
        }



    }, function (error, status) {

        if (status === 0) {
            app.dialog.alert('No internet connection.', "Error");
        } else {
            app.dialog.alert('The server is currently not available.', "Error");
        }

    });


}

function MeerInfoKamer(intValue, soort) {
    $$('div#popup.content-block-inner').empty();
   
    idInfo = intValue;
    var data = {};
    
    data.id = idInfo;

    data.bewerking = "GetKamerInfo";
  

    app.request.post(link, data, function (data, responseText, status) {
        
       
    
        var list = (JSON.parse(status.responseText)).data;
  
        $$("#popup").append(`
                    <div class="card data-table data-table-collapsible data-table-init">
                    <f7-card>
            <div class="card-header">
                 <div class="data-table-title"> ${list[0].soort_kamer} Nr. ${list[0].kamers_id} </div>         
            </div>              
               <p > <img src="Images/${list[0].kamers_id}.jpg" style="width: 100%;height:auto;">  </p>
                        <f7-card-content>

                        <h4 style="padding-left: 10px;">Information</h4>
                            <p class="date"></p>
                            <p style="padding-left: 10px;">${list[0].beschrijving}</p>
                           
                            <h4 style="padding-left: 10px;" >Price: ${list[0].prijs} € </h4>
                        </f7-card-content>                        
                </f7-card>
                 
</div><br>
  `);
  

  var test = {};
  test.id = soort;
  test.bewerking = "GetAantal";

 
  app.request.post(link, test, function (test, responseText, status) {
     
      var list = JSON.parse(test);
     
        // Create notification with close button
    var notificationWithButton = app.notification.create({
        icon: '<i class="icon material-icons md-only ">watch_later</i>',
        title: 'Important notification',
        titleRightText: 'now',
        subtitle: `Available rooms: ${list.data[0].aantal}`,
        text: 'Hurry up and book your room whilst it is still available',
        closeButton: true,
    });
  
    notificationWithButton.open();

  });
        var control = data;

        if (control == 1) {
            app.dialog.alert('No records available', 'Error');
        }

    });

  



}

//reservatieUithalen
function reservatieTonen() {
  
   
    var data = {};
    data.bewerking = "GetReservaties";
    data.idK = idKlantGet;
   
    app.preloader.show();
    app.request.post(link, data, function (data, responseText, status) {
   
       
        var control = data;

        if (control == 1) {
            app.preloader.hide();
            app.dialog.alert('Empty customer id', 'Error');
            
        }else if(control == 2){
            app.preloader.hide();
            app.dialog.alert('No reservations available.', 'Empty');
        }



        app.preloader.hide();
        var list = (JSON.parse(status.responseText)).data;
        var i;
        $$(".reservatieUithalen").empty();
        for (i = 0; i < list.length; i++) {
         
            $$(".reser").empty();
         

            $$(".reservatieUithalen").append(`
                <div class="card data-table data-table-collapsible data-table-init">
                    <f7-card>
 <div class="card-header">
                        <div class="data-table-title"> ${Email}</div>
       
                
</div>
                 
   
               <p > <img src="Images/${list[i].kamer_id}.jpg" style="width: 100%;height:auto;">  </p>


                        <f7-card-content>
                        <h4 style="padding-left: 10px;" >Booking details</h4>
                            <p class="date"></p>
                            <p style="padding-left: 10px;">Check-in :  ${list[i].aankomst_datum }</p>
                            <p style="padding-left: 10px;">Check-out :  ${list[i].Vertrek_datum }</p>
                            <p style="padding-left: 10px;">Status :  ${list[i].Statuut}</p>
                            <p style="padding-left: 10px;">Payed :  ${list[i].betalingOk}</p>
                 <h4 style="text-align:center; color:red;" >To pay: ${ list[i].tebetalen } €</h4>
                        </f7-card-content>
                        <f7-card-footer>
                       
                        <Button id="btnBookNow"  Class="btnBookNow" onclick="Annuleer( ${ list[i].reservatie_id}, ${ list[i].kamer_id})">Cancel</Button><br>
                       
                      </f7-card-footer>
                </f7-card>
                 
</div><br>
`);

        }
      
    }, function (error, status) {

        if (status === 0) {
            app.dialog.alert('No internet connection', "Error");
        } else {
            app.dialog.alert('The server is currently not available.', "Error");
        }

    });
   
    var dataCancel = {};
    dataCancel.bewerking = "GetCancelledreservation";
    dataCancel.idK = idKlantGet;
  
    app.request.post(link, dataCancel, function (dataCancel, responseText, status) {
       
       
        var control = dataCancel;

        if (control == 1) {
         

            app.dialog.alert('Empty customer id', 'Error');
         
        }else if(control == 2){
   
            app.dialog.alert('No reservations available.', 'Empty');
        }
  
        var list2 = (JSON.parse(status.responseText)).data;
        var i;
        $$(".CancelledReservations").empty();
        for (i = 0; i < list2.length; i++) {

          
            $$(".cancel").empty();
            $$(".CancelledReservations").append(`
                <div class="card data-table data-table-collapsible data-table-init">
                    <f7-card>
 <div class="card-header">
                        <div class="data-table-title"> ${Email}</div>
       
                
</div>
                 
   
               <p > <img src="Images/${list2[i].kamer_id}.jpg" style="width: 100%;height:auto;">  </p>


                        <f7-card-content>
                        <h4 style="padding-left: 10px;" >Booking details</h4>
                            <p class="date"></p>
                            <p style="padding-left: 10px;">Check-in :  ${list2[i].aankomst_datum }</p>
                            <p style="padding-left: 10px;">Check-out :  ${list2[i].Vertrek_datum }</p>
                       
                            <p style="padding-left: 10px;">Payed :  ${list2[i].betalingOk}</p>
                 <h4 style="text-align:center; color:red;" >Status :  ${list2[i].Statuut}</h4>
                        </f7-card-content>
                        <f7-card-footer>
    
                      </f7-card-footer>
                </f7-card>
                 
</div><br>
`);

        }
      
    }, function (error, status) {

        if (status === 0) {
            app.dialog.alert('No internet connection', "Error");
        } else {
            app.dialog.alert('The server is currently not available.', "Error");
        }

    });

    
}
function Annuleer(reser_id, kamerIdbesc){
    var data = {};
    data.idReser = reser_id;
    data.bewerking = "getreserSelect";
    app.request.post(link, data, function (data, responseText, status) {
     
        var list = (JSON.parse(status.responseText)).data;
        var dateIn = new Date(list[0].aankomst_datum);

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + "0"+dd;

       
        var test =  new Date();
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var verschil = Math.round(Math.abs((test.getTime() - dateIn.getTime()) / (oneDay)));
       
        if(verschil < 1){
            app.dialog.alert('You are no longer allowed to cancel this booking ', "Error");
         
        }else{
            app.dialog.confirm('Are you sure you want to cancel this booking?', 'Cancellation control', function () {
                var dataChange = {};
                dataChange.idAnnul = reser_id;
                dataChange.kamerIdBesch = kamerIdbesc;
                dataChange.bewerking = "annuleerReservatie";
                app.request.post(link, dataChange, function (dataChange, responseText, status) { 
                  
                    var control = dataChange;
                    if (control = 1){
                        app.dialog.alert("Your booking has been cancelled", "Cancelled");
                    }else if(control = 2)
                    {
                        app.dialog.alert("Try again later", "Cancellation Problem");
                    }
                }, function (error, status) {

                    if (status === 0) {
                        app.dialog.alert('No internet connection', "Error");
                    } else {
                        app.dialog.alert('The server is currently not available.', "Error");
                    }
            
                });


              
            });
        }
    }, function (error, status) {

        if (status === 0) {
            app.dialog.alert('No internet connection', "Error");
        } else {
            app.dialog.alert('The server is currently not available.', "Error");
        }

    });


}
// reset van id *_*
function popFunction() {
    
    app.view.current.router.navigate('/kamers/');

}





function getId() {
    if (Email == null) {
        app.dialog.alert("Please log in ", "Error", function () {
            window.location.href = "../index.html";
        });
    } else {



        var data = {};
        data.bewerking = "profiel";
        data.Email = Email;
        app.request.post(link, data, function (data) {
            var list = JSON.parse(data).data;
            idKlantGet = list[0].klant_id;

        });
    }
}

function getProfile() {
    app.preloader.show();

    var data = {};
    data.bewerking = "profiel";
    data.Email = sessionStorage.getItem("Email");

    app.request.post(link, data, function (data, responseText, status) {
           
            app.preloader.hide();

            var list = (JSON.parse(status.responseText)).data;
            $$("input#klant_id")[1].value = list[0].klant_id;
            $$("input#Voornaam")[1].value = list[0].voornaam;
            $$("input#Naam")[1].value = list[0].naam;
            $$("input#Straat")[1].value = list[0].adres;
            $$("input#Gemeente")[1].value = list[0].gemeente;
            $$("input#Postcode")[1].value = list[0].postcode;
            $$("input#Geboortedatum")[1].value = list[0].geboortedatum;
            $$("select#Geslacht")[1].value = list[0].geslacht;
            $$("input#Phone")[1].value = list[0].telefoonnummer;
            $$("input#Email")[1].value = list[0].email;
            $$("input#Password")[1].value = list[0].password;

            IDProfiel = list[0].klant_id;
            sessionStorage.setItem("klant_id", IDProfiel);
        


        }, function (error, status) {

            if (status === 0) {
                app.dialog.alert('No internet connection', "Error");
            } else {
                app.dialog.alert('The server is currently not available.', "Error");
            }

        }

    );

}



function AccountBewerken() {
    app.dialog.confirm('Do you want to edit your account?', 'Control', function () {
        var email = $$("input#Email")[1].value;
        var password = $$("input#Password")[1].value;
        var voornaam = $$("input#Voornaam")[1].value;
        var naam = $$("input#Naam")[1].value;
        var straat = $$("input#Straat")[1].value;
        var gemeente = $$("input#Gemeente")[1].value;
        var postcode = $$("input#Postcode")[1].value;
        var geboortedatum = $$("input#Geboortedatum")[1].value;
        var geslacht = $$("select#Geslacht")[1].value;
        var phone = $$("input#Phone")[1].value;
        if (!email || !password || !voornaam || !naam || !phone || !straat || !gemeente || !postcode || !geboortedatum) {
            app.dialog.alert('Please fill in all the fields.', 'Missing fields');
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

            app.request.post(link, data, function (data, status) {
                    app.preloader.show();
                 
                    var control = data;

                    if (control == 1) {
                        app.preloader.hide();
                        localStorage.removeItem("GebruikerData");
                        app.dialog.alert('Changes to your account have been made.', 'Successfully updated');
                        app.view.current.router.navigate('/account/');

                      
                    } else if (control == 2) {
                        app.preloader.hide();
                        app.dialog.alert('A problem has occurred. Please try again later.');
                    }

                    //mainView.router.loadPage('profiel.html');

                }, function (error, status) {

                    if (status === 0) {
                        app.dialog.alert('No internet connection', "Error");
                    } else {
                        app.dialog.alert('The server is currently not available.', "Error");
                    }

                }

            );
        }
    });
}
//verwijderen van account
function AccountVerwijderen() {
    app.dialog.confirm('Are you sure you want to delete your account?', 'Control', function () {

        sendAjax(IDProfiel);
    });
}

// afmelden
function afmelden() {


    sessionStorage.setItem("Email", "");
    app.preloader.show();
    window.location.href = "../index.html";

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
                localStorage.removeItem("GebruikerData");
                app.dialog.alert('Your account has been deleted successfully. You will now be sent to the index page.', 'Hi there');
                sessionStorage.setItem("Email", "");
                setTimeout(function () {
                    location.replace("../index.html");
                }, 3000);
            } else if (control == 2) {
                app.dialog.alert('A problem has occurred. Please try again later.');
            }

            //mainView.router.loadPage('profiel.html');

        }, function (error, status) {

            if (status === 0) {
                app.dialog.alert('No internet connection', "Error");
            } else {
                app.dialog.alert('The server is currently not available.', "Error");
            }

        }

    );

}