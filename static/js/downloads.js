//materialize stuff
$(document).ready(function () {
  
    app.suported();

    var url = new URL(window.location.href);
    var device = url.searchParams.get("device");

    if(device){
      app.LoadBuilds(device);
    }

    $('.sidenav').sidenav();
    $('.collapsible').collapsible();


    $(".settings").click(function(){
        $(".menu").toggle();
    });


  });
  

  var app = new Vue({
    el: '#app',
    data: {
      brands: [],
      devices: [],
      DeviceBuilds:[],
      Device: '',
      maintainer: '',
      brand: '',
      version: '',
      codename: '',
    },
    methods: {
      suported: function() {
        axios.get(`https://cors.io/?http://andersondev.ooo/?api=suported`)
        .then(response => {
          // JSON responses are automatically parsed.
          response.data.forEach(element => {

          if(this.brands.indexOf(element.brand) == -1){
            this.brands.push(element.brand)
          }
            this.devices.push(element)
    
          });
        })
        .catch(e => {
          console.log("Suported devices falhou")
          this.errors.push(e)
        })
      },
      LoadBuilds: function(codename) {
        axios.get('https://cors.io/?http://andersondev.ooo/?api=builds&device=' + codename)
        .then(response => {

          $('.sidenav').sidenav();

          this.codename = codename
          this.Device = response.data.device
          this.brand = response.data.brand
          this.maintainer = response.data.maintainer
          this.version = response.data.version
          this.DeviceBuilds = response.data.builds

          history.pushState(null, '', '?device='+codename);

        })
        .catch(e => {
          console.log("device builds falhou")
          this.errors.push(e)
        })
      },
    }
  })
  
  
