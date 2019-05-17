//materialize stuff
$(document).ready(function () {

  app.suported();

  var url = new URL(window.location.href);
  var device = url.searchParams.get("device");

  if (device) {
    app.LoadBuilds(device);
  }

  $('.sidenav').sidenav();
  $('.collapsible').collapsible();
  $(".settings").click(function () {
    $(".menu").toggle();
  });

});

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};


function convertTimestamp(timestamp) {
  let d = new Date(timestamp * 1000)
  let mm = ('0' + (d.getUTCMonth() + 1)).slice(-2)
  let dd = ('0' + d.getUTCDate()).slice(-2)
  return `${d.getFullYear()}/${mm}/${dd}`;
};

var app = new Vue({
  el: '#app',
  data: {
    brands: [],
    devices: [],
    deviceBuilds: [],
    device: [],
    codename: '',
    search: '',
    fail: false,
  },
  computed: {
    filteredList() {
      return this.devices.filter(devi => {
        var s_code = devi.codename.toLowerCase().includes(this.search.toLowerCase())
        var s_brand = devi.brand.toLowerCase().includes(this.search.toLowerCase())
        var s_name = devi.name.toLowerCase().includes(this.search.toLowerCase())

        if (s_code) {
          return s_code
        } else if (s_name) {
          return s_name
        } else if (s_brand) {
          return s_brand
        }

      })
    }
  },
  methods: {
    suported: function () {
      axios.get(`https://raw.githubusercontent.com/KrakenProject/official_devices/master/devices.json`)
        .then(response => {
          response.data.forEach(element => {
            if (this.brands.indexOf(element.brand) == -1) {
              this.brands.push(element.brand)
            }
            this.devices.push(element)

          });
          $(document).keypress(function (e) {
            if (e.which == 13) {
              if ($(".search-link").select()[0] != undefined) {
                this.fail = false
                app.LoadBuilds($(".search-link").select().attr("data-device"));
              }
            }
          });

        }).catch(e => {
          this.failed("Failed to load devices... try again in some minutes")
        })
    },
    failed: function (msg = "") {


      this.fail = true;
      $(document).ready(function () {
        if (msg != "") {
          if (msg == "Error: Request failed with status code 404") {
            msg = "Error: This device isn't supported :(";
          }
          $(".warn").text(msg)
        }
        $(".fail").show()
      });

    },
    LoadDevice: function (codename) {
      axios.get(`https://raw.githubusercontent.com/KrakenProject/official_devices/master/devices.json`)
        .then(response => {
          response.data.forEach(device => {
            if (device['codename'] == codename) {
              this.fail = false
              this.device = device;
              this.codename = codename
            }
          })
        }).catch(e => {
          this.failed(e)
        })
    },
    LoadBuilds: function (codename) {
      this.LoadDevice(codename)
      axios.get('https://raw.githubusercontent.com/KrakenProject/official_devices/master/builds/' + codename + '.json')
        .then(response => {
          const res = response.data.response;

          $('.sidenav').sidenav();
          this.deviceBuilds = [];

          for (var i = res.length - 1; i >= 0; i--) {
            res[i].newSize = bytesToSize(res[i].size);
            res[i].newTime = convertTimestamp(res[i].datetime);
            this.deviceBuilds.push(res[i])
            console.log(res[i])
          }

          history.pushState(null, '', '?device=' + codename);
          $(".wrapper").hide();
          $("input").blur();
        }).catch(e => {
          this.failed(e);
        })
    },
    LoadModal: function (build, codename, url) {
      axios.get('https://raw.githubusercontent.com/KrakenProject/official_devices/master/changelog/' + codename + '/' + build.replace("zip", "txt"))
        .then(response => {
          $('#modal-container').text(response.data);
        }).catch(e => {
          $('#modal-container').text("Nothing here :)");
        })
      $('#modal-title').text("Changelog for " + build);
      $('.download').attr("href", url)
      $('.modal').modal();
      $('.modal').modal('open');
    },
  }
})
