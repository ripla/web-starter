import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('app-view1')
class AppView1 extends LitElement {

    @property({type: Number})
    private renderCount: number = 0;

    render() {
        return html`
            <div>View 1 rendered ${this.renderCount} times</div>
            `
    }

    firstUpdated() {
        this.renderCount = this.renderCount + 1;
    }
}
