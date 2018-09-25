/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { html } from '@polymer/polymer/polymer-element.js';
import { PageViewElement } from "../../components/page-view-element";
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../../store.js';
import { MDCTextField } from '@material/textfield'
import { MDCCheckbox } from '@material/checkbox'
import { MDCFormField } from '@material/form-field'
import '@polymer/iron-selector/iron-selector.js'

import template from './template.html';
import SharedStyles from '../../components/shared-styles.html'
import textField from '../../components/material/textfield.html'
import formField from '../../components/material/form-field.html'
import button from '../../components/material/button.html'
import checkbox from '../../components/material/checkbox.html'

/**
 * `bn-project` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class BnAccount extends connect(store)(PageViewElement) {
    static get properties() {
        return {

        }
    }

    static get template() {
        return html([
            SharedStyles +
            textField +
            button +
            formField +
            checkbox +
            template
        ]);
    }

    /**
        * Object describing property-related metadata used by Polymer features
    */
    static get properties() {
        return {}
    }


    /**
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        this.shadowRoot.querySelectorAll('.mdc-text-field').forEach((node) => new MDCTextField(node));
        this.shadowRoot.querySelectorAll('.mdc-checkbox').forEach((node) => new MDCCheckbox(node));
        this.shadowRoot.querySelectorAll('.mdc-form-field').forEach((node) => new MDCFormField(node));
    }

    /**
     * Use for one-time configuration of your component after local DOM is initialized. 
     */
    ready() {
        super.ready();
    }

    _stateChanged(state){
        
    }
}

customElements.define('bn-account', BnAccount);