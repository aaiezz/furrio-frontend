// everything below has been taken from the weekly exercises

import App from './App.js'

// components (custom web components)
import './components/va-app-header'
import './components/va-service'
import './components/va-service-provider' // this needs to be added similar to va-service 


// styles
import './scss/master.scss'

// app.init
document.addEventListener('DOMContentLoaded', () => {
  App.init()
})