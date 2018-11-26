// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)
Vue.component('main-view', {
  template: '#main-view'
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
        path: '/Booking/',
        component: 'Booking'
      },      
      {
        path: '(.*)',
        component: 'page-not-found',
      },
    ],
  }
});
