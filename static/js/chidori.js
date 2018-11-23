//materialize stuff
$(document).ready(function () {
  $('.sidenav').sidenav();

  $('.collapsible').collapsible();

  app.suported();
});

var app = new Vue({
  el: '#app',
  data: {
    MotorolaDevices: [],
    XiaomiDevices:[],
    ZukDevices:[],
    LatestBuilds:[],
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
  }
})

