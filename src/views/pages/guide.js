// everything below has been taken from the weekly exercises

import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'

class GuideView {
  init(){
    document.title = 'Guide'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser()
  }
  async updateCurrentUser() {
    try {
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, { newUser: false },'json')
      console.log('User Updated')
      console.log(updatedUser)
    } catch (err) {
      Toast.show(err, 'error')
    }
  }



  render(){
    const guide = html`
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
      <va-app-header title="Guide" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content calign">        
      <h3 class="brand-color">Welcome ${Auth.currentUser.firstName}!</h3>
      <p>This is a quick tour to teach you the basics of using Services ...</p>
      
      <div class="guide-step">
        <h4>Search Service Providers</h4>
        <img src="https://drive.google.com/uc?export=download&id=1xaXeqIGPMjl1_NPnocjPkb4UaRO5NSuH"style="width: 120%; height: auto;">
      </div>
      
      <div class="guide-step">
        <h4>Find a Service</h4>
        <img src="https://drive.google.com/uc?export=download&id=1w6LFwOboOtdb6NSUBkZXAU0wzYBka7Wn"style="width: 120%; height: auto;">
      </div>
      
      <div class="guide-step">
        <h4>Save services to favourites</h4>
        <img src="https://drive.google.com/uc?export=download&id=1r3ofBQghMhE_4_IyaVCAaGBFLjYhQ8ro" style="width: 120%; height: auto;">
      </div>
      
      <sl-button type="primary" @click=${() => gotoRoute('/')}>Okay got it!</sl-button>
        
         
      </div>      
      <div class="footer">
      <img class="logo" src="/images/logo.svg" alt="Logo" />
      <p>DigEx Major Project 1, Curtin University, 2023</p>
      </div>    
    `
    render(guide, App.rootEl)
  }
}


export default new GuideView()