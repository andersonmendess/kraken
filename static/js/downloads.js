let url = new URL(window.location.href);

const dateUtils = {
  getToday: () => {
    let d = new Date();
    return `${d.getFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`
  },
  getTimestamp: () => {
    let d = new Date();
    return Math.floor(d.getTime() / 1000)
  },
  human: (timestamp) => {
    let d = new Date(timestamp * 1000)
    let mm = ('0' + (d.getUTCMonth() + 1)).slice(-2)
    let dd = ('0' + d.getUTCDate()).slice(-2)
    return `${d.getFullYear()}/${mm}/${dd}`;
  }
}

const URLStack = {
  getBase: () => "https://raw.githubusercontent.com/KrakenProject/official_devices/master/",
  getDevices: () => URLStack.getBase() + 'devices.json',
  getBuilds: (codename) => `${URLStack.getBase()}builds/${codename}.json`,
  getChangelog: (build, codename) => `${URLStack.getBase()}changelog/${codename}/${build.replace('zip', 'txt')}`,
  getDownloadStat: (build, codename) => `https://sourceforge.net/projects/krakenproject/files/${codename}/${build}/stats/json?start_date=2019-04-04&end_date=${dateUtils.getToday()}`,
  getDownload: (build, codename) => `https://downloads.sourceforge.net/project/krakenproject/${codename}/${build}`,
}

const materializeUtils = {
  initSidenav: () => {
    let sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
  },
  initCollapsible: (el = '.collapsible') => {
    let elems = document.querySelector(el);
    return M.Collapsible.init(elems);
  },
  showAlert: (msg) => {
    M.toast({ html: msg, displayLength: 6000 })
  }
}

const SEO = {
  setTitle: (title) => {
    document.title = title
    document.head.querySelector("meta[name=title]").content = title
  },
  setDescription: (description) => {
    document.head.querySelector("meta[name=description]").content = description
  },
  setDeviceInfo: (name, codename) => {
    SEO.setTitle(`${name} (${codename}) | Kraken Download Center`)
    SEO.setDescription(`Download Kraken for ${name} (${codename}) | Kraken Project`)
  },
  setHomeInfo: () => {
    SEO.setTitle(`Download center | Kraken Project`)
    SEO.setDescription(`Download Kraken Custom ROM | Kraken Project`)
  }
}

const paramUtils = {
  getDevice: () => url.searchParams.get("device"),
  getBuild: () => url.searchParams.get("build"),
  setDevice: (device) => {
    history.pushState({ device }, '', `?device=${device}`)
    url.searchParams.set("device", device)
  },
  removeDevice: () => {
    history.pushState({ device: null }, '', '/')
    url.searchParams.set("device", null)
  },
  setBuild: (build) => {
    history.replaceState({}, '', `?device=${paramUtils.getDevice()}&build=${build}`)
  },
  removeBuild: () => {
    history.replaceState({}, '', `?device=${paramUtils.getDevice()}`)
  }
}

const genDownloadLink = (codename, filename) => {
  return `${URLStack.getDownload(filename, codename)}?r=&ts=${dateUtils.getTimestamp()}&use_mirror=autoselect`
}

const request = (url, isJson = true) => fetch(url).then((res) => isJson ? res.json() : res.text())

const humanSize = (bytes) => {
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

var app = new Vue({
  el: '#app',
  data: {
    brands: [],
    devices: [],
    builds: [],
    device: {},
    codename: '',
    search: '',
    deviceLoading: true,
    buildLoading: true
  },
  created() {
    this.suported();
  },
  mounted() {
    history.pushState({ device: null }, '', '')

    window.onpopstate = (e) => {
      e.state.device ? this.LoadBuilds(e.state.device) : this.codename = null
    };

    document.addEventListener('keypress', (event) => {
      if (event.keyCode == 13) {
        if (document.querySelector('.search-link') != null) {
          app.LoadBuilds(document.querySelector('.search-link').attributes['data-device'].value)
        }
      }
    });

    materializeUtils.initCollapsible()
    materializeUtils.initSidenav()
  },
  computed: {
    filteredList() {
      return this.devices.filter(d => {
        var resByCodename = d.codename.toLowerCase().includes(this.search.toLowerCase())
        var resByName = d.name.toLowerCase().includes(this.search.toLowerCase())

        return resByName ? resByName : resByCodename
      })
    }
  },
  methods: {
    suported: async function () {
      await request(URLStack.getDevices())
        .then(response => {
          response.forEach(element => {
            if (this.brands.indexOf(element.brand) == -1) {
              this.brands.push(element.brand)
            }
          })
          this.devices = response
        })
        .catch(e => materializeUtils.showAlert('An error occurred. try again later.'))
        .finally(() => this.deviceLoading = false)

      if (paramUtils.getDevice()) {
        this.LoadBuilds(paramUtils.getDevice());
      }
    },
    LoadDevice: function (codename) {
      device = this.devices.filter(device => device.codename === codename)[0]
      if (device) {
        this.device = device
        this.codename = device.codename
        SEO.setDeviceInfo(device.name, codename)
      } else {
        materializeUtils.showAlert(`device '${codename}' not found`)
        throw new Error()
      }

    },
    LoadBuilds: async function (codename) {
      this.LoadDevice(codename)

      this.builds = [];
      this.buildLoading = true;

      if (history.state.device !== codename) {
        if (codename !== paramUtils.getDevice()) paramUtils.setDevice(codename)
      }

      if (this.search != '') {
        document.querySelectorAll('.wrapper')[0].style.display = 'none'
        document.querySelectorAll('input')[0].blur()
        this.search = ''
      }

      materializeUtils.initSidenav()

      await request(URLStack.getBuilds(codename))
        .then(res => this.builds = res.response.map((build) => {
          build.size = humanSize(build.size);
          build.datetime = dateUtils.human(build.datetime);
          build.changelog = ""
          build.downloads = 0
          return build
        }).reverse())
        .catch(e => materializeUtils.showAlert("Failed to load builds. try again later."))
        .finally(() => this.buildLoading = false)

      this.builds.map((build) => {
        request(URLStack.getChangelog(build.filename, codename), false).then(
          (res) => build.changelog = res.includes("404") ? "Changelog data not found" : res
        )

        request(URLStack.getDownloadStat(build.filename, codename)).then(
          (d) => build.downloads = d.total
        )
      })

      if (paramUtils.getBuild()) {
        this.openBuild(parseInt(this.getIndex(paramUtils.getBuild())))
      }

    },
    getIndex: function (filename) {
      return this.builds.
        map((e, i) => e.filename == filename ? i : null
        ).filter((e) => e != null)
    },
    showHomePage: function () {
      this.codename = null
      SEO.setHomeInfo()
      paramUtils.removeDevice()
      materializeUtils.initSidenav()
    },
    download: function (build, codename) {
      materializeUtils.showAlert(`Download Started`)
      location.href = genDownloadLink(codename, build)
    },
    setBuild(obj) {
      let instances = materializeUtils.initCollapsible('.collapsible-builds')

      instances.options.onOpenEnd = () => paramUtils.setBuild(obj)
      instances.options.onCloseEnd = () => paramUtils.removeBuild()
    },
    openBuild(index) {
      if (!isNaN(index)) {
        let instances = materializeUtils.initCollapsible('.collapsible-builds')
        instances.open(index);
      }
    },
  },
})
