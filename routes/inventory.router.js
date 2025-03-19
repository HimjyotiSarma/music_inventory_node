const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multer.middleware')

const {
  getAllInstruments,
  getSingleInstrument,
  addNewInsrument,
} = require('../controller/inventory.controller')

router.route('/add').post(upload.single('inventoryImg'), addNewInsrument)
router.route('/:id').get(getSingleInstrument)
router.route('/').get(getAllInstruments)

module.exports = router
