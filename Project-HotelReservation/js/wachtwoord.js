// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)
Vue.component('main-view', {
  template: "#main-view"
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
        path: '(.*)',
        component: 'page-not-found',
      },
    ],
  }
});


