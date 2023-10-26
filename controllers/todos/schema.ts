import Joi from "joi";

export const addTodoSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.boolean().required(),
});
