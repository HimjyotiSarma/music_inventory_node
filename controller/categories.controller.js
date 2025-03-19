const { asyncHandler } = require('../utils/asyncHandler.js')
const { ApiResponse } = require('../utils/ApiResponse.js')
const { ApiError } = require('../utils/ApiError.js')
const { uploadOnCloudinary } = require('../utils/cloudinary.js')

const CategoryRepo = require('../repos/category.repo.js')

const getAllCategoryDetails = asyncHandler(async (req, res) => {
  try {
    const categoryDetails = await CategoryRepo.findMany()
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          'All Category Details found successfully',
          categoryDetails
        )
      )
  } catch (error) {
    throw new ApiError(
      error.status || 500,
      error.message || 'Something went wrong when parsing category Details'
    )
  }
})

const getAllCategoryNames = asyncHandler(async (req, res) => {
  try {
    const categoryList = await CategoryRepo.findDistinctNames()
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          'All Category Names found successfully',
          categoryList
        )
      )
  } catch (error) {
    throw new ApiError(
      error.status || 500,
      error.message || 'Something went wrong when parsing category list'
    )
  }
})

const addNewCategory = asyncHandler(async (req, res) => {
  try {
    const { name, description } = req.body
    if (!name && !description) {
      throw new ApiError(404, 'Category Name and Description is required')
    }
    const category_image_path = req?.file?.path
    if (!category_image_path) {
      throw new ApiError(404, 'Category Image is required')
    }
    console.log('Category Image Local Path : -> ', category_image_path)
    const category_img = await uploadOnCloudinary(category_image_path)
    console.log('Category Image Cloudinary Link : -> ', category_img)

    const newCategory = await CategoryRepo.insertOne(
      name,
      description,
      category_img.url
    )
    res
      .status(201)
      .json(
        new ApiResponse(201, 'New Category Added Successfully', newCategory)
      )
  } catch (error) {
    throw new ApiError(
      error.status || 500,
      error.message || 'Something went wrong when adding New Category'
    )
  }
})

module.exports = { addNewCategory, getAllCategoryDetails, getAllCategoryNames }
