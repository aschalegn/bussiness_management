import aws from "aws-sdk";
import multer from "multer";
var multerS3 = require('multer-s3')
import { amazon } from "../../util/config";
import fs from "fs";
import { Request } from "express";
const bucket = "teraye-images";

aws.config.update({
    accessKeyId: amazon.AccessKey,
    secretAccessKey: amazon.SecretAccessKey
});
const s3 = new aws.S3();

const uploadImage = async (file: any, id: string) => {
    const fileObj = {
        Bucket: bucket,
        Key: id + "-" + file.originalname,
        Body: fs.createReadStream(file.path)
    };

    const data = await s3.upload(fileObj);
    if (await data) {
        console.log(data);
        return data;
    }
    return false;
}

var uploadMulter = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: bucket,
        metadata: function (req: Request, file: Express.Multer.File, cb: any) {
            cb(null, { fieldName: req.params.id + "-" + file.fieldname });
        },
        key: function (req: Request, file: Express.MulterS3.File, cb: any) {
            cb(null, file.filename + "-" + Date.now().toString())
        }
    })
});


export { uploadImage, uploadMulter };
