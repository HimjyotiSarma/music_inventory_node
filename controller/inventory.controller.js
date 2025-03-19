const { asyncHandler } = require('../utils/asyncHandler.js')
const { ApiResponse } = require('../utils/ApiResponse.js')
const { ApiError } = require('../utils/ApiError.js')
const InstrumentRepos = require('../repos/instrument.repo.js')
const { uploadOnCloudinary } = require('../utils/cloudinary.js')

const getAllInstruments = asyncHandler(async (req, res) => {
  try {
    const allInstruments = await InstrumentRepos.findMany()

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          'All instrument data parsed successfully',
          allInstruments
        )
      )
  } catch (error) {
    throw new ApiError(
      error.status || 500,
      error?.message || 'Something went wrong when reading Instrument data'
    )
  }
})

const getSingleInstrument = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    const instrument_info = await InstrumentRepos.findById(id)
    console.log(instrument_info)

    if (!instrument_info) {
      throw new Error('Instrument Info Unvailable. Please Again Later')
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          'Instrument Info Found successfully',
          instrument_info
        )
      )
  } catch (error) {
    throw new ApiError(
      error.status || 500,
      error.message || 'Something went wrong when getting Insrument data'
    )
  }
})

const addNewInsrument = asyncHandler(async (req, res) => {
  try {
    const { name, description, price_in_paise, category } = req.body
    const instrument_img_path = req?.file?.path
    if (!instrument_img_path) {
      throw new ApiError(404, 'Instrument image is required.')
    }
    const instrumentImg = await uploadOnCloudinary(instrument_img_path)
    const newInstrument = await InstrumentRepos.insertOne(
      name,
      instrumentImg.url,
      description,
      price_in_paise,
      category
    )
    return res
      .status(201)
      .json(new ApiResponse(201, 'New Instrument Data Added', newInstrument))
  } catch (error) {
    throw new ApiError(
      error.status || 500,
      error.message || 'Something went wrong when Adding new Instrument'
    )
  }
})

module.exports = { getAllInstruments, getSingleInstrument, addNewInsrument }
