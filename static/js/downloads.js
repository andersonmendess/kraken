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
      search: '',
    },
      computed: {
    filteredList() {
      return this.devices.filter(devi => {
        var s_code = devi.codename.toLowerCase().includes(this.search.toLowerCase())
        var s_brand = devi.brand.toLowerCase().includes(this.search.toLowerCase())
        var s_name = devi.name.toLowerCase().includes(this.search.toLowerCase())

        if(s_code){
          return s_code
        }else if (s_name){
          return s_name
        }else if(s_brand){
          return s_brand
        }

      })
    }
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
         $(document).keypress(function(e) {
              if(e.which == 13) {
                if($(".search-link").select()[0] != undefined){
                  window.open($(".search-link").select()[0].href,"_self")
                }
              }
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
          this.deviceBuilds = [];

          for (var i = response.data.length - 1; i >= 0; i--) {
            this.deviceBuilds.push(response.data[i])
          }

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
  
