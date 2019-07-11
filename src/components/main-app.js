import { LitElement, html, css } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';

class MainApp extends LitElement {
  static get properties() {
    return {
      appTitle: { type: String }
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;

          //define CSS variables
        }
      `
    ];
  }

  render() {
    return html`
    <h1>${this.appTitle}</h1>
    `;
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  firstUpdated() {

  }
}

window.customElements.define('main-app', MainApp);
