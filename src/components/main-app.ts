import { LitElement, html, css, property } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';

import '@vaadin/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification'
import { Router } from '@vaadin/router';

import './app-view1'
import './app-view2'
import './app-view3'

class MainApp extends LitElement {

  @property({ type: String })
  public appTitle: String = "Title";

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
    <a href="/">Main</a>
    <a href="/view1">View 1</a>
    <a href="/view2">View 2</a>
    <a href="/view3">View 3</a>

    <h1>${this.appTitle}</h1>


    <vaadin-button @click=${this.showMessage}>Click me!</vaadin-button>
    <vaadin-notification duration="4000">
      <template>
        <span>Hello!</span>
      </template>
    </vaadin-notification>

    <div id="container"></div>
    `;
  }
 
  showMessage(): void {
    const notification: NotificationElement | null = this.shadowRoot!.querySelector('vaadin-notification');
    if(notification) {
      notification.open();
    }
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  firstUpdated() {
    const router = new Router(this.shadowRoot!.getElementById('container'));
    router.setRoutes([
      {path: '/view1', component: 'app-view1'},
      {path: '/view2', component: 'app-view2'},
      {path: '/view3', component: 'app-view3'},
    ]);
  }
}

window.customElements.define('main-app', MainApp);
