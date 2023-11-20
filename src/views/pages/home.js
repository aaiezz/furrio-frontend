// everything below has been taken from the weekly exercises - template used: va-service.js
// any additional adjustments have been pointed out via comments

import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import ServiceAPI from '../../ServiceAPI'
import Toast from '../../Toast'
import Footer from './Footer'

/*  Original code from the weekly tasks 
class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'    
    this.render()    
    Utils.pageIntroAnim()    
  }
*/
class HomeServices { /*change from a simple view to a more service-focused screen */
  async init() {
    document.title = 'Home'
    this.services = null
    this.render()
    Utils.pageIntroAnim()
    await this.getServices()
  }

/*  Original code from the weekly tasks 
render(){
    const template = html`
      <va-app-header title="Home" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      
      <div class="page-content">
        <h1 class="anim-in">Hey ${Auth.currentUser.firstName}</h1>

        <h3>Your Services:</h3>
        <ul>
          ${this.services
            ? this.services.map(
                (service) => html`<li>${service.name}: ${service.description}</li>`
              )
            : html`<li>No services available</li>`}
        </ul>
      </div>
     
    `
    render(template, App.rootEl)
  }
   */
  // note to self - review the code below and see whats relevant and whats not

async filterServices(field, match) {
  // Validate
  if (!field || !match) return

  // Get a fresh copy of services
  this.services = await ServiceAPI.getServices()

  let filteredServices
  
  // service type
  if (field == 'servicetype') {
    filteredServices = this.services.filter(service => service.servicetype == match)
  }

  // location
  if (field == 'location'){
    filteredServices = this.services.filter(service => service.location == match)
  }


  // price
  if(field == 'price'){
  // get priceRangeStart
  const priceRangeStart = match.split('-')[0]
  const priceRangeEnd = match.split('-')[1
  ] 
  filteredServices = this.services.filter(service => service.price >= priceRangeStart && service.price <= priceRangeEnd) 
      }  

  // render
  this.services = filteredServices
  this.render()
}

clearFilterBtns() {
  const filterBtns = document.querySelectorAll('.filter-btn')
  filterBtns.forEach(btn => btn.removeAttribute('type'))
}

handleFilterBtn(e) {
  this.clearFilterBtns()
  e.target.setAttribute('type', 'primary')
  const field = e.target.getAttribute('data-field')
  const match = e.target.getAttribute('data-match')
  this.filterServices(field, match)
}

clearFilters() {
  this.getServices()
  this.clearFilterBtns()
}

async getServices() {
  try {
    this.services = await ServiceAPI.getServices()
    this.render()
  } catch (err) {
    Toast.show(err, 'error')
  }
}
/* Lines 162-175: this section shows the user with Access Level 1 the latest services added to Furrio when they log on*/
/* Lines 180-196: this section shows the user with Access Level 2 all the services added to Furrio when they log on. this is similar to the Services page on Access Level 1*/

render() {
  const template = html`
  <style>
  .intro-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: #FFEFCF;
    padding: 1em; /* Add padding for spacing within the filter menu */
    border-radius: 0.75em;
    border: 2px solid #F2AE30; /* Add 'solid' after the border width */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .services-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0 auto; /* Optional: Center horizontally within its container */
  }
  .fav-buttons {
    display: flex;
    flex-direction: column; /* Align buttons in a column */
    align-items: center; /* Center horizontally */
    gap: 1em; /* Vertical spacing between buttons */
  }

  .fav-buttons sl-button {
    width: 100%; /* Set equal width for both buttons */
  }

  /* Footer styles */
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #f2be5b;
    text-align: center;
    padding: 0;
  }

  .logo {
    opacity: 0.65;
    margin-bottom: -.75em;
    width: 60px; /* Adjust the width as needed */
  }

</style>


<va-app-header title="Home" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
<div class="page-content"> 

<h1 class="anim-in">Hey ${Auth.currentUser.firstName}!</h1>

<div class="intro-bar">
<div>
<h3> Check out the latest updates on Furrio! </h3>
</div>
</div>
<br>

<div class="services-grid">
${this.services && this.services.length > 0  && Auth.currentUser.accessLevel === 1
? this.services.slice(0, 5).map(service => html`
<va-service class="service-card"
id="${service._id}"
  name="${service.name}" 
  description="${service.description}"
  price="${service.price}"
  user="${JSON.stringify(service.user)}"
  image="${service.image}"
  servicetype="${service.servicetype}"
  location="${service.location}"
  >
</va-service>
  `)
: html`
${
  this.services == null ? html`
  <sl-spinner></sl-spinner>
  ` : html`
  ${this.services.map(service => html`
  <va-service class="service-card"
  id="${service._id}"
    name="${service.name}" 
    description="${service.description}"
    price="${service.price}"
    user="${JSON.stringify(service.user)}"
    image="${service.image}"
    servicetype="${service.servicetype}"
    location="${service.location}"
    >
  </va-service>
    `)}
  `
  }
`
}

</div>


</div>   
<div class="footer">
<img class="logo" src="/images/logo.svg" alt="Logo" />
<p>DigEx Major Project 1, Curtin University, 2023</p>
</div>

`

render(template, App.rootEl) // do not change
}
}

export default new HomeServices()