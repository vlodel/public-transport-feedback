const userService = require('../service/user');

const createUser = async(request, response, next) => {
    const user = request.body;
    if(user.username && user.email && user.password) {
        const result = await userService.create(user);
        response.status(201).send({
            message:'User added successfully'
        });
    } else {
        response.status(400).send({
            message:'Invalid user payload.'
        });
    }
}

const getUserById = async(request, response, next) => {
    try{
        const id = request.params.id;
        if(id) {
            try{
                const user = await userService.getById(id);
                response.status(200).send(user);
            } catch(err) {
                response.status(500).send({
                    message:'Error occured' + err.message
                });
        }
            } else {
                response.status(400).send({
                    message: 'No id specified'
                })
            }
       } catch(err) {
          response.status(500).send({
             message:'Error occured' + err.message
                })
            }
        }
        
const disableUser = async(request, response, next) => {
    try {
        const id = request.params.id;
        const user = await userService.disable(id);
        
        response.status(200).json({
            message: `user with email address ${user.email} has been disabled`
        });
    } catch(err) {
        response.status(404).json({
            message: 'id not found'
        });
    }
}

const enableUser = async(request, response, next) => {
    try {
        const id = request.params.id;
        const user = await userService.enable(id);
        
        response.status(200).json({
            message: `user with email address ${user.email} has been enabled`
        });
    } catch(err) {
        response.status(404).json({
            message: 'id not found'
        });
    }
}

const modifyUser = async(request,response,next)=>{
    try{
        await userService.update(request.body);
        
        response.status(200).json({
            message: `user updated successfully`
        });
    } catch(err){
        response.status(404).json({
            message: 'user not found' + err.message
        });
    }
}
        
module.exports = {
    createUser,
    getUserById,
    enableUser,
    disableUser,
    modifyUser
}