import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('app-view2')
class AppView2 extends LitElement {

    @property({type: Number})
    private renderCount: number = 0;

    render() {
        return html`
            <div>View 2 rendered ${this.renderCount} times</div>
            `
    }

    firstUpdated() {
        this.renderCount = this.renderCount + 1;
    }
}
