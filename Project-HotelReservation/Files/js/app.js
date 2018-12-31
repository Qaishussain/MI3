// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)
Vue.component('main-view', {
  template: ` <f7-page>
  <f7-navbar>
      <f7-nav-left>
          <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>O-Hotel </f7-nav-title>

  </f7-navbar>

  <f7-block>
      
  <h3 id="specialText">WELCOME TO O-HOTEL</h3>

      <div data-pagination='{"el": ".swiper-pagination"}' data-space-between="10" data-slides-per-view="auto" data-centered-slides="true" class="swiper-container swiper-init demo-swiper demo-swiper-auto">
          <div class="swiper-pagination"></div>
          <div class="swiper-wrapper">

              <div class="swiper-slide"><img src="Images/Badkamers/Screenshot%202018-11-05%20at%2013.51.17.png"></div>
              <div class="swiper-slide"><img src="Images/Badkamers/Screenshot%202018-11-05%20at%2014.36.14.png"></div>
              <div class="swiper-slide"><img src="Images/Tweepersoonskamer/2persoonskamer.jpg"></div>
              <div class="swiper-slide"><img src="Images/Tweepersoonskamer/Screenshot%202018-11-05%20at%2013.51.26.png"></div>
              <div class="swiper-slide"><img src="Images/Tweepersoonskamer/Screenshot%202018-11-05%20at%2013.51.43.png"></div>
              <div class="swiper-slide"><img src="Images/Tweepersoonskamer/Screenshot%202018-11-05%20at%2014.35.39.png"></div>
              <div class="swiper-slide"><img src="Images/Tweepersoonskamer/Screenshot%202018-11-05%20at%2014.35.57.png"></div>
          </div>
      </div><br><br>
      <p class="justifyClass">Looking for a nice place to stay during your vacation? Why not stay at O-Hotel? O-Hotel is a big and comfortable hotel, situated in the heart of Brussels. The staff will give you a warm welcome and will always be at your service. Book your room before it’s too late!</p>
  </f7-block>



</f7-page>`
});
// Init Page Components
Vue.component('kamers', {
  template:  ` <f7-page>
  <f7-navbar>
  <f7-nav-left>
    <f7-link icon-if-ios="f7:keyboard_backspace" icon-if-md="material:keyboard_backspace" onclick="backFunction()" ></f7-link>
</f7-nav-left>
<f7-nav-title>Rooms</f7-nav-title>
</f7-navbar>

  <f7-block >
      <div class="InfoK">


      </div>
  </f7-block>
</f7-page>` 
});
Vue.component('contact', {
  template: '#contact'
});
Vue.component('locatie', {
  template: '#locatie'
});
Vue.component('wachtwoordVergeten', {
  template: '#wachtwoord'
});
Vue.component('login', {

  template: '#login'
});
Vue.component('registratie', {
  template: '#registratie'
});


Vue.component('page-not-found', {
  template: ` <f7-page>
  <f7-navbar title="Not found" back-link="Back"></f7-navbar>
  <f7-block strong>
      <p>Sorry</p>
      <p>Requested content not found.</p>
  </f7-block>
</f7-page>`
});

// Init App
new Vue({
  el: '#app',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app', // App root element
    id: 'io.framework7.testapp', // App bundle ID
    name: 'Framework7', // App name
    theme: 'auto', // Automatic theme detection
    // App routes
    routes: [
		{
        path: '/home/',
        component: 'main-view'
      }, 
      {
        
   path: '/kamers/',
    component: 'kamers'
      },
		{
        path: '/contact/',
        component: 'contact'
      },
		{
        path: '/locatie/',
        component: 'locatie'
      },
        {
        path: '/login/',
       
       component: 'login'
        
      },
          {
        path: '/registratie/',
        component: 'registratie'
      },
      {
        path: '/wachtwoordVergeten/',
        component: 'wachtwoordVergeten'
      }, 
      {
        path: '(.*)',
        component: 'page-not-found',
      },
    ],
  }
});
