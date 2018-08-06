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
            .wrapper{
                padding: 1em;
            }
            .title{
                font-size: 1.1rem;
                font-weight: 500;
                color: #464646;
            }
            .horizontal{
                display: flex;
            }
            .description{
                font-size: .9rem;
                line-height: 1.4rem;
                color: #717171;
                padding-top: 2em;
            }
            .project-type{
                color: #3F51B5;
                font-size: .9rem;
                text-transform: capitalize;
            }
            .project-team{
                padding: 2em 0;
                align-items: center;
            }
            .team>*{
                margin-right: 8px;
            }
            .avatar{
                border-radius: 50%;
                background-color: #eee;
                overflow: hidden;
                height: 40px;
                width: 40px;
                background-size: cover;
            }
            .avatar img{
                display: none;
            }
            .label{
                font-weight: 500;
                color: #3e3e3e;
                margin-right: 14px;
                font-size: .9rem;
            }
        </style>
            
        <div class="wrapper">
            <header>
                <div class="horizontal">
                    <h1 class="title">Tranmission Network design & Implementation</h1>
                </div>
                <div class="project-type">WEB DEVELOPMENT</div>
            </header>
            <div>
                <p class="description">The answer is that they are both correct. When developing locally, bower_components is the folder that contains all of your dependencies. So it is logical to import codes from there, the problem comes when you want to make demos for example on CodePen...</p>
                <div class="project-team horizontal">
                    <span class="label">Team:</span>
                    <div class="horizontal team">
                        <div class="avatar" style="background-image: url(https://pbs.twimg.com/profile_images/972460944994418688/zipc-DNs_400x400.jpg)">
                            <img src="https://pbs.twimg.com/profile_images/972460944994418688/zipc-DNs_400x400.jpg" alt="" title="">
                        </div>
                        <div class="avatar" style="background-image: url(https://scontent.fkul13-1.fna.fbcdn.net/v/t1.0-9/10849785_869874446370183_7474591349200861919_n.jpg?_nc_cat=0&oh=73b2f709e0f38e62165e1e684e6b85e0&oe=5BDBDCB6)">
                            <img src="https://scontent.fkul13-1.fna.fbcdn.net/v/t1.0-9/10849785_869874446370183_7474591349200861919_n.jpg?_nc_cat=0&oh=73b2f709e0f38e62165e1e684e6b85e0&oe=5BDBDCB6" alt="" title="">
                        </div>
                        <div class="avatar" style="background-image: url(https://scontent.fkul13-1.fna.fbcdn.net/v/t1.0-9/19510551_1604412912924421_7929000518345056821_n.jpg?_nc_cat=0&oh=8d3fa27c89ccd2ce3a96d74215d485c7&oe=5BD0F0E3)">
                            <img src="https://scontent.fkul13-1.fna.fbcdn.net/v/t1.0-9/19510551_1604412912924421_7929000518345056821_n.jpg?_nc_cat=0&oh=8d3fa27c89ccd2ce3a96d74215d485c7&oe=5BD0F0E3" alt="" title="">
                        </div>
                    </div>
                </div>
            </div>
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