// Global setup
const baseURL = "https://raw.githubusercontent.com/KrakenProject/official_devices/master/";
const devicesURL = baseURL + "devices.json";
const deviceURL = codename => `${baseURL}builds/${codename}.json`;
const changelogURL = (build, codename) => `${baseURL}changelog/${codename}/${build.replace('zip','txt')}`;

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

const request = (url, isJson = true) => {
  return fetch(url).then( (res) => isJson ? res.json() : res.text()).catch((e) => console.log(e))
}

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
      request(devicesURL)
        .then(response => {
          response.forEach(element => {
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
          $("#warn").text(msg)
        }
        $("#warn-box").show()
      });

    },
    LoadDevice: function (codename) {
      request(devicesURL)
        .then(response => {
          response.forEach(device => {
            if (device['codename'] == codename) {
              this.fail = false
              this.device = device;
              this.codename = codename
            }
          })

          if(this.codename != codename){
            this.failed("This device is not supported!")
          }

        }).catch(e => {
          this.failed(e)
        })
    },
    LoadBuilds: function (codename) {

      this.LoadDevice(codename)
      this.deviceBuilds = [];
      this.fail = false
      $("#warn").text('')

      history.pushState(null, '', '?device=' + codename);

      $('.sidenav').sidenav();
      $(".wrapper").hide();
      $("input").blur();

      this.search = ''
      request(deviceURL(codename))
        .then(response => {
          const res = response.response;

          for (var i = res.length - 1; i >= 0; i--) {
            res[i].newSize = bytesToSize(res[i].size);
            res[i].newTime = convertTimestamp(res[i].datetime);
            this.deviceBuilds.push(res[i])
          }

        }).catch(e => {
          //this.failed(e);
        })
    },
    LoadModal: function (build, codename, url) {
      request(changelogURL(build, codename), false)
        .then(response => {
          $('#modal-container').text(response);
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
