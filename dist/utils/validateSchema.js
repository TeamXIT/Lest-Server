"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema, data) => {
    const { error } = schema.validate(data);
    return error ? error.details[0].message : null;
};
exports.validateSchema = validateSchema;
