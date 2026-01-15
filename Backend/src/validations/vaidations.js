import Joi from "joi";

export const UserRegisterSchema = Joi.object({
    username:Joi.string().min(3).max(20).required(),
    password:Joi.string().pattern( new RegExp('^[a-zA-Z0-9]{6,20}$')).required()
})

export const UserLoginSchema = Joi.object({
    username:Joi.string().min(3).max(20).required(),
    password:Joi.string().pattern( new RegExp('^[a-zA-Z0-9]{6,20}$')).required()
})

export const UserUpdateSchema = Joi.object({
    username:Joi.string().required(),
    password:Joi.string().pattern( new RegExp('^[a-zA-Z0-9]{6,20}$')),
})

export const PostVideoShchema = Joi.object({
    title:Joi.string().required() 
})

export const UpdateVidoeByIdSchema = Joi.object({
    title:Joi.string().required()
})

// export const SearchVideoSchema = Joi.object({
//     data:Joi.string().required()
// })
