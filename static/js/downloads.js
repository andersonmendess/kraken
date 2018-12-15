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
      deviceBuilds:[],
      device: [],
      codename: '',
    },
    methods: {
      suported: function() {
        axios.get(`https://raw.githubusercontent.com/ChidoriOS/official_devices/master/devices.json`)
        .then(response => {
          response.data.forEach(element => {
          if(this.brands.indexOf(element.brand) == -1){
            this.brands.push(element.brand)
          }
            this.devices.push(element)
          });
        })
      },
      LoadDevice: function(codename){
        axios.get(`https://raw.githubusercontent.com/ChidoriOS/official_devices/master/devices.json`)
        .then(response => {
          response.data.forEach(device => {
            if(device['codename'] == codename){
                this.device = device;
                this.codename = codename
            }
        })
      })
      },
      LoadBuilds: function(codename) {
        this.LoadDevice(codename)
        axios.get('https://raw.githubusercontent.com/ChidoriOS/official_devices/master/builds/'+codename+'.json')
        .then(response => {
          $('.sidenav').sidenav();
          this.deviceBuilds = response.data
          history.pushState(null, '', '?device='+codename);

        })
      },
      LoadModal: function(build,codename, url) {
        axios.get('https://raw.githubusercontent.com/ChidoriOS/official_devices/master/changelog/'+codename+'/'+build.replace("zip","txt"))
        .then(response => {
          $('#modal-container').text(response.data);
        }).catch(e => {
          $('#modal-container').text("Nothing here :)");
        })
          $('#modal-title').text("Changelog for "+build);
          $('.download').attr("href",url)
          $('.modal').modal();
          $('.modal').modal('open');
      },
    }
  })
  
  
