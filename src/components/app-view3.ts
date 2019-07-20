import { LitElement, html, css, property } from 'lit-element';

class AppView3 extends LitElement {

    @property({type: Number})
    private renderCount: number = 0;

    render() {
        return html`
            <div>View 3</div>
            <div>Rendered ${this.renderCount} times</div>
            `
    }

    firstUpdated() {
        this.renderCount = this.renderCount + 1;
    }
}

customElements.define('app-view3', AppView3);
