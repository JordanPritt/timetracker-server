const controller = require('../controllers/users');
const validateToken = require('../utils/ValidateToken').validateToken;

module.exports = (router) => {
  router.route('/users')
    .post(controller.add)
    .put(controller.updateUser)
    .get(validateToken, controller.getAll);

  router.route('/login')
    .post(controller.login);
};