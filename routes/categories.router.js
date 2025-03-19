const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multer.middleware.js')

const {
  getAllCategoryDetails,
  getAllCategoryNames,
  addNewCategory,
} = require('../controller/categories.controller.js')

router.route('/all').get(getAllCategoryNames)
router.route('/add').post(upload.single('category_image'), addNewCategory)
router.route('/').get(getAllCategoryDetails)

module.exports = router
