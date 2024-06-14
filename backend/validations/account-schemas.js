const Joi = require('joi');
const { AccountTypes } = require('../../frontend/src/utils/enums');

const newAccountSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid(...AccountTypes).required(),
});

module.exports = newAccountSchema;