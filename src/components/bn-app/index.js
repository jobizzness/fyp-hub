

import { PolymerElement, html } from '@polymer/polymer/polymer-element'
import { afterNextRender} from '@polymer/polymer/lib/utils/render-status.js'
import '@polymer/app-layout/app-drawer/app-drawer.js'
import '@polymer/app-layout/app-header/app-header.js'
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js'
import '@polymer/app-layout/app-toolbar/app-toolbar.js'
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js'
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js'

import '../my-icons.js';

import '@polymer/paper-button/paper-button.js'
import '@polymer/iron-icon/iron-icon.js'
import '@polymer/paper-progress/paper-progress.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { installRouter } from 'pwa-helpers/router.js'
import { installOfflineWatcher } from 'pwa-helpers/network.js'
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js'
//import { updateMetadata } from 'pwa-helpers/metadata.js'

import { store } from '../../store.js'
import { navigate, updateOffline, updateLayout } from '../../actions/app.js'
import { listenAuthChange } from '../../actions/auth.js'
import template from './template.html'
import SharedStyles from '../shared-styles.html'

import fb from "firebase/app"
import "firebase/firestore"

// Initialize Firebase
let config = {
	apiKey: "AIzaSyA7MawaD_MRPhoUVe8AxzXH_U5hAt-65gE",
	authDomain: "fyp-hub.firebaseapp.com",
	databaseURL: "https://fyp-hub.firebaseio.com",
	projectId: "fyp-hub",
	storageBucket: "fyp-hub.appspot.com",
	messagingSenderId: "336676726576"
};

window.firebase = fb.initializeApp(config);

const firestore = fb.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);


class BnApp extends connect(store)(PolymerElement) {
	static get template() {
		return html([
			SharedStyles
			+ template
		])
	}

	static get properties() {
		return {
			appTitle: String,
			page: {
				type: Object,
				observer: '_pageChanged',
				reflectToAttribute: true
			},
			loading: String,
			_drawerOpened: Boolean,
			_snackbarOpened: Boolean,
			_offline: Boolean
		}
	}

	static get observers(){
		return [
			'_checkUserCanViewPage(page, _user)'
		]
	}

	constructor() {
		super()
		// To force all event listeners for gestures to be passive.
		// See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
		setPassiveTouchGestures(true)

	}

	connectedCallback() {
		super.connectedCallback()
		installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))))
		installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)))
		installMediaQueryWatcher('(min-width: 460px)',
			(matches) => store.dispatch(updateLayout(matches)))
	}

	/**
   * @desc When the user navigates to a new page
   * @param {old, new} page - passes old and new page
   */
	_pageChanged(page, old) {
		this._drawerOpened = false
		
		this._activatePage(
			this.$pages.querySelector(`[page=${page}]`),
			this.$pages.querySelector(`[page=${old}]`)
		)

	}

	/**
	* @desc opens a modal window to display a message
	* @param string msg - the message to be displayed
	* @return bool - success or failure
	*/
	is_selected(page, view) {
		return page === view
	}

	_checkUserCanViewPage(page, _user){
		// afterNextRender(this, () => {
		// 	if (page === 'auth' && _user) {
		// 		//take you to home
		// 		if (this.togo) {
		// 			this.$.homeLink.href = "/" + this.togo + '/'
		// 		}
		// 		this.$.homeLink.click()
		// 	} else if (page != 'auth' && !_user) {
		// 		//send you to auth
		// 		this.togo = page;
		// 		this.$.authLink.click()
		// 	}
		// })
		
	}

	/**
	* @desc opens a modal window to display a message
	* @param string msg - the message to be displayed
	* @return bool - success or failure
	*/
	async _activatePage(_newPage, _oldPage) {
		//hide the old page
		if (_oldPage && typeof _oldPage.hide === 'function') {
			await _oldPage.hide()
		}

		//Show the new page
		if (_newPage && typeof _newPage.show === 'function') {
			await _newPage.show()
		} else {
			//if we are here, the page is not loaded so maybe show a spinner
			//wait for adwhile try again?
			//sky is the limit
			_newPage.start = true
		}

		window.scrollTo(0, 0)

	}

	_shouldShowSidebar(page){
		return (page != 'auth');
	}

	ready(){
		super.ready()
		this.$pages = this.shadowRoot.querySelector('#pages')

		store.dispatch(listenAuthChange())
	}

	_createProject(){
		this.$.projectEditor.open();
	}

	_toggleBodyScroll(){
		this.body = this.body || document.getElementsByTagName('body')[0]
		this.body.classList.toggle('no-scroll')
	}


	get categories(){
		return [
			{
				name: 'Databases',
				value: 'db'
			},
			{
				name: 'PHP',
				value: 'PHP'
			},
			{
				name: 'Machine Learning',
				value: 'ml'
			},
			{
				name: 'C++',
				value: 'c++'
			},
			{
				name: 'ASP.NET',
				value: 'asp'
			}
		]
	}
	/**
	* @desc opens a modal window to display a message
	* @param string msg - the message to be displayed
	* @return bool - success or failure
	*/
	_stateChanged(state) {
		this.page = state.app.route.page
		this._offline = state.app.offline
		this._snackbarOpened = state.app.snackbarOpened
		this._drawerOpened = state.app.drawerOpened
		this._user = state.app.user
	}
}

window.customElements.define('bn-app', BnApp)