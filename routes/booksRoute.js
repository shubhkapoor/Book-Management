const express = require('express');
const app = express();
const router = express.Router();
const bookController = require('../controllers/bookController/bookController');
const authController = require('../controllers/authController/authController');


router.route('/').get(authController.protect , bookController.getAllBooks);
router.route('/:id').get(authController.protect , bookController.getBook);
router.route('/createBook').post(authController.protect , bookController.createBook);
router.route('/:id').put(authController.protect , bookController.updateBook);
router.route('/:id').delete(authController.protect , bookController.deleteBook);

module.exports = router;
