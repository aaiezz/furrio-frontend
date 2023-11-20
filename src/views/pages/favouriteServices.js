// everything below has been taken from the weekly exercises

import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'


class favouriteServicesView {
  init(){
    document.title = 'FavouriteServices'
    this.favServices = null    
    this.render()    
    Utils.pageIntroAnim()
    this.getFavServices()
  }

  async getFavServices(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.favServices = currentUser.favouriteServices
      console.log(this.favServices)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Favourite Services" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
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
        }
      
        .filter-menu > div {
          margin-right: 40px;
        }
      
        .clear-filters {
          margin-right: 40px;
        }
    
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
        <div class="services-grid">
        ${this.favServices == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.favServices.map(service => html`
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


export default new favouriteServicesView()