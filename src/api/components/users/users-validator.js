const joi = require('joi');
const { password } = require('../../../models/users-schema');

module.exports = {
  createUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      password: joi.string().min(6).max(32).required().label('Password'),
      password_confirm: joi
        .string()
        .required()
        .valid(joi.ref('password'))
        .messages({
          'any.only': 'Password confirmation must match the password',
        }),
    },
  },

  updateUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
    },
  },

  changePassword: {
    body: {
      password: joi.string().min(6).max(32).required().label('OldPassword'),
      newPassword: joi.string().min(6).max(32).required().label('NewPassword'),
      confirmPassword: joi
        .string()
        .required()
        .valid(joi.ref('newPassword'))
        .label('ConfirmNewPassword')
        .messages({
          'any.only': 'Confirm password must match the new password',
        }),
    },
  },
};
