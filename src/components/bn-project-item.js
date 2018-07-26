/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, LitElement } from '@polymer/lit-element';
import '@polymer/iron-image';
import '@polymer/iron-icon';

class BnProjectItem extends LitElement {
    _render(props) {
        return html`
        <style>
            :host{
                display: block;
                background: white;
                min-height: 375px;
                position: relative;
                overflow: hidden;
                box-shadow: 0 8px 16px 0 rgba(40,40,90,.09), 0 3px 6px 0 rgba(0,0,0,.065);
            }
        </style>
            
        <div class="wrapper">
            
        </div>
        
    `;
    }

    static get properties() {
        return {
            title: String,
            forAdmin: {
                type: Boolean,
                reflectToAttribute: true
            },
            data: {
                type: Object,
                value: {}
            }
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

window.customElements.define('bn-project-item', BnProjectItem);