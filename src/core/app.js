import {Request} from './request.js';
import {CONFIG} from '../config.js';

window.__APP__ = window.__APP__ || new class {

    constructor() {
        this.element = document.querySelector(CONFIG.mainElement);
        this.API_URL = CONFIG.API_URL
    }

    /**
    * @desc opens a modal window to display a message
    * @param string msg - the message to be displayed
    * @return bool - success or failure
    */
    get Request(){
        return new Request();
    }

    createRequest(){
        
    }


}();




//Export remi app or something
//this is one useless comment
export const App = window.__APP__;