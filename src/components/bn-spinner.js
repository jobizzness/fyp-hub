/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, LitElement  } from '@polymer/lit-element';

class BnSpinner extends LitElement {
    _render(props) {
        return html`
        <style>
        :host([active]){
            display:block
        }
        :host{
            display: none;
        }
        @keyframes pulse {
            0% {
                stroke-dashoffset: -251.33;
                transform: rotate(0deg);
                stroke: var(--bn-spinner-color-primary);
            }
            25% {
                stroke-dashoffset: -170.9;
                transform: rotate(120deg);
                stroke: var(--bn-spinner-color-primary);
            }
            50% {
                stroke-dashoffset: -251.33;
                transform: rotate(180deg);
                stroke: var(--bn-spinner-color-primary);
            }
            50.001% {
                stroke: var(--bn-spinner-color-secondary);
            }
            75% {
                stroke-dashoffset: -170.9;
                transform: rotate(300deg);
                stroke: var(--bn-spinner-color-secondary);
            }
            100% {
                stroke-dashoffset: -251.33;
                transform: rotate(360deg);
                stroke: var(--bn-spinner-color-secondary);
            }
            }

            #spinnerContainer {
            display: block;
            
            transform: scale(0.5);
            }

            #spinnerContainer div {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            font-size: 0;
            }

            #spinnerContainer div svg {
            fill: transparent;
            stroke: #f7df1e;
            stroke-width: 10px;
            stroke-dasharray: calc(80 * 3.14159);
            animation: pulse 2s ease-in-out infinite;
            }

            #div1 {
            transform: rotate(30deg);
            }

            #div2 {
            transform: rotate(150deg);
            }

            #div3{
            transform: rotate(270deg);
            }
        </style>
        <div id="spinnerContainer">
            <div id="div1">
                <svg width="100" height="100">
                <circle cx="50" cy="50" r="40"/>
                </svg>
            </div>
            <div id="div2">
                <svg width="100" height="100">
                <circle cx="50" cy="50" r="40"/>
                </svg>
            </div>
            <div id="div3">
                <svg width="100" height="100">
                <circle cx="50" cy="50" r="40"/>
                </svg>
            </div>
        </div>
    `;
    }

    static get properties() {
        return {
            active: Boolean,
        }
    }

    constructor() {
        super();

    }

    _firstRendered() {

    }

    _didRender(properties, changeList) {

    }
}

window.customElements.define('bn-spinner', BnSpinner);