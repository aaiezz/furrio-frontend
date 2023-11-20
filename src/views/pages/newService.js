// everything below has been taken from the weekly exercises - template used: va-service.js

import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import ServiceAPI from '../../ServiceAPI'
import Toast from '../../Toast'

class newServiceView {
  init(){
    document.title = 'New Service'    
    this.render()    
    Utils.pageIntroAnim()
  }

  async newServiceSubmitHandler(e){
    e.preventDefault()
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading','')
    const formData = e.detail.formData

    try{
      await ServiceAPI.newService(formData)
      Toast.show('Service added!')
      submitBtn.removeAttribute('loading')
      // reset form
      // reset text + textarea inputs
      const textInputs = document.querySelectorAll('sl-input, sl-textarea')
      if(textInputs) textInputs.forEach(textInput => textInput.value = null)
      // reset radio inputs
      const radioInputs = document.querySelectorAll('sl-radio')
      if(radioInputs) radioInputs.forEach(radioInput => radioInput.removeAttribute('checked'))
      // reset file input
      const fileInput = document.querySelector('input[type=file]')
      if(fileInput) fileInput.value = null

    }catch(err){
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')

    }
  }

  render(){
    const template = html`
    <style>
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
      <va-app-header title="New Service" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        

        <sl-form class="page-form" @sl-submit=${this.newServiceSubmitHandler}>
        <h3>Add a new serivce</h3>
        <input type="hidden" name="user" value="${Auth.currentUser._id}" />
        <div class="input-group">
          <sl-input name="name" type="text" placeholder="Service Name" required></sl-input>
        </div>
        <div class="input-group">              
          <sl-input name="price" type="text" placeholder="Price" required>
            <span slot="prefix">$</span>
          </sl-input>
        </div>
        <div class="input-group">
          <sl-textarea name="description" rows="3" placeholder="Description"></sl-textarea>
        </div>
        <div class="input-group" style="margin-bottom: 2em;">
          <label>Image</label><br>
          <input type="file" name="image" />              
        </div>
        <div class="input-group" style="margin-bottom: 2em;">
          <label>Service Type</label><br>
          <sl-radio-group label="Select servicetype" no-fieldset>
            <sl-radio name="servicetype" value="veterinary">Veterinary</sl-radio>
            <sl-radio name="servicetype" value="petGrooming">Pet Grooming</sl-radio>
            <sl-radio name="servicetype" value="petSitting">Pet Sitting</sl-radio>
            <sl-radio name="servicetype" value="dogWalking">Dog Walking</sl-radio>
          </sl-radio-group>
        </div>
        <div class="input-group" style="margin-bottom: 2em;">
          <label>Location</label><br>
          <sl-radio-group label="Select location" no-fieldset>
            <sl-radio name="location" value="sydney">Sydney</sl-radio>
            <sl-radio name="location" value="melbourne">Melbourne</sl-radio>
            <sl-radio name="location" value="canberra">Canberra</sl-radio>
            <sl-radio name="location" value="brisbane">Brisbane</sl-radio>
            <sl-radio name="location" value="adelaide">Adelaide</sl-radio>
            <sl-radio name="location" value="perth">Perth</sl-radio>
            <sl-radio name="location" value="hobart">Hobart</sl-radio>
            <sl-radio name="location" value="darwin">Darwin</sl-radio>
          </sl-radio-group>
        </div>
        <sl-button type="primary" class="submit-btn" submit>Add Service</sl-button>
      </sl-form>                
         
      </div>      
      <div class="footer">
      <img class="logo" src="/images/logo.svg" alt="Logo" />
      <p>DigEx Major Project 1, Curtin University, 2023</p>
      </div>          
    `
    render(template, App.rootEl) // do not change
  }
}


export default new newServiceView()