import Joi from "@hapi/joi";

export default class AdminValidation {

    static async registerValidation(data) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('admin', 'basic').required()
    });
    return schema.validate(data)
}
static async updateValidation(data) {
    const schema = Joi.object({
        adminId : Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data)
}

static async loginValidation(data) {
    const schema = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data)
}
static async containerValidation(data) {
    const schema = Joi.object({
        email: Joi.string().min(6).email().required(),
         name :  Joi.string(),
         speciality : Joi.string(),
         contenants :  Joi.string(),
         date : Joi.string(),
    
    });
    return schema.validate(data)
}

}
