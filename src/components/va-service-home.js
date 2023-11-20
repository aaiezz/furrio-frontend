// everything below has been taken from the weekly exercises - template used: va-service.js
// any additional adjustments have been pointed out via comments
// This will show the content for the home screen once the user successfully logs in.

import { LitElement, html, css } from '@polymer/lit-element'
import { render } from 'lit-html'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import UserAPI from '../UserAPI'
import Toast from '../Toast'
import ServiceProviderAPI from '../ServiceProviderAPI'

customElements.define('va-services-home', class HomeServices extends LitElement {
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
        </style>
        <div class="wrap">
        <div class="image">
            <img src="${App.apiBase}/images/${this.image}" alt="${this.image}" />
        </div>
        <div class="content">
            <h1>${this.name}</h1>
            <p>${this.user.email}</p>
            <p class="servicetype">servicetype: <span>${this.servicetype}</span></p>
            <p class="location">location: <span>${this.location}</span></p>
            <sl-button @click=${this.addFavHandler.bind(this)}>
            <sl-icon slot="prefix" name="heart-fill"></sl-icon>
            Add to Favourites
            </sl-button>
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
        UserAPI.updateFavoriteService(this.id)
        Toast.show('Service added to favourites')
      }catch(err){
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
    </style> 
    <sl-card>
        <img slot="image" src="${App.apiBase}/images/${this.image}" />
        <h2>${this.name}</h2>
        <sl-button @click=${this.moreInfoHandler.bind(this)}>More info</sl-button>
        <sl-icon-button name="heart-fill" label="Add to Favourites" @click=${this.addFavHandler.bind(this)}></sl-icon-button>
    </sl-card>
  `
  }
})
