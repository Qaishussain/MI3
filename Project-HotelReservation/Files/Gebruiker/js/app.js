// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)
Vue.component('main-view', {
  template: ` <f7-page>
  <f7-navbar>
      <f7-nav-left>
          <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Available rooms</f7-nav-title>

  </f7-navbar>

  <f7-block>



      <div class="features-clean">
          <div class="container">

              <p class="text-center">Come stay at O-Hotel for a couple nights. 
              We will offer you different kinds of rooms where you will be able to stay and rest peacefully with your family.
              Our rooms are equipped with every convenience and luxury.</p>
                  
                  <form class="list" id="my-form">
                  <ul>
                      <li>
                          <div class="item-content item-input">
                              <div class="item-inner">
                                  <div class="item-title item-label">Check-in</div>
                                  <div class="item-input-wrap">
                                      <input type="date"  name="checkIn" placeholder="Date check-in"
                                          id="checkIn">
                                  </div>
                              </div>
                          </div>
                      </li>
                      <li>
                          <div class="item-content item-input">
                              <div class="item-inner">
                                  <div class="item-title item-label">Check-out</div>
                                  <div class="item-input-wrap">
                                      <input type="date" name="Checkout" placeholder="Date check-out"
                                          id="checkOut">
                                  </div>
                              </div>
                          </div>
                      </li>
              </form>
              <div class="block">
                  <f7-button class="col" small round fill onclick="KamersOphalen();">Search</f7-button>
              </div>

              <div id="kamersBeschikbaar" class="content-block-inner">
                     
              
              </div>
          </div>

      </div>



  </f7-block>
</f7-page>` 
});
// Init Page Components
Vue.component('account', {
  template: '#account'
});
Vue.component('reservation', {
  template: '#reservation'
});
Vue.component('Booking', {
  template: '#Booking'
});
Vue.component('BookingForm', {
  template: '#BookingForm'
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
        path: '/kamers/',
        component: 'main-view'
      }, 
      {
        path: '/account/',
        component: 'account'
      },
		{
        path: '/reservation/',
        component: 'reservation'
      }, {
        path: '/BookingForm/',
        component: 'BookingForm',
        name: 'Booking'
      },      
      {
        path: '(.*)',
        component: 'page-not-found',
      },
    ],
  }
});
