// everything below has been taken from the weekly exercises - template used: va-service.js
// any additional adjustments have been pointed out via comments

import App from '../../App'
import {html, render} from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import ServiceAPI from '../../ServiceAPI'
import Toast from '../../Toast'


// Define the service providers class and initialise the function
// for the service provider document
class ServicesProviders {
  async init() {
    document.title = 'Services Providers'
    this.services = null
    this.render()
    Utils.pageIntroAnim()
    await this.getServices()
  }

  // Filtering services based on filters such as service type, location of services
  // and price
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

  // Clear Filters functionality
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

  // Fetch the services from the API and render the updates services
  async getServices() {
    try {
      this.services = await ServiceAPI.getServices()
      console.log(this.services)
      this.render()
    } catch (err) {
      Toast.show(err, 'error')
    }
  }

  // render the template
  render() {
    const template = html`
    
    // CSS styling
    <style>
    .filter-menu {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      background-color: #FFEFCF;
      padding: 30px; /* Add padding for spacing within the filter menu */
      border-radius: 0.75em;
      border: 2px solid #F2AE30; /* Add 'solid' after the border width */
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      margin-bottom: 1em;
      }
  
    .filter-menu > div {
      margin-right: 40px;
    }
  
    .clear-filters {
      margin-right: 40px;
    }
    
    /* CSS styling for the service grid*/

    .services-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin: 0 auto; /* Optional: Center horizontally within its container */
    }

    /* Footer styles */
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 0;
  }

  .logo {
    opacity: 0.65;
    margin-bottom: -.75em;
    width: 60px; /* Adjust the width as needed */
  }

  </style>
  
  /* everything below has been taken from the weekly exercises*/

  <va-app-header title="Service Providers" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
  <div class="page-content"> 
    <div class="filter-menu">
      <div>
      <strong> Filter By</strong>
      </div>
      <div>
        <strong> Service Type </strong>
        <sl-button class="filter-btn" size="small" data-field="servicetype" data-match="veterinary" @click=${this.handleFilterBtn.bind(this)}>Veterinary</sl-button>
        <sl-button class="filter-btn" size="small" data-field="servicetype" data-match="petGrooming" @click=${this.handleFilterBtn.bind(this)}>Pet Grooming</sl-button>
        <sl-button class="filter-btn" size="small" data-field="servicetype" data-match="petSitting" @click=${this.handleFilterBtn.bind(this)}>Pet Sitting</sl-button>
        <sl-button class="filter-btn" size="small" data-field="servicetype" data-match="dogWalking" @click=${this.handleFilterBtn.bind(this)}>Dog Walking</sl-button>
        
        <strong> City </strong>
        <sl-button class="filter-btn" size="small" data-field="location" data-match="sydney" @click=${this.handleFilterBtn.bind(this)}>Sydney</sl-button>
        <sl-button class="filter-btn" size="small" data-field="location" data-match="melbourne" @click=${this.handleFilterBtn.bind(this)}>Melbourne</sl-button>
        <sl-button class="filter-btn" size="small" data-field="location" data-match="canberra" @click=${this.handleFilterBtn.bind(this)}>Canberra</sl-button>
        <sl-button class="filter-btn" size="small" data-field="location" data-match="brisbane" @click=${this.handleFilterBtn.bind(this)}>Brisbane</sl-button>
        <sl-button class="filter-btn" size="small" data-field="location" data-match="adelaide" @click=${this.handleFilterBtn.bind(this)}>Adelaide</sl-button>
        <sl-button class="filter-btn" size="small" data-field="location" data-match="perth" @click=${this.handleFilterBtn.bind(this)}>Perth</sl-button>
        <sl-button class="filter-btn" size="small" data-field="location" data-match="hobart" @click=${this.handleFilterBtn.bind(this)}>Hobart</sl-button>
        <sl-button class="filter-btn" size="small" data-field="location" data-match="darwin" @click=${this.handleFilterBtn.bind(this)}>Darwin</sl-button>
   </div>
      <div>
        <sl-button size="small" @click=${this.clearFilters.bind(this)}> Clear filters</sl-button>
      </div>
    </div>

<div class="services-grid">
${this.services == null ?html`
<sl-spinner>
</sl-spinner>
` : html`
${this.services.map(service => html`
  <va-service-provider class="service-card"
    id="${service.user._id}"
    name="${service.user.firstName} ${service.user.lastName}" 
    email="${service.user.email}" 
    servicetype="${service.servicetype}"
    image="${service.user.avatar !== undefined? service.user.avatar: "No-Image-Placeholder.png"}"
    location="${service.location}"
    >
  </va-service-provider>

  `)}
`}
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


export default new ServicesProviders()