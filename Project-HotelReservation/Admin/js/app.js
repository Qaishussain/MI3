// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)
Vue.component('main-view', {
  template: ` <f7-page >
  <f7-navbar>
      <f7-nav-left>
          <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Reservations</f7-nav-title>

  </f7-navbar>

 
<f7-block >
      <div class="login-screen-title">Booked</div>
  <div class="reservatieUithalen" >

  </div>
  <p class="geenReser" style="text-align:center;">No reservations available</p>
 

</f7-block>

<f7-block strong >
    
      <div class="login-screen-title">Cancelled</div>
  <div class="CancelledReservations" >
      
  </div>
  <p class="CancelledText" style="text-align:center; margin-bottom:50px;">No cancelled reservations</p>

</f7-block >

</f7-page>
`
});
// Init Page Components
Vue.component('kamers', {
  template: '#kamers'
});
Vue.component('klanten', {
  template: '#klanten'
});
Vue.component('account', {
  template: '#account'
});
Vue.component('checked', {
  template: '#checked'
});

Vue.component('tecontact', {
  template: '#tecontact'
});

Vue.component('page-not-found', {
  template: '#page-not-found'
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
        path: '/reservation/',
        component: 'main-view'
      }, 
      {
        path: '/kamers/',
        component: 'kamers'
      },
		{
        path: '/klanten/',
        component: 'klanten'
      },
      {
        path: '/checked/',
        component: 'checked'
      },
		{
        path: '/account/',
        component: 'account'
      },
        {
        path: '/tecontact/',
        component: 'tecontact'
      },
    
      {
        path: '(.*)',
        component: 'page-not-found',
      },
    ],
  }
});
