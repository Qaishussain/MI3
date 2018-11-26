// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)
Vue.component('main-view', {
  template: '#main-view'
});
// Init Page Components
Vue.component('kamers', {
  template: '#kamers'
});
Vue.component('contact', {
  template: '#contact'
});
Vue.component('locatie', {
  template: '#locatie'
});

Vue.component('login', {
  template: '#login'
});
Vue.component('registratie', {
  template: '#registratie'
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
        path: '(.*)',
        component: 'page-not-found',
      },
    ],
  }
});
