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
class BnPostReply extends PolymerElement {

    static get template() {
        return html`
            <style>
                :host{
                    margin: -30px 0;
                    padding: 16px;
                    background-color: white;
                    min-height: 150px;
                    border-radius: 16px;
                    max-width: 620px;
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
            </style>
            <div class="wrapper">
                <header class="">
                    <div class="avatar"
                        style$="background-image: url([[_formatAvatar(data.owner.avatar)]])">
                    </div>
                    <h3>[[_formatName(data.owner.name)]]</h3>
                </header>
                <div>
                    <p>[[data.text]]<p>
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

    view() {
        this.dispatchEvent(new CustomEvent('view-post', { detail: this.data }))
    }

    _formatName(name) {
        return name || 'New User'
    }

    _formatAvatar(avatar) {
        return avatar || '/assets/avatar.png'
    }
}

window.customElements.define('bn-post-reply', BnPostReply);
