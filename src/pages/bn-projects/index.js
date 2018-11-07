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
import template from './template.html'
import SharedStyles from '../../components/shared-styles.html'
import '../../components/bn-project-item.js'

import { getProjects } from "../../actions/discussion.js"
import { discussion } from '../../reducers/discussion.js'


// Initially loaded reducers.
store.addReducers({
    discussion
});

/**
 * `bn-project` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class BnProjects extends connect(store)(PageViewElement) {

    static get template() {
        return html([
            template +
            SharedStyles
        ]);
    }

    /**
    * Object describing property-related metadata used by Polymer features
    */
    static get properties() {
        return {
            user:{
                observer: '_userChanged'
            }
        }
    }

    _userChanged(user){
        store.dispatch(getProjects(user))
    }


    /**
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
        super();
    }

    connectedCallback(){
        super.connectedCallback();
    }

    /**
     * Use for one-time configuration of your component after local DOM is initialized. 
     */
    ready() {
        super.ready();
        
    }

    _stateChanged(state){
        this.projects = state.discussion.projects
        this.user = state.app.user
    }
}

customElements.define('bn-projects', BnProjects);