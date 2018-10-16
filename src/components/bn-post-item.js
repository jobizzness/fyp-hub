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
                footer{
                    display: flex;
                    padding: 1em 3em;
                    background: #f1f1f1;
                    border-radius: 46px;
                    cursor: pointer;
                    position: relative;
                }
                footer .avatar{
                    height: 25px;
                    width: 25px;
                    margin-right: 8px;
                }
                .comment-box{
                    font-size: 14px;
                    font-weight: 500;
                    color: #888;
                }
            </style>
            <div class="wrapper">
                <header class="">
                    <div 
                        class="avatar"
                        style$="background-image: url([[_formatAvatar(data.owner.avatar)]])">
                        
                    </div>
                    <h3>[[_formatName(data.owner.name)]]</h3>
                </header>
                <div>
                    <p>[[data.description]]<p>
                    <a href="#">read more</a>
                </div>
                <footer on-click="view">
                    <div 
                        class="avatar"
                        style$="background-image: url([[_formatAvatar(avatar)]])">
                    </div>
                    <div class="comment-box">Write a reply...</div>
                    <paper-ripple></paper-ripple>
                </footer>
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
    view(){
        this.dispatchEvent(new CustomEvent('view-post', {detail: this.data}))
    }
    _formatName(name){
        return name || 'New User'
    }

    _formatAvatar(avatar){
        return avatar || '/assets/avatar.png'
    }
}

window.customElements.define('bn-post-item', BnPostItem);
