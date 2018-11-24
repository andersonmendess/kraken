//materialize stuff
$(document).ready(function () {
    $('.sidenav').sidenav();
  
    $('.collapsible').collapsible();
  
    var url = new URL(window.location.href);
    var device = url.searchParams.get("device");
    console.log(device);
    app.codename = device;

    app.suported();
    app.LoadBuilds();

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
        axios.get(`https://cors-anywhere.herokuapp.com/http://andersondev.ooo/?api=suported`)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log("suported devices loaded")
          response.data.forEach(element => {
          //console.log("entrei no loop")
          console.log(element.brand)
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
      LoadBuilds: function() {
        axios.get('https://cors-anywhere.herokuapp.com/http://andersondev.ooo/?api=builds&device=' + this.codename)
        .then(response => {
          console.log("device builds loaded")
          console.log(response.data)
          this.Device = response.data.device
          this.brand = response.data.brand
          this.maintainer = response.data.maintainer
          this.version = response.data.version
          this.DeviceBuilds.push(...response.data.builds)
        })
        .catch(e => {
          console.log("device builds falhou")
          this.errors.push(e)
        })
      },
    }
  })
  
  
