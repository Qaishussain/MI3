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
var Email = sessionStorage.getItem("Email");
var idInfo = 0;
window.onload = getIdAdmin, app.view.current.router.navigate('/reservation/'),getReservation();

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
  
   
    setTimeout(function () {
        app.view.current.router.navigate('/reservation/');
        getReservation();

    }, 100);
 
 }

function getIdAdmin() {
    if (Email == null) {
        app.dialog.alert("Please log in ", "Error", function () {
            window.location.href = "../index.html";
        });
    } else {



        var data = {};
        data.bewerking = "profielAdmin";
        data.Email = Email;
        app.request.post(link, data, function (data) {
            var list = JSON.parse(data).data;
            IDProfiel = list[0].klant_id;
          getReservation();

        });
    }
}
// het deactiveren van focus op tab id's


// het deactiveren van focus op tab id's

$$('#checkedtab').click(function () {
    $$('#kamertab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#reservationtab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#accounttab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#logout').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$(this).removeClass('tab-link').addClass('tab-link tab-link-active');


});$$('#kamertab').click(function () {
    $$('#checkedtab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#reservationtab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#accounttab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#logout').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$(this).removeClass('tab-link').addClass('tab-link tab-link-active');


});
$$('#reservationtab').click(function () {
    $$('#checkedtab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#kamertab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#accounttab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#logout').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$(this).removeClass('tab-link').addClass('tab-link tab-link-active');


});
$$('#accounttab').click(function () {
    $$('#checkedtab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#reservationtab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#kamertab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#logout').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$(this).removeClass('tab-link').addClass('tab-link tab-link-active');


});
$$('#logout').click(function () {
    $$('#checkedtab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#reservationtab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#kamertab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$('#accounttab').removeClass('tab-link tab-link-active').addClass('tab-link');
    $$(this).removeClass('tab-link').addClass('tab-link tab-link-active');


});


function getReservation(){
  
if(IDProfiel == null){
    getIdAdmin();
}
else {


    var data = {};
    data.bewerking = "GetReservaties";
    
   
    app.preloader.show();
    app.request.post(link, data, function (data, responseText, status) {
        //console.log(data);
       
        var control = data;

        if (control == 1) {
            app.preloader.hide();

            app.dialog.alert('No admin id ', 'Error');
            location.reload();
        }else if(control == 2){
            app.preloader.hide();
            app.dialog.alert('No reservations available', 'Empty');
        }



        app.preloader.hide();
        var list = (JSON.parse(status.responseText)).data;
        var i;
        
     
        $$(".reservatieUithalen").empty();
        for (i = 0; i < list.length; i++) {
          
 
            $$(".geenReser").empty();

            $$(".reservatieUithalen").append(`
                <div class="card data-table data-table-collapsible data-table-init">
                    <f7-card>
 <div class="card-header">
                        <div class="data-table-title"> ${list[i].email}</div>
       
                
</div>
                 
   
               <p > <img src="Images/${list[i].kamer_id}.jpg" style="width: 100%;height:auto;">  </p>


                        <f7-card-content>
                        <h4 style="padding-left: 10px;" >Booking details</h4>
                            <p class="date"></p>
                            <p style="padding-left: 10px;">Last name :  ${list[i].naam }</p>
                            <p style="padding-left: 10px;">First name:  ${list[i].voornaam }</p>
                            <p style="padding-left: 10px;">Check-in :  ${list[i].aankomst_datum }</p>
                            <p style="padding-left: 10px;">Check-out :  ${list[i].Vertrek_datum }</p>
                            <p style="padding-left: 10px;">Status :  ${list[i].Statuut}</p>
                            <p style="padding-left: 10px;">Payed :  ${list[i].betalingOk}</p>
                 <h4 style="text-align:center; color:red;" >To pay: ${ list[i].tebetalen } €</h4>
                        </f7-card-content>
                        <f7-card-footer>
                        <div>
                        <Button id="btnAnnuleer"  Class="btnAnnuleer" onclick="check( ${ list[i].reservatie_id})">Check-in</Button>
                   </div><br>
                   <div>
                        <Button id="btnAnnuleer"  Class="btnAnnuleer" onclick="AnnuleerReservation( ${ list[i].reservatie_id}, ${ list[i].kamer_id})">Cancel</Button><br>
                       </div>
                      </f7-card-footer>
                </f7-card>
                 
</div><br>
`);

        }
      
    }, function (error, status) {

        if (status === 0) {
            app.dialog.alert('No internet connection', "Error");
        } else {
            app.dialog.alert('The server is not available right now.', "Error");
        }

    });

    
    var data = {};
    data.bewerking = "Getcancelled";
    
   
    app.preloader.show();
    app.request.post(link, data, function (data, responseText, status) {
        //console.log(data);
       
        var control = data;

        if (control == 1) {
            app.preloader.hide();

            app.dialog.alert('No admin id ', 'Error');
            location.reload();
        }else if(control == 2){
            app.preloader.hide();
            app.dialog.alert('No cancelled reservations available', 'Empty');
        }
        app.preloader.hide();
        var list = (JSON.parse(status.responseText)).data;
        var i;
        $$(".CancelledReservations").empty();
    
        for (i = 0; i < list.length; i++) {
            $$(".CancelledText").empty();
            $$(".CancelledReservations").append(`
                <div class="card data-table data-table-collapsible data-table-init">
                    <f7-card>
 <div class="card-header">
                        <div class="data-table-title"> ${list[i].email}</div>
       
                
</div>
                 
   
               <p > <img src="Images/${list[i].kamer_id}.jpg" style="width: 100%;height:auto;">  </p>


                        <f7-card-content>
                        <h4 style="padding-left: 10px;" >Booking details</h4>
                            <p class="date"></p>
                            <p style="padding-left: 10px;">Last name :  ${list[i].naam }</p>
                            <p style="padding-left: 10px;">First name:  ${list[i].voornaam }</p>
                            <p style="padding-left: 10px;">Check-in :  ${list[i].aankomst_datum }</p>
                            <p style="padding-left: 10px;">Check-out :  ${list[i].Vertrek_datum }</p>
                            <p style="padding-left: 10px;">To pay: ${ list[i].tebetalen } €</p>
                            <p style="padding-left: 10px;">Payed :  ${list[i].betalingOk}</p>
                 <h4 style="text-align:center; color:red;" >Status :  ${list[i].Statuut}</h4>
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
            app.dialog.alert('The server is not available right now.', "Error");
        }

    });

}   
}

function check(idreservation){
  
    var data = {};
   data.bewerking = "getReservationId";
   data.idCheckin = idreservation;
   console.log(data);
   app.request.post(link, data, function (data, responseText, status) {
       console.log(data);
    var list = (JSON.parse(status.responseText)).data;
    

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + "0"+dd;
    console.log(today);

    if(list[0].aankomst_datum  != today){
        app.dialog.alert('Too early to check-in', 'Error');
  
}else{
    app.dialog.confirm('Is the payment done?', 'Payment control', function () {
        var data = {};
        data.bewerking = "checkedIn";
        data.idRes = idreservation;
        app.request.post(link, data, function (data, responseText, status) {
        console.log(data);
        var control =  data;
        if(control == 1){
           app.dialog.confirm('Checked-in', 'Success', function() {
            location.reload();
           });
        }else if(control == 2){
           app.dialog.alert('Error checking in', 'Error');
        }
    
    }, function (error, status) {
    
        if (status === 0) {
            app.dialog.alert('No internet connection', "Error");
        } else {
            app.dialog.alert('The server is not available right now.', "Error");
        }
    
    });
       });
}
}, function (error, status) {

    if (status === 0) {
        app.dialog.alert('No internet connection', "Error");
    } else {
        app.dialog.alert('The server is not available right now.', "Error");
    }

});
}

function checkedInReservatie(){
    
var data = {};
data.bewerking = "checkreservatie";
app.preloader.show();
    app.request.post(link, data, function (data, responseText, status) {
        //console.log(data);
       
        var control = data;

        if (control == 1) {
            app.preloader.hide();

            app.dialog.alert('Missing data', 'Error');
            location.reload();
        }



        app.preloader.hide();
        var list = (JSON.parse(status.responseText)).data;
        var i;
  
        $$(".CheckedIn").empty();
        for (i = 0; i < list.length; i++) {
            $$(".checkecInText").empty();
            $$(".CheckedIn").append(`
                <div class="card data-table data-table-collapsible data-table-init">
                    <f7-card>
 <div class="card-header">
                        <div class="data-table-title"> ${list[i].email}</div>
       
                
</div>
                 
   
               <p > <img src="Images/${list[i].kamer_id}.jpg" style="width: 100%;height:auto;">  </p>


                        <f7-card-content>
                        <h4 style="padding-left: 10px;" >Booking details</h4>
                            <p class="date"></p>
                            <p style="padding-left: 10px;">Last name :  ${list[i].naam }</p>
                            <p style="padding-left: 10px;">First name:  ${list[i].voornaam }</p>
                            <p style="padding-left: 10px;">Check-in :  ${list[i].aankomst_datum }</p>
                            <p style="padding-left: 10px;">Check-out :  ${list[i].Vertrek_datum }</p>
                            <p style="padding-left: 10px;">Status :  ${list[i].Statuut}</p>
                            <p style="padding-left: 10px;">To pay: ${ list[i].tebetalen } €</p>
                 <h4 style="text-align:center; color:red;" >Payed :  ${list[i].betalingOk}</h4>
                        </f7-card-content>
                        <f7-card-footer>
                        <div>
                        <Button id="btnAnnuleer"  Class="btnAnnuleer" onclick="checkOut(${ list[i].reservatie_id},${list[i].kamer_id } )">Check-out</Button>
                   </div><br>
                   
                      </f7-card-footer>
                </f7-card>
                 
</div><br>
`);

        }
      
    }, function (error, status) {

        if (status === 0) {
            app.dialog.alert('No internet connection', "Error");
        } else {
            app.dialog.alert('The server is not available right now.', "Error");
        }

    });
   
    var data = {};
data.bewerking = "checkedOutreservaties";
app.preloader.show();
    app.request.post(link, data, function (data, responseText, status) {
      //  console.log(data);
       
        var control = data;

        if (control == 1) {
            app.preloader.hide();

            app.dialog.alert('Missing data', 'Error');
            location.reload();
        }
        app.preloader.hide();
        var list = (JSON.parse(status.responseText)).data;
        var i;
       
        $$(".CheckedOut").empty();
        for (i = 0; i < list.length; i++) {
            $$(".checkedtext").empty();
            $$(".CheckedOut").append(`
                <div class="card data-table data-table-collapsible data-table-init">
                    <f7-card>
 <div class="card-header">
                        <div class="data-table-title"> ${list[i].email}</div>
       
                
</div>
                 
   
               <p > <img src="Images/${list[i].kamer_id}.jpg" style="width: 100%;height:auto;">  </p>


                        <f7-card-content>
                        <h4 style="padding-left: 10px;" >Booking details</h4>
                            <p class="date"></p>
                            <p style="padding-left: 10px;">Last name :  ${list[i].naam }</p>
                            <p style="padding-left: 10px;">First name :  ${list[i].voornaam }</p>
                            <p style="padding-left: 10px;">Check-n :  ${list[i].aankomst_datum }</p>
                            <p style="padding-left: 10px;">Check-out :  ${list[i].Vertrek_datum }</p>
                            <p style="padding-left: 10px;">Payed :  ${list[i].betalingOk}</p>
                            <p style="padding-left: 10px;">To pay: ${ list[i].tebetalen } €</p>
                 <h4 style="text-align:center; color:red;" >Status :  ${list[i].Statuut}</h4>
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
            app.dialog.alert('The server is not available right now.', "Error");
        }

    });
}
function checkOut(idreser, roomId){
    var data = {};
    data.bewerking = "getReservationId";
    data.idCheckin = idreser;
    console.log(data);
    app.request.post(link, data, function (data, responseText, status) {
        console.log(data);
        var list = (JSON.parse(status.responseText)).data;


        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + "0"+dd;
        //console.log(verschil);
        if(list[0].Vertrek_datum  != today){
            app.dialog.confirm('Extra costs to pay', 'Error', function(){
                app.dialog.confirm('Payed the extra costs? ', 'Control', function(){
                var data = {};
                data.bewerking = "checkOut";
                data.idR = idreser;
                data.idRoom = roomId;
                app.preloader.show();
                app.request.post(link, data, function (data, responseText, status) {
                  //  console.log(data);
                   
                    var control = data;
            
                    if (control == 1) {
                        app.preloader.hide();
            
                        app.dialog.alert('Missing data', 'Error');
                        location.reload();
                    }
            
                }, function (error, status) {
            
                    if (status === 0) {
                        app.dialog.alert('No internet connection', "Error");
                    } else {
                        app.dialog.alert('The server is not available right now.', "Error");
                    }
            
                });
            }); });
      
    }else{
     app.dialog.confirm('Are u sure you want to check-out?', 'Control', function () {
    var data = {};
    data.bewerking = "checkOut";
    data.idR = idreser;
    data.idRoom = roomId;
    app.preloader.show();
    app.request.post(link, data, function (data, responseText, status) {
      //  console.log(data);
       
        var control = data;

        if (control == 1) {
            app.preloader.hide();

            app.dialog.alert('Missing data', 'Error');
            location.reload();
        }else{
            setTimeout(function () {
                app.view.current.router.navigate('/checked/');
                checkedInReservatie();
        
            }, 1000);  
        }

    }, function (error, status) {

        if (status === 0) {
            app.dialog.alert('No internet connection', "Error");
        } else {
            app.dialog.alert('The server is not available right now.', "Error");
        }

    });

     });
    }
});
}
function AnnuleerReservation(reservationId ,  kamerId){

   
    var data = {};
    data.idReser = reservationId;
    data.bewerking = "getreserSelect";
    app.request.post(link, data, function (data, responseText, status) {
       // console.log(data);
        var list = (JSON.parse(status.responseText)).data;
        var dateIn = new Date(list[0].aankomst_datum);

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + "0"+dd;

        console.log(today);
        var test =  new Date();
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var verschil = Math.round(Math.abs((test.getTime() - dateIn.getTime()) / (oneDay)));
        console.log(verschil);
        if(verschil < 1){
            app.dialog.alert('No longer allowed to cancel ', "Error");
         
        }else{
            app.dialog.confirm('Are you sure you want to cancel the reservation?', 'Cancellation Control', function () {
                var dataChange = {};
                dataChange.idAnnul = reservationId;
                dataChange.kamerIdBesch = kamerId;
                dataChange.bewerking = "annuleerReservatie";
                app.request.post(link, dataChange, function (dataChange, responseText, status) { 
                    console.log(dataChange);
                    var control = dataChange;
                    if (control = 1){
                        app.dialog.confirm("Your booking is cancelled", "Cancelled", function () { 
                            location.reload();
                        });

                    }else if(control = 2)
                    {
                        app.dialog.alert("Try again later", "Cancellation Problem");
                    }
                }, function (error, status) {

                    if (status === 0) {
                        app.dialog.alert('No internet connection', "Error");
                    } else {
                        app.dialog.alert('The server is not available right now.', "Error");
                    }
            
                });


              
            });
        }
    }, function (error, status) {

        if (status === 0) {
            app.dialog.alert('No internet connection', "Error");
        } else {
            app.dialog.alert('The server is not available right now.', "Error");
        }

    });



}

function getKamers() {
    $$("div.getKamers").empty()
    var data = {};
    data.bewerking = "getKamers";
    app.request.post(link, data, function (data, responseText, status) {

            // console.log(data);
            var list = (JSON.parse(status.responseText)).data;

            var i;
            for (i = 0; i < list.length; i++) {

                $$(".getKamers").append(`
  <div class="card data-table data-table-collapsible data-table-init">
                    <f7-card>
 <div class="card-header">
                        <div class="data-table-title"> ${list[i].soort_kamer}</div>
 
</div>
                 
   
               <p > <img src="Images/foto${list[i].soort_id}.jpg" style="width: 100%;height:auto;">  </p>


                        <f7-card-content>
                        <h4 style="padding-left: 10px;" >Informatie</h4>
                            <p class="date"></p>
                            <p style="padding-left: 10px;">${list[i].beschrijving}</p>
                    <h4 style="padding-left: 10px;" >Price: ${list[i].prijs} € </h4>
                
                        </f7-card-content>
                        <f7-card-footer>
                       
                        <Button id="btnKamer"  data-popup="#MyPopupKamer" Class="btnKamer popup-open" onclick="BewerkInfo(${list[i].soort_id});">Edit room information</Button><br>
                      </f7-card-footer>
                </f7-card>
                 
</div><br>
`);

            }

            var control = data;

            if (control == 1) {
                app.dialog.alert('No records available', 'Error');
                
            }

        }, function (error, status) {

            if (status === 0) {
                app.dialog.alert('No internet connection', "Error");
            } else {
                app.dialog.alert('The server is not available right now.', "Error");
            }
        }

    );


}

function BewerkInfo(intValue) {
    $$("div#popupKamer.content-block-inner").empty()

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
        <div class="item-title item-label">Room type</div>
        <div class="item-input-wrap">
          <input id="soort_kamer"type="text" placeholder="${list[i].soort_kamer}" value="${list[i].soort_kamer}">
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>
<li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">People</div>
        <div class="item-input-wrap">
          <input id="personen" type="text" placeholder="${list[i].personen}" value="${list[i].personen}">
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>


        <li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">Price</div>
        <div class="item-input-wrap">
          <input id="prijs" type="text" placeholder="${list[i].prijs}" value="${list[i].prijs}">
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>

 <li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">Description</div>
        <div class="item-input-wrap">
        <textarea id="beschrijving" rows="20" cols="100">${list[i].beschrijving}
        </textarea>
          
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>
  </ul>
 <Button id="btnBewerkKamer"   Class="btnBewerkKamer popup-close" onclick="updateInfoKamer(${list[i].soort_id});">Edit</Button><br>
</div>

`);


        }
    });
}

function updateInfoKamer(intValue) {
app.dialog.confirm('Are you sure you want to update the room information', 'Update Control', function () {
       
   
    idInfo = intValue;
    var soort = $$('#soort_kamer').val();
    var personen = $$('#personen').val();
    var prijs = $$('#prijs').val();
      var beschrij = $$('#beschrijving').val();
    if (!soort || !personen || !prijs || !beschrij ) {

            app.dialog.alert('Please fill in all the fields', 'Missing fields');
            return;
        } else {
            app.dialog.close();
             var data = {};
            data.id = idInfo;
            data.bewerking = "updateKamerInfo";
            data.soort = soort;
            data.personen = personen;
            data.prijs = prijs;
            data.beschrij = beschrij;
                    app.request.post(link, data, function (data) {

                       app.preloader.show();
                    var control = data;
                    if (control == 1) {
                     
                        
                        app.dialog.alert('Update was successfully executed', 'Room update', function () {
                          app.preloader.hide();
                          app.view.current.router.navigate('/kamers/');  
                   
                           
                            
                        });

                    } else if (control == 2) {
                        app.dialog.alert('An error has occurred. Please try again later.');
                        app.preloader.hide();
                        
                    }

                

                }, function (error, status) {

                    if (status === 0) {
                        app.dialog.alert('No internet connection', "Error");
                    } else {
                        app.dialog.alert('The server is not available right now.', "Error");
                    }

                }

            );
            
            
            
            
        } });


}

function getProfile() {
    app.preloader.show();
   // var getData = [];
   /**  if("data" in localStorage){

        app.preloader.hide();
      
        var dataStored = localStorage.getItem("data");
        getData = JSON.parse(dataStored);
        console.log(localStorage.getItem("data"));
        $$("input#Admin_id")[1].value = getData.data[0].klant_id;
     
         //$$('#Admin_id.input-with-value').val(getData.data[0].klant_id);
       // $$("#Admin_id").text() = getData.data[0].klant_id; 
        //$$("#Admin_id.input-with-value").val(getData.data[0].klant_id); 
       document.getElementById("Ad_Voornaam").value = getData.data[0].voornaam;
        document.getElementById("Ad_Naam").value = getData.data[0].naam;
        document.getElementById("Ad_Straat").value = getData.data[0].adres;
        document.getElementById("Ad_Gemeente").value = getData.data[0].gemeente;
        document.getElementById("Ad_Postcode").value = getData.data[0].postcode;
        document.getElementById("Ad_Geboortedatum").value = getData.data[0].geboortedatum;
        document.getElementById("Ad_Geslacht").value = getData.data[0].geslacht;
        document.getElementById("Ad_Phone").value = getData.data[0].telefoonnummer;
        document.getElementById("Ad_Email").value = getData.data[0].email;
        document.getElementById("Ad_Password").value = getData.data[0].password;
        IDProfiel = getData.data[0].klant_id;
    


    } else {*/
        var data = {};
        data.bewerking = "profielAdmin";
        data.Email = sessionStorage.getItem("Email");

        app.request.post(link, data, function (data, responseText, status) {
                //console.log(status.responseText);
                app.preloader.hide();
                var list = (JSON.parse(status.responseText)).data;
                //console.log(status);
                //$$("input#Admin_id")[1].value = list[0].klant_id;
               
                $$("input#Admin_id")[1].value = list[0].klant_id;
                $$("input#Ad_Voornaam")[1].value = list[0].voornaam;
                $$("input#Ad_Naam")[1].value = list[0].naam;
                $$("input#Ad_Straat")[1].value = list[0].adres;
                $$("input#Ad_Gemeente")[1].value = list[0].gemeente;
                $$("input#Ad_Postcode")[1].value = list[0].postcode;
                $$("input#Ad_Geboortedatum")[1].value = list[0].geboortedatum;
                $$("select#Ad_Geslacht")[1].value = list[0].geslacht;
                $$("input#Ad_Phone")[1].value = list[0].telefoonnummer;
                $$("input#Ad_Email")[1].value = list[0].email;
                $$("input#Ad_Password")[1].value = list[0].password;
             
               
            
                
                IDProfiel = list[0].klant_id;
                //console.log(IDProfiel);
               /**  var myObject = JSON.parse(status.responseText);
               

                localStorage.setItem("data", JSON.stringify(myObject));*/

            }, function (error, status) {

                if (status === 0) {
                    app.dialog.alert('No internet connection', "Error");
                } else {
                    app.dialog.alert('The server is not available right now.', "Error");
                }
            }

        );
    //}
}

function AccountBewerken() {
    app.dialog.confirm('Are you sure you want to edit your account', 'Control', function () {
        var email =   $$("input#Ad_Email")[1].value;
        var password = $$("input#Ad_Password")[1].value;
        var voornaam = $$("input#Ad_Voornaam")[1].value ;
        var naam =  $$("input#Ad_Naam")[1].value;
        var straat =  $$("input#Ad_Straat")[1].value ;
        var gemeente =  $$("input#Ad_Gemeente")[1].value ;
        var postcode =  $$("input#Ad_Postcode")[1].value;
        var geboortedatum =  $$("input#Ad_Geboortedatum")[1].value;
        var geslacht = $$("select#Ad_Geslacht")[1].value;
        var phone = $$("input#Ad_Phone")[1].value; 

        if (!email || !password || !voornaam || !naam || !phone || !straat || !gemeente || !postcode || !geboortedatum || !geslacht) {

            app.dialog.alert('Please fill in all the fields', 'Missing fields');
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
                      localStorage.removeItem("data"); 
                        app.dialog.alert('Profile has been updated successfully.', 'Success', function () {
                            location.reload();
                            //window.location.href = "Gebruiker/index.html";
                        });

                    } else if (control == 2) {
                        app.dialog.alert('An error has occurred. Please try again later.');
                    }

                    //mainView.router.loadPage('profiel.html');

                }, function (error, status) {

                    if (status === 0) {
                        app.dialog.alert('No internet connection', "Error");
                    } else {
                        app.dialog.alert('The server is not available right now.', "Error");
                    }

                }

            );
        }
    });
}
//verwijderen van account
function AccountVerwijderen() {
    app.dialog.confirm('Are you sure you want to delete your account?', 'Confirmation', function () {
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
    data.bewerking = "deleteAdmin";

    // opgelet : niet doorsturen als JSON :
    // CORS & json data --> preflight == problemen!
    // var JSONData = JSON.stringify(data);
    // Daarom ook geen dataType : 'json' zetten ...
    app.request.post(link, data, function (data) {
            app.preloader.show();
            var control = data;
            if (control == 1) {
                 localStorage.removeItem("data"); 
                app.preloader.hide();
                app.dialog.alert('Your account has been deleted successfully. You will now be sent to the index page.', 'Success');
                sessionStorage.setItem("Email", "");
                setTimeout(function () {
                    location.replace("../index.html");
                }, 2000);
            } else if (control == 2) {
                app.dialog.alert('An error has occurred. Please try again later.');
            }

            //mainView.router.loadPage('profiel.html');

        }, function (error, status) {

            if (status === 0) {
                app.dialog.alert('No internet connection', "Error");
            } else {
                app.dialog.alert('The server is not available right now.', "Error");
            }

        }

    );

}
// create searchbar
var searchbar = app.searchbar.create({
  el: '.searchbar',
  searchContainer: '.card-content',
  searchIn: '.label-cell',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
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

                $$(".klanten").append(`

   
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
                              <th class="label-cell">ID</th>
                              <th class="label-cell">Name</th>
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
                app.dialog.alert('No records available', 'Error');
            }

        }, function (error, status) {

            if (status === 0) {
                app.dialog.alert('No internet connection', "Error");
            } else {
                app.dialog.alert('The server is not available right now.', "Error");
            }
        }

    );

}

function VerwijderKlant(intValue) {
    app.dialog.confirm('Are you sure you want to remove this account?', 'Confirmation', function () {

        var idKlant = intValue;
        SendAjaxKlant(idKlant);
    });
}

function ActiveerKlant(intValue) {
    app.dialog.confirm('Are you sure you want to activate this account', 'Activation control', function () {


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
                    app.dialog.alert('The chosen account has been activated successfully', 'Activation account ');
                    app.view.current.router.navigate('/klanten/');
                 
                } else if (control == 2) {
                    app.dialog.alert('An error has occurred. Please try again later.');
                }

                //mainView.router.loadPage('profiel.html');

            }, function (error, status) {

                if (status === 0) {
                    app.dialog.alert('No internet connection', "Error");
                } else {
                    app.dialog.alert('The server is not available right now.', "Error");
                }

            }

        );
    });
}

function MeerInfoKlant(intValue) {
    $$("div#popup.content-block-inner").empty();
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
                              <th class="label-cell">Last name</th>
                              <th class="label-cell">First name </th>
                              <th class="label-cell">Birthdate</th>
                                <th class="label-cell">Gender</th>
                                <th class="label-cell">Address</th>
                                <th class="label-cell">Town</th>
                                <th class="label-cell">Postcode</th>
                                <th class="label-cell">Phone number</th>
                             

                         
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
                app.dialog.alert('Chosen account has been deleted', 'Success');
                location.reload();
            } else if (control == 2) {
                app.dialog.alert('An error has occurred. Please try again later.');
            }

            //mainView.router.loadPage('profiel.html');

        }, function (error, status) {

            if (status === 0) {
                app.dialog.alert('No internet connection', "Error");
            } else {
                app.dialog.alert('The server is not available right now.', "Error");
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
  $$(".contactText").empty();
                $$(".contacten").append(`
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
                              <th class="label-cell">Name</th>
                              <th class="label-cell">Phone number </th>
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

        }, function (error, status) {

            if (status === 0) {
                app.dialog.alert('No internet connection', "Error");
            } else {
                app.dialog.alert('The server is not available right now.', "Error");
            }
        }

    );


}

function Verwijdercontact(intValue) {
    app.dialog.confirm('Are you sure you want to delete this message?', 'Confirmation', function () {


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
                        app.dialog.alert('Chosen message has been deleted', 'Success');
                        backFunction();
                       
     
                } else if (control == 2) {
                    app.dialog.alert('An error has occurred. Please try again later.');
                }

                //mainView.router.loadPage('profiel.html');

            }, function (error, status) {

                if (status === 0) {
                    app.dialog.alert('No internet connection', "Error");
                } else {
                    app.dialog.alert('The server is not available right now.', "Error");
                }

            }

        );
    });
}

