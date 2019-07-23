import { LitElement, html, css, property, PropertyValues, customElement } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

import '@vaadin/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification'
import { Router } from '@vaadin/router';

import { store, RootState } from '../store';
import { openApp } from '../actions/app'

import './main-view'
import './app-view1'
import './app-view2'
import './app-view3'

@customElement('main-app')
class MainApp extends connect(store)(LitElement) {

  @property({type: Number})
  private openCount: number = 0;

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

    <div>App opened ${this.openCount} times</div>

    <div id="container"></div>
    `;
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
      {path: '/', component: 'main-view'},
      {path: '/view1', component: 'app-view1'},
      {path: '/view2', component: 'app-view2'},
      {path: '/view3', component: 'app-view3'},
    ]);

    store.dispatch(openApp());
  }

  stateChanged(state: RootState) {
    this.openCount = state.app!.viewCount;
  }
}
