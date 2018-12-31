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

var ajaxoef = new XMLHttpRequest();

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
window.onload =test;



var Email = "";
function test (){

    app.view.current.router.navigate('/home/');
    
}

function backFunction(){
       
    app.view.current.router.navigate('/home/');
 
 }
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
    var nameContact = $$('#nameContact.input-with-value').val();
    

    var emailContact = $$('#emailContact.input-with-value').val();

    var gsmContact = $$('#gsmnummerContact.input-with-value').val();
    var messageContact = $$('#messageContact.input-with-value').val();
    
     console.log(nameContact , gsmContact , emailContact, messageContact);

    if (!nameContact || !emailContact || !gsmContact || !messageContact) {

        app.dialog.alert('Please fill in all the fiels.', 'Missing text fields');
        return;
    } else if (!validateEmail(emailContact)) {
        app.dialog.alert('Please enter a valid email address. ' + "> " + emailContact + " <", ' Email problem');
        return;
    } else {
        var data = {};
        data.bewerking = "contactgegevens";
        data.nameContact =nameContact;
        data.emailContact = emailContact;
        data.gsmContact = gsmContact;
        data.messageContact = messageContact;
      
        app.request.post(link, data, function (data) {
         
                //app.preloader.show();
                var control = data;
                if (control == 1) {
                    app.preloader.hide();
                    app.dialog.alert('Your message has been delivered successfully. We will contact you as soon as possible.', 'Dear ' + nameContact, function () {
                        window.location.href = "index.html";
                    });

                } else if (control == 2) {
                    app.preloader.hide();
                    app.dialog.alert('A problem has occurred. Please try again later.', data.nameContact);
                } else if (control == 3) {
                    app.preloader.hide();
                    app.dialog.alert('Missing data', data.nameContact);
                }
            }, function (error, status) {

                if (status === 0) {
                    app.dialog.alert('No internet connection.', "Error");

                } else {
                    app.dialog.alert('The server is not available right now.', "Error");

                }

            }

        );


    }

}

function KamersOphalen() {
   
    var data = {};
    data.bewerking = "GetKamers";
    app.request.post(link, data, function (data, responseText, status) {

             //console.log(data);
            var list = (JSON.parse(status.responseText)).data;

            var i;
            $$(".InfoK").empty();
            for (i = 0; i < list.length; i++) {
               
                $$(".InfoK").append(`
                <div class="card data-table data-table-collapsible data-table-init">
                    <f7-card>
 <div class="card-header">
                        <div class="data-table-title"> ${list[i].soort_kamer}</div>

                       
          
</div>
                 
   
               <p > <img src="Images/foto${list[i].soort_id}.jpg" style="width: 100%;height:auto;">  </p>


                        <f7-card-content>
                        <h4 style="padding-left: 10px;" >Information</h4>
                            <p class="date"></p>
                            <p style="padding-left: 10px;">${list[i].beschrijving}</p>
                    <h4 style="padding-left: 10px;" >Price: ${list[i].prijs} € </h4>
            
                        </f7-card-content>
                  
                </f7-card>
                 
</div><br>
`);

            }

            var control = data;

            if (control == 1) {
                app.dialog.alert('No records available.', 'Error');
            }

        }, function (error, status) {

            if (status === 0) {
                app.dialog.alert('No internet connection.', "Error");
            } else {
                app.dialog.alert('The server is not available right now.', "Error");
            }
        }

    );


}


function inschrijven() {
    var email = $$('#Email.input-with-value').val();
    var password = $$('#Password.input-with-value').val();
    var voornaam = $$('#Voornaam.input-with-value').val();
    var naam = $$('#Naam.input-with-value').val();
    var straat = $$('#Straat.input-with-value').val();
    var gemeente = $$('#Gemeente.input-with-value').val();
    var postcode = $$('#Postcode.input-with-value').val();
    var geboortedatum = $$('#Geboortedatum.input-with-value').val();
    var geslacht = $$('#Geslacht.input-with-value').val();
    var phone = $$('#Phone.input-with-value').val();


   




    if (!email || !password || !voornaam || !naam || !phone || !straat || !gemeente || !postcode || !geboortedatum) {
        app.dialog.alert('Please fill in all the fiels.', 'Missing text fields');
        return;
    } else if (!validateEmail(email)) {
        app.dialog.alert('Please enter a valid email address. ' + "> " + email + " <", ' Email problem');
        return false;
    } else if (password.length < 8) {
        app.dialog.alert('Password with minimum 8 characters ', ' Error password');
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

                    app.dialog.alert(' You have been registered successfully.', 'Dear ' + voornaam);
                    setTimeout(function () {
                        app.view.current.router.navigate('/login/'); 
                      }, 3000);
                    
                    
                    
              


                } else if (control == 2) {
                    app.dialog.alert('A problem has occurred. Please try again later.', 'Error');
                    window.location.reload();
                } else if (control == 3) {
                    //  app.preloader.hide();
                    app.dialog.alert('This email already exists. Please use a different email.', 'Error ');
                    //window.location.reload();



                }



            }, function (error, status) {

                if (status === 0) {
                    app.dialog.alert('No internet connection.', "Error");
                } else {
                    app.dialog.alert('The server is not available right now.', "Error");
                }

            }

        );
    }
}

function PasswordForget(){
    var link2 = "https://o-hotel.000webhostapp.com/php/verzendmail.php"; 
    var email = $$('#ForgetEmail.input-with-value').val();
    if (!email) {
        app.dialog.alert('Please fill in your email.', 'Missing fields');
        return;
    }else if (!validateEmail(email)) {
        app.dialog.alert('Please enter a valid email address. ' + "> " + email + " <", ' Email problem');
        return;
    }else{
        var data = {};
        data.email = email;
        app.request.post(link2, data, function (data) {
            console.log(data);
            var control = data;
            if(control == 1){
                app.dialog.alert('Check your email inbox', "Sent");
                app.view.current.router.navigate('/login/'); 
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
}

function checkLogin() {


   
  var email = $$('input#LEmail.input-with-value').val();
 
 
  var password = $$('input#Lpassword.input-with-value').val();
  console.log(password ,  email);
  
   if(email =="Ohotel007@gmail.com" || email =="ohotel007@gmail.com"){
    var usrlvl = "admin";
   }else{
    usrlvl = "klant";
   }
  // app.dialog.alert(email + password + usrlvl  , 'Testen');
  
    //app.dialog.alert("email= " + email + "password: " + password + "usrlevel: " + usrlvl);

    if (!email || !password || !usrlvl ) {
        app.dialog.alert('Please fill in all the fields.', 'Missing fields');
        return;
    }else if (!validateEmail(email)) {
  
        app.dialog.alert('Please enter a valid email address. ' + "> " + email + " <", ' Email problem');
        return ;
    } else {
        var data = {};
        data.bewerking = "check";
        data.usrlvl = usrlvl;
        data.Gebruikersnaam = email;
        data.Wachtwoord = password;
console.log(data);
        app.request.post(link, data, function (data) {
            console.log(data);
                app.preloader.show();

                var control = data;
                app.preloader.hide();
                if (control == "success") {

                    loginsuccess(usrlvl);

                } else if (control == 2) {

                    app.dialog.alert("Password incorrect.", "Error");
                    app.preloader.hide();
                } else if (control == 3) {

                    app.dialog.alert("Data does not exist.", "Error");
                    app.preloader.hide();
                } else if (control == 4) {

                    app.dialog.alert("Account has been deactivated. Get in contact with the admin via the contact page. ", "Error");
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

    }
}

function loginsuccess(level) {
    var usrlvl = level;
    var getInput = $$('#LEmail.input-with-value').val();
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



function changepassword(){

    var email = $$('#Email.input-with-value').val();
 
 
    var password = $$('#cPassword.input-with-value').val();
    var reEnterpassword = $$('#cRPassword.input-with-value').val();
    
    if (!password || !reEnterpassword ) {
        app.dialog.alert('Please fill in all the fields.', 'Missing fields');
        return;
    }else if(password !=reEnterpassword){
        app.dialog.alert('Passwords do not match', 'Error');
        return;
    }else if (password.length < 8) {
        app.dialog.alert('Password with minimum 8 characters ', ' Error');
        return false;
    }else {
        //console.log(email , password , reEnterpassword);
        var data = {};
        data.email = email;
        data.password = password;
        data.bewerking = "changePassword"

        app.request.post(link, data, function (data) {
            console.log(data);
            var control = data;
            if(control == 1){
                app.dialog.alert("Password has been updated successfully", "Sucess", function () {
                    sessionStorage.clear();
                    window.location.href = "./index.html";
                });
            }else{
                app.dialog.alert("There was a problem whilst changing the password. Please try agian later", "Error", function () {
                    sessionStorage.clear();
                    window.location.href = "./index.html";
                });
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
    
}