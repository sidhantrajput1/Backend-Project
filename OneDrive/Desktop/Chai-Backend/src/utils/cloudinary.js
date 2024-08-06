import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';

import fs from "fs"

cloudinary.config( {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadCloudnary = async(localfilepath) => {
    try {
        if (!localfilepath) return null 

        // upload the file on cloudinary 
        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type:"auto"
        })
        // file has beem uploaded successfull
        // console.log("file has been uploaded on cloudinary", response.url)
        fs.unlinkSync(localfilepath)
        return response
    } catch (error) {
        fs.unlinkSync(localfilepath)
        // remove the locally saved teporary file as the upload operation got failed
        return null
    }
}

export {uploadCloudnary}