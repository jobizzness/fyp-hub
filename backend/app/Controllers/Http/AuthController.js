'use strict'

const { validateAll } = use('Validator')
const User = use('App/Models/User')
const ApiController = use('App/Controllers/ApiController')
const CreateUserCommand = use('App/Commands/CreateUserCommand')
const UserTransformer = use('App/Transformers/UserTransformer')

const LOGIN_ACTION = 'login'
const REGISTER_ACTION = 'register'
const RECOVER_ACTION = 'recover'

class AuthController extends ApiController{

    /**
    * @desc opens a modal window to display a message
    * @param string msg - the message to be displayed
    * @return bool - success or failure
    */
    constructor(){
        super();
        this.resource = User
        this.transformer = new UserTransformer()
    }

    /**
    * @desc opens a modal window to display a message
    * @param string msg - the message to be displayed
    * @return bool - success or failure
    */
    async index({params, request}){

        let action = params.action

        switch (action) {
            case LOGIN_ACTION:
                return await this.login(request)
            case REGISTER_ACTION:
                return await this.register(request)
            case RECOVER_ACTION:
                return await this.recover(request);
            default:
                return this.unknownAction(request)
        }
    }

    /**
    * @desc opens a modal window to display a message
    * @param string msg - the message to be displayed
    * @return bool - success or failure
    */
    async login(){

    }

    /**
    * @desc opens a modal window to display a message
    * @param string msg - the message to be displayed
    * @return bool - success or failure
    */
    async register(request){

        let data = request.only(['username', 'email', 'age']);

        const rules = {
            email: 'required'
        }

        const validation = await validateAll(data, rules)
        
        if(validation.fails()){
            return this.validationFails(validation)
        }

        //Create the user and respond with the data
        const user = await (new CreateUserCommand(data));
        
        return this.respond(this.transformer.transform(data))
        

    }

    /**
    * @desc opens a modal window to display a message
    * @param string msg - the message to be displayed
    * @return bool - success or failure
    */
    async recover(){}

    unknownAction(){
        return this.respondNotFound('This route does not exist eh!');
    }

    validationFails(validation){
        return this.requestFailed(validation.messages());
    }
}

module.exports = AuthController
