import { LitElement, html, css, property } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';

import '@vaadin/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification'

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
    <h1>${this.appTitle}</h1>
    <div>${this.appMethod()}</div>
    <vaadin-button @click=${this.showMessage}>Click me!</vaadin-button>
    <vaadin-notification duration="4000">
      <template>
        <span>Hello!</span>
      </template>
    </vaadin-notification>
    `;
  }

  appMethod(): string {
    const first: string = "This ";
    const second: string = "is ";
    const third: string = "TypeScript!"

    return first + second + third;
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

  }
}

window.customElements.define('main-app', MainApp);
