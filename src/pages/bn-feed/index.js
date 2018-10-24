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
import { PageViewElement } from '../../components/page-view-element'
import { connect } from 'pwa-helpers/connect-mixin.js'

import '../../components/discussion-editor.js'
import '../../components/bn-discussion.js'
import '../../components/bn-post-item'
import { store } from '../../store.js'
import template from './template.html'
import SharedStyles from '../../components/shared-styles.html'

import { getDiscussions } from "../../actions/discussion.js"
import { discussion} from '../../reducers/discussion.js'


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
class BnFeed extends connect(store)(PageViewElement) {
	static get properties() {
		return {
			discussions:{
				type: Array,
				value: []
			},
			selected: {
				type: Object,
				value: {}
			}
		}
	}

	static get template() {
		return html([
			SharedStyles +
			template
		])
	}

	/**
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */
	constructor() {
		super()
	}

	_create(){
		this.$editor.open();
	}

	_select(e){
		this.$viewer.data = e.target.data
	}
	_view(e){
		this.$viewer.open();
	}

	connectedCallback(){
		super.connectedCallback()
		this.$editor = document.querySelector('bn-app').shadowRoot.querySelector('#projectEditor');
		this.$viewer = document.querySelector('bn-app').shadowRoot.querySelector('#discussionOverlay');
	}

	/**
     * Use for one-time configuration of your component after local DOM is initialized. 
     */
	ready() {
		super.ready()

		store.dispatch(getDiscussions())
		
	}

	_stateChanged(state){
		this.discussions = state.discussion.list
		this.user = state.app.user
	}
}

customElements.define('bn-feed', BnFeed)