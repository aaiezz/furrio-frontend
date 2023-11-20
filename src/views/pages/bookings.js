// everything below has been taken from the weekly exercises
// any additional adjustments have been pointed out via comments

import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class Bookings2View {
  init(){
    document.title = 'Bookings2'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`

    <style>
    /* primary container for the booking rows*/
    .container {
      margin: 0 auto;
      max-width: 960px;
      overflow-y: auto; /* Add vertical scrolling to make room for additional fields below the fold*/
    }
    /* individual rows for the bookings*/
    .related-bookings {
      padding: 10px;
      margin: 10px;
      background-color: #fff;
      border: 1px solid #ccc;
      display: flex; /* Use flexbox */
      flex-direction: column; /* Set column layout */
      justify-content: center; /* Vertically center items */
      border-radius: 10px;
      overflow: hidden;
    }

    .booking-description {
      max-width: 30rem; /* Reducing the max width by 20% (original width - 20%) */
      margin-top: 2em;
    }
    .booking-time {
      font-weight: bold;
      margin-top: 1em;
    }
    .booking-name {
      font-weight: light;
      margin: 1em 1em 1em 0;

    }

    .details-button-container {
      display: flex; /* Use flexbox */
      justify-content: center; /* Horizontally center button */
      align-items: center; /* Vertically center button */
      position: relative;
      margin: 0 1em 0 0;

    }

      .booking-image {
        width: 300px;
        height: 150px;
        margin: 0 1em;
        border-radius: 10px;
        background: var(--base-bg) center / cover no-repeat; /* background colour if the image from google drive doesnt load */
      }


      .book-details-container {
        display: flex;
        justify-content: space-between;
      }
      .display-flex {
        display: flex;
        align-items: center;
        gap: 13px;
      }
      .margin-top {
        position: relative;
        margin-top: 5%;
      }
      :root {
        --brand-button-color: var(--brand-color); /* button colour to pick the default brand colour. If i don't add this in, the button doesn't show */
      }
      .details-button {
        display: inline-block;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s ease;
        background-color: var(--brand-button-color); /* Use the brand color for the button background */
        color: #fff; /* Set text color to ensure visibility */
        border: none;
        cursor: pointer;
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

    /* dummy/placeholder bookings which i've had to manually add in because I couldn't figure out how to create bookings
    in time for the assignment submission date*/

      <va-app-header title="Bookings" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <div class="container margin-top">
        <h2>My Upcoming Appointments</h2>

        <div class="row">
          <div class="col-md-4">
            <div class="related-bookings">
              <div class="booking-details book-details-container">
                <div class="display-flex">
                  <div class="booking-image" style="background-image: url('https://drive.google.com/uc?export=view&id=1ZuuyOtuGcIFNS92_fQ_fU4JOJBaSYO7H');"></div>
                  <div>
                    <h4 class="booking-name">Service Type 01</h4>
                    <div class="booking-description">
                      Description of the booking latest upcoming booking with the service provider
                    </div>
                    <div class="booking-time">9:30am - 10:00am</div>
                    <div class="booking-name">Service Provider name 01</div>
                  </div>
                </div>
                <div class="details-button-container">
                  <button class="details-button" disabled>Contact</button>
                </div>
              </div>
            </div>
          </div>
        </div>
          <br>
          <br>
          <h2>My Previous Appointments</h2>
          <div class="row">
            <div class="col-md-4">
              <div class="related-bookings">
                <div class="booking-details book-details-container">
                  <div class="display-flex">
                  <div class="booking-image" style="background-image: url('https://drive.google.com/uc?export=view&id=1ZuuyOtuGcIFNS92_fQ_fU4JOJBaSYO7H');"></div>                    <div>
                      <h4 class="booking-name">Service Type 01</h4>
                      <div class="booking-description">
                        Description of the last booking/appointment made with a service provider
                      </div>
                      <div class="booking-time">11:00am - 11:30am</div>
                      <div class="booking-name">Service Provider name 02</div>
                    </div>
                  </div>
                  <div class="details-button-container">
                    <button class="details-button" disabled>Contact</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="related-bookings">
                <div class="booking-details book-details-container">
                  <div class="display-flex">
                  <div class="booking-image" style="background-image: url('https://drive.google.com/uc?export=view&id=1ZuuyOtuGcIFNS92_fQ_fU4JOJBaSYO7H');"></div>                    <div>
                      <h4 class="booking-name">Service Type 03</h4>
                      <div class="booking-description">
                        Description of another booking/appointment made with a service provider
                      </div>
                      <div class="booking-time">01:00PM - 01:30PM</div>
                      <div class="booking-name">Service Provider name 01</div>
                    </div>
                  </div>
                  <div class="details-button-container">
                    <button class="details-button" disabled>Contact</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `
      
    render(template, App.rootEl) // do not change
  }
}


export default new Bookings2View()
