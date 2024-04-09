const { User } = require('../../../models');

const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const usersControllers = require('./users-controller');
const usersValidator = require('./users-validator');
const { param } = require('express/lib/router');
const { string } = require('joi');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return User.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Check if a user with a specific email already exists
 * @param {string} email
 * @returns {Promise<boolean>}
 */
async function checkIfUserExistsByEmail(email) {
  const user = await User.findOne({ email });
  return !!user;
}

/**
 * Change user Password
 *  @param {string} id - user id
 *  @param {string} password - password
 *  @return {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        password,
      },
    }
  );
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkIfUserExistsByEmail,
  changePassword,
};
