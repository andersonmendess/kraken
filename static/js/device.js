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
      MotorolaDevices: [],
      XiaomiDevices:[],
      ZukDevices:[],
      DeviceBuilds:[],
      Device: '',
      codename: '',
      brand:'',
      maintainer:'',
      version:'',
    },
    methods: {
      suported: function() {
        axios.get(`https://cors-anywhere.herokuapp.com/http://andersondev.ooo/?api=suported`)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log("suported devices loaded")
          response.data.forEach(element => {
            console.log("entrei no loop")
            console.log(element)
            if(element.brand=="Motorola"){
              this.MotorolaDevices.push(element)
            }else if(element.brand=="Xiaomi"){
              this.XiaomiDevices.push(element)
            }else if(element.brand=="Zuk"){
              this.ZukDevices.push(element)
            }
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
  
  