import Joi from "joi";

export const validateSchema = (schema: Joi.ObjectSchema, data: any) => {
    const { error } = schema.validate(data);
    return error ? error.details[0].message : null;
};
