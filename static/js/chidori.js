//materialize stuff
$(document).ready(function () {
  $('.sidenav').sidenav();

  $('.collapsible').collapsible();

  app.suported();
});

var app = new Vue({
  el: '#app',
  data: {
    brands: [],
    devices: [],
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
        if(this.brands.indexOf(element.brand)){
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
  }
})
