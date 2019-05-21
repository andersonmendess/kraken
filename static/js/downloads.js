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

const bytesToSize = (bytes) => {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};


const convertTimestamp = (timestamp) => {
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
      return this.devices.filter(d => {
        var resByCodename = d.codename.toLowerCase().includes(this.search.toLowerCase())
        var resByName = d.name.toLowerCase().includes(this.search.toLowerCase())

        return !!resByName ? resByName : resByCodename
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
          this.failed("Failed to load devices... try again later")
        })
    },
    failed: function (msg) {
      this.fail = true;
      $(document).ready(function () {

        !!msg ? $("#warn").text(msg) : ''

        $("#warn-box").show()
      });

    },
    LoadDevice: function (codename) {
      request(devicesURL)
        .then(res => {

          device = res.filter((device) => device.codename == codename)[0]

          if (!device) throw new Error("Device not found 404");

          this.device = device
          this.codename = device.codename

        }).catch(e => {
          this.failed(e)
        })
    },
    LoadBuilds: function(codename) {

      this.LoadDevice(codename)
      this.deviceBuilds = [];
      this.fail = false
      $("#warn").text('')

      history.pushState(null, '', '?device=' + codename);

      $('.sidenav').sidenav();
      $(".wrapper").hide();
      $("input").blur();

      this.search = ''

      request(deviceURL(codename)).then(res => this.deviceBuilds = res.response.reverse())
    },
    LoadModal: async function (build, codename, url){
      
      let changelog = ""

      await request(changelogURL(build, codename), false).then(res => changelog = res)

      changelog.includes("404") ? changelog = "Changelog Not Available D:" : null

      $('#modal-container').text(changelog);

      $('#modal-title').text("Changelog for " + build);
      $('.download').attr("href", url)
      $('.modal').modal();
      $('.modal').modal('open');
    },
  }
})
