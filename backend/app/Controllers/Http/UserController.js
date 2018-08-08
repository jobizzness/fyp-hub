'use strict'
const User = use('App/Models/User');

class UserController {

    constructor(){
        
    }

    index({ request }){

        return { greeting: 'Hello world in JSON' }

    }

    show(){}
    store(){ }
    update(){ }
    destroy(){ }
}

module.exports = UserController
