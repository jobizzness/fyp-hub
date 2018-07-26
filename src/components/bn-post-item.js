/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

// This element is *not* connected to the redux store.
class BnPostItem extends PolymerElement {

    static get template(){

        return html`
            <style>
                :host{
                    display: block;
                    margin: 24px 0;
                    padding: 16px;
                    background-color: white;
                    min-height: 150px;
                    max-width: 700px;
                    box-shadow: 0 8px 16px 0 rgba(40,40,90,.09), 0 3px 6px 0 rgba(0,0,0,.065);
                }
                p{
                    font-size: 14px;
                    color: #717171;
                    font-weight: 400;
                }
                .avatar{
                    height: 35px;
                    width: 35px;
                    border-radius: 50%;
                    background-color: #eee;
                    overflow: hidden;
                    background-size: cover;
                }
                header{
                    display: flex;
                    align-items:center;
                }
                h3{
                    margin: 0;
                    margin-left: 16px;
                    font-size: 14px;
                    font-weight: 500;
                }
            </style>
            <div class="wrapper">
                <header class="">
                    <div 
                        class="avatar"
                        style="background-image: url(https://scontent.fkul13-1.fna.fbcdn.net/v/t1.0-9/379930_2309306767847_1744320365_n.jpg?_nc_cat=0&oh=b8ba51df36418736bf25587b4f160066&oe=5BEA81EE)">
                        
                    </div>
                    <h3>Prabu Seteyi</h3>
                </header>
                <div>
                    <p>I need to ask someone who are really specialized and good in DBA (database), any recommendated guys ? if there ara, pls tag out ,just some question about database . #database<p>
                    <a href="#">read more</a>
                </div>
            
            </div>
        
        `;
    }

    static get properties() {
        return {
            data: {
             type: Object   
            },
            amount: String,
            price: String
        }
    }
}

window.customElements.define('bn-post-item', BnPostItem);
