
const Command = use('App/Commands/Command')
const User = use('App/Models/User')

class CreateUserCommand extends Command{

    constructor(data){
        super()
        this.data = data;
        return this.handle()
        
    }

    handle(){
        
    }
}

module.exports = CreateUserCommand