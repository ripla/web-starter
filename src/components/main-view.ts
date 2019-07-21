import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('main-view')
class MainView extends LitElement {

    @property({type: Number})
    private renderCount: number = 0;

    render() {
        return html`
            <div>Main view rendered ${this.renderCount} times</div>

            <vaadin-button @click=${this.showMessage}>Click me!</vaadin-button>
            <vaadin-notification duration="4000">
                <template>
                    <span>Hello!</span>
                </template>
            </vaadin-notification>
            `
    }

    firstUpdated() {
        this.renderCount = this.renderCount + 1;
    }

    private showMessage(): void {
        const notification: NotificationElement | null = this.shadowRoot!.querySelector('vaadin-notification');
        if(notification) {
          notification.open();
        }
      }
}
