import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import { IronOverlayBehavior } from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { MDCSelect } from "@material/select";
import { MDCTextField } from '@material/textfield'
import { MDCFormField } from '@material/form-field'

import SharedStyles from './shared-styles.html'
import textField from './material/textfield.html'
import formField from './material/form-field.html'
import button from './material/button.html'
import select from "./material/select.html";


customElements.define('bn-discussion-editor', class extends mixinBehaviors(
    [IronOverlayBehavior], PolymerElement) {
    static get template() {
        return html`
            ${html([
                SharedStyles +
                textField +
                button +
                formField + select
            ])}
            <style>
            :host {
                display: -webkit-box;
                display: -moz-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: box;
                display: flex;
                min-height: 100vh;
                -webkit-box-orient: vertical;
                -moz-box-orient: vertical;
                -o-box-orient: vertical;
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 0;
                overflow-x: hidden;
                background-color: white;
                width: 100%;
                margin-left: auto;
                max-width: 1172px;
                padding: 0;
                visibility: hidden;
                will-change: transform;
                -webkit-transform: translate3d(calc(100% + 16px), 0, 0);
                transform: translate3d(calc(100% + 16px), 0, 0);
                transition-property: visibility, -webkit-transform;
                transition-property: visibility, transform;
                transition-duration: 0.2s;
                transition-delay: 0.1s;
            }
            :host(.opened) {
                z-index: 4;
                visibility: visible;
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }
            .toolbar{
                border-bottom: 1px solid #b4c3ca;
                border-top: 1px solid #b4c3ca;
                display: -webkit-box;
                display: -moz-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: box;
                display: flex;
                -webkit-box-orient: horizontal;
                -moz-box-orient: horizontal;
                -o-box-orient: horizontal;
                -webkit-flex-direction: row;
                -ms-flex-direction: row;
                flex-direction: row;
                -webkit-box-align: center;
                -moz-box-align: center;
                -o-box-align: center;
                -ms-flex-align: center;
                -webkit-align-items: center;
                align-items: center;
                background-color: var(--app-primary-color);
                -webkit-box-shadow: 0 1px 2px 0 rgba(0,0,0,0.09);
                box-shadow: 0 1px 2px 0 rgba(0,0,0,0.09);
                padding-left: 2em;
                padding-right: 2em;
                position: relative;
                z-index: 6;
                min-height: 66px;
                -webkit-flex-shrink: 0;
                flex-shrink: 0;
            }
            .title{
                font-size: 1.3rem;
                color: white;
                font-weight: 400;
            }
            .flex{
                flex: 1;
            }
            main{
                padding: 2em;
            }
            form{
                max-width: 700px;
                margin: 0 auto;
            }
            form>*{
                margin-bottom: 2em;
            }
            @media (max-width: 767px) {
                :host {
                    /* top: auto;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    width: auto;*/
                    -webkit-transform: translate3d(0, 100%, 0);
                    transform: translate3d(0, 100%, 0); 
                }
            }
            </style>
            <div>
                <header class="toolbar">
                    <h1 class="title">Compose your question</h1>
                    <span class="flex"></span>
                    <button class="mdc-button" dialog-dismiss>
                        <iron-icon icon="bn-icons:close"></iron-icon>
                    </button>
                </header>
                <main>
                    <form>
                        <section class="row">
                            <div class="mdc-select flex">
                                <select class="mdc-select__native-control">
                                    <option value="" disabled selected></option>
                                    <option value="grains">
                                        Bread
                                    </option>
                                    <option value="vegetables">
                                        Vegetables
                                    </option>
                                    <option value="fruit">
                                        Fruit
                                    </option>
                                </select>
                                <label class="mdc-floating-label">Select Category</label>
                                <div class="mdc-line-ripple"></div>
                            </div>
                        </section>
                        <section class="row">
                            <div class="mdc-text-field mdc-text-field--textarea flex">
                                <textarea id="textarea" class="mdc-text-field__input" rows="8" cols="40"></textarea>
                                <label for="textarea" class="mdc-floating-label">Enter your question</label>
                            </div>
                        </section>

                        <!-- Actions -->
                        <section class="actions">
                            <button 
                                class="mdc-button mdc-button--raised" 
                                on-click="register" 
                                disabled$="[[loading]]">Submit</button>
                        </section>
                    </form>
                </main>
            </div>
`;
    }

    static get properties() {
        return {
            withBackdrop: {
                type: Boolean,
                value: true
            }
        }
    }

    ready() {
        super.ready();
        this.setAttribute('role', 'dialog');
        this.setAttribute('aria-modal', 'true');
        this.addEventListener('transitionend', (e) => this._transitionEnd(e));
        this.addEventListener('iron-overlay-canceled', (e) => this._onCancel(e));
    }

    connectedCallback(){
        super.connectedCallback()

        this.select = new MDCSelect(this.shadowRoot.querySelector('.mdc-select'))
        this.shadowRoot.querySelectorAll('.mdc-text-field').forEach((node) => new MDCTextField(node));
        this.shadowRoot.querySelectorAll('.mdc-form-field').forEach((node) => new MDCFormField(node));
    }

    _renderOpened() {
        this.restoreFocusOnClose = true;
        //this.backdropElement.style.display = 'none';
        this.classList.add('opened');
    }

    _renderClosed() {
        this.classList.remove('opened');
    }

    _onCancel(e) {
        // Don't restore focus when the overlay is closed after a mouse event
        if (e.detail instanceof MouseEvent) {
            this.restoreFocusOnClose = false;
        }
    }

    _transitionEnd(e) {
        if (e.target !== this || e.propertyName !== 'transform') {
            return;
        }
        if (this.opened) {
            this._finishRenderOpened();
            this.fire('announce', 'Item added to the cart');
        } else {
            this._finishRenderClosed();
            this.backdropElement.style.display = '';
        }
    }

    close(){
        this.opened = false;
    }

    open(){
        this.opened = true;
    }

    // get _focusableNodes() {
    //     return [this.$.viewCartAnchor, this.$.closeBtn];
    // }

    refit() { }

    notifyResize() { }
});