// everything below has been taken from the weekly exercises
// any additional adjustments have been pointed out via comments

import { LitElement, html, css } from '@polymer/lit-element'
import { render } from 'lit-html'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import UserAPI from '../UserAPI'
import Toast from '../Toast'
import ServiceProviderAPI from '../ServiceProviderAPI'

customElements.define('va-service', class Service extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      id:{
        type: String
      },
      name: {
        type: String
      },
      description: {
        type: String
      },
      price: {
        type: String
      },
      user: {
        type: Object
      },
      image: {
        type: String
      },
      servicetype: {
        type: String
      },
      location: {
        type: String
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }
    moreInfoHandler(){
        // create sl-dialog
        const dialogEl = document.createElement('sl-dialog')
        // add className
        dialogEl.classname = 'service-dialog'

        // sl-dialog content
        // Add to Favourites: Line 123
        // additional functionality fo removing the the service from the favourites.
        // i wanted to add this in because everytime i would click on the heart icon 
        // to remove it from favourites it would just add the same service as a duplicate.
        // solution reference: user568866 (2012)
        const dialogContent = html`
        <style>
        .wrap {
            display: flex;
        }
        .image {
            width: 50%;
        }
        .image img {
            width: 100%;
        }
        .content {
            padding-left: 1em;
        }
        .servicetype span,
        .location span {
            text-transform: uppercase;
            font-weight: bold;
        }
        .price {
            font-size: 1.5em;
            color: var(--brand-color)
        }

        // additional styling for the fav button

        .fav-buttons {
          display: flex;

        }

        .service-image {
          width: 100px;
          height: auto;
        }
        </style>

        <div class="wrap">
        <div class="image">
            <img src="${App.apiBase}/images/${this.image}" alt="${this.name}" />
        </div>
        <div class="content">
            <h1>${this.name}</h1>
            <p>${this.description}</p>
            <p class="price">$${this.price}</p>
            <p class="servicetype">servicetype: <span>${this.servicetype}</span></p>
            <p class="location">location: <span>${this.location}</span></p>
            <div class="fav-buttons">
            <sl-button style="width: 15em; margin-bottom: 10px;" @click=${this.addFavHandler}>Add to Favourites</sl-button>
            <sl-button style="width: 15em; margin-bottom: 10px;" @click=${this.removeFavHandler}>Remove from Favourites</sl-button>
          </div>
        </div>
        </div>
        </div>
        `

        render(dialogContent, dialogEl)


        // append to document.body
        document.body.append(dialogEl)
        
        // show sl-dialog
        dialogEl.show()

        // on hide delete dialogEl
        dialogEl.addEventListener('sl-after-hide', () => {
            dialogEl.remove()
        })


    }

    async addFavHandler(){    
      try {
        UserAPI.addFavService(this.id)
        Toast.show('Service added to favourites')
      }catch(err){
        console.error(err); // Log any error that occurred
        Toast.show('Failed to add service to favorites', 'error');
      }
    }
    
    // this will help remove the service from the favourites. Note to self, this is 
    // reverse engineered from the original version and might not work. If it 
    // does not work, change this section to comments and come back to it later.
    async removeFavHandler() {
      try {
        UserAPI.removeFavService(this.id)
        Toast.show('Service Removed from favourites')
      } catch (err) {
        Toast.show(err, 'error')
      }
    }
   
  render(){    
    return html`
    <style>
    .author {
        font-size: 0.9em;
        font-style: italic;
        opacity: 0.8;
    }

    //additional content styling
    .card-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      cursor:pointer
    }
  
    .card-buttons sl-icon-button {
      flex: 1;
    }
  
    .card-buttons sl-icon-button sl-icon {
      width: 24px;
      height: 24px;
    }
  
    .card-image {
      width: 100%; 
      height: 200px;
      object-fit: cover;
    }
    .display-flex{
      cursor:pointer
      gap: 14px;
      display: flex;
    }
    .heartIcons{
      color: turquoise;
      margin-top: 15px;
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

    </style> 
    <sl-card>
  <img slot="image" class="card-image" src="${App.apiBase}/images/${this.image}" alt="${this.name}" />
  <h2>${this.name}</h2>
  <h3>$${this.price}</h3>
  <p class="author">By ${this.user ? `${this.user.firstName} ${this.user.lastName}` : 'Unknown'}</p>
  <sl-button @click=${this.moreInfoHandler.bind(this)}>More info</sl-button>
  <sl-icon-button name="heart-fill" label="Add to Favourites" @click=${this.addFavHandler.bind(this)}></sl-icon-button>
</sl-card>

`
  }
})