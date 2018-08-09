/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { html } from '@polymer/polymer/polymer-element.js'
import { PageViewElement } from "../../components/page-view-element"
import { connect } from 'pwa-helpers/connect-mixin.js'

import { store } from '../../store.js'
import { MDCTextField } from '@material/textfield'
import { MDCCheckbox } from '@material/checkbox'
import { MDCFormField } from '@material/form-field'

import template from './template.html'
import SharedStyles from '../../components/shared-styles.html'
import textField from '../../components/material/textfield.html'
import formField from '../../components/material/form-field.html'
import button from '../../components/material/button.html'
import checkbox from '../../components/material/checkbox.html'
import '../../components/bn-spinner'


import { login, register } from "../../core/auth.js";

/**
 * `bn-project` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class BnAuth extends connect(store)(PageViewElement) {
    static get properties() {
        return {
            loading: {
                type: Boolean,
                reflectToAttribute: true,
                value: false
            }
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
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
        super();
    }

    /**
	* @desc opens a modal window to display a message
	* @param string msg - the message to be displayed
	* @return bool - success or failure
	*/
    is_selected(page, view) {
        return page === view
    }

    connectedCallback(){
        super.connectedCallback();
        this.shadowRoot.querySelectorAll('.mdc-text-field').forEach((node) => new MDCTextField(node));
        this.shadowRoot.querySelectorAll('.mdc-checkbox').forEach((node) => new MDCCheckbox(node));
        this.shadowRoot.querySelectorAll('.mdc-form-field').forEach((node) => new MDCFormField(node));

        
    }

    login(e){
        e.preventDefault()
        let form = this._getForm(e)

        if(form && form.checkValidity()){
            const email = form.querySelector('input[type=email]').value
            const password = form.querySelector('input[type=password]').value
            this.loading = true;
            store.dispatch(login(email, password))
        }
        
    }

    register(e){
        e.preventDefault()
        let form = this._getForm(e)

        if (form && form.checkValidity()) {
            const email = form.querySelector('input[type=email]').value
            const password = form.querySelector('input[type=password]').value
            store.dispatch(register(email, password))
        }
    }

    _getForm(e){
        let node = e.target;
        let form = node.closest('form')
        return form; //can be null

    }
    /**
     * Use for one-time configuration of your component after local DOM is initialized. 
     */
    ready() {
        super.ready();
        this.loading = true;
    }

    _stateChanged(state){
        this.page = state.app.route.slug
    }
}

customElements.define('bn-auth', BnAuth);