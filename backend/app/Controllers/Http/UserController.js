'use strict'
const User = use('App/Models/User');
const ApiController = use('App/Controllers/ApiController')

class UserController extends ApiController{

    constructor(){
        super()
        this.user = User;
    }

    index({ request }){
        return { greeting: 'Hello world in JSON' }
    }

    show(){ }
    store(){ }
    update(){ }
    destroy(){ }
}

module.exports = UserController
