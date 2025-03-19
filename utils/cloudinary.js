const cloudinary = require('cloudinary')
const fs = require('fs')

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.error(
        'The File Path is not defined. Please Check the File Path and Try again.'
      )
      return null
    }
    console.log('Cloudinary Config:', cloudinary.v2.config())
    console.log('Cloudinary Recieved Local Path ', localFilePath)
    const response = await cloudinary.v2.uploader.upload(localFilePath, {
      resource_type: 'auto',
    })
    console.log('Response Cloudinary: -> ', response)
    fs.unlinkSync(localFilePath)
    return response
  } catch (error) {
    console.error('Cloudinary Upload Error:', error.message, error)
    fs.unlinkSync(localFilePath)
    return null
  }
}
module.exports = { uploadOnCloudinary }
