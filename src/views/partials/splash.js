
import {html } from 'lit-html'

/* --- Original code from weekly exercises
const splash = html`

  <div class="app-splash">
    <div class="inner">
      <img class="app-logo" src="/images/logo.svg" />
      <sl-spinner style="font-size: 2em;"></sl-spinner>
    </div>
  </div>
`
export default splash
--*/

/*--pulse animation experiment. Reference: Florip Pop (2023)  --*/
const splash = html`
  <style>
    /* Keyframes for the pulsing animation */
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }

    /* CSS styling for the splash screen */
    .app-splash {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .inner {
      text-align: center;
    }

    /* Apply the pulsing animation to the logo */
    .app-logo {
      animation: pulse 2s ease-in-out 3; /* 3 times */
      max-width: 100%;
      height: auto;
    }
  </style>

  <div class="app-splash">
    <div class="inner">
      <!-- Apply the pulsing animation to the logo -->
      <img class="app-logo" src="/images/logo.svg" alt="App Logo" />
      <sl-spinner style="font-size: 2em;"></sl-spinner>
    </div>
  </div>
`;

export default splash;