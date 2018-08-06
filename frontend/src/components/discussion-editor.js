import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import { IronOverlayBehavior } from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

customElements.define('bn-discussion-editor', class extends mixinBehaviors(
    [IronOverlayBehavior], PolymerElement) {
    static get template() {
        return html`
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
                background-color: white;
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
                font-size: 1.5rem;
                color: var(--app-primary-color);
            }
            .flex{
                flex: 1;
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
                    <h1 class="title">Order Details</h1>
                    <span class="flex"></span>
                    <button class="mdc-button" dialog-dismiss>
                        <iron-icon icon="bn-icons:close"></iron-icon>
                    </button>
                </header>
                <main>
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

    // get _focusableNodes() {
    //     return [this.$.viewCartAnchor, this.$.closeBtn];
    // }

    refit() { }

    notifyResize() { }
});