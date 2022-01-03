const S3 = require('aws-sdk/clients/s3');
require('dotenv').config();
const fs = require('fs');

const AWS_BUCKET_NAME_SERVICIO_NOTAS = process.env.AWS_BUCKET_NAME_SERVICIO_NOTAS;
const AWS_BUCKET_REGION_SERVICIO_NOTAS = process.env.AWS_BUCKET_REGION_SERVICIO_NOTAS;

const AWS_ACCESS_KEY_SERVICIO_NOTAS = process.env.AWS_ACCESS_KEY_SERVICIO_NOTAS;
const AWS_SECRET_KEY_SERVICIO_NOTAS = process.env.AWS_SECRET_KEY_SERVICIO_NOTAS;


const s3Instance = new S3({
    region: AWS_BUCKET_REGION_SERVICIO_NOTAS,
    accessKeyId: AWS_ACCESS_KEY_SERVICIO_NOTAS,
    secretAccessKey: AWS_SECRET_KEY_SERVICIO_NOTAS
});

//uploads a file to s3
function uploadFile(file)
{
    const fileStream = fs.createReadStream(file.path);

    var extension = file.originalname.split(".").pop();
    var filename = file.filename+"."+extension;

    const uploadParams = {
        Bucket: AWS_BUCKET_NAME_SERVICIO_NOTAS,
        Body: fileStream,
        Key: filename
    };

    return s3Instance.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;

//downloads a file from s3
function getFileStream(fileKey)
{
    const downloadParams = {
        Key: fileKey,
        Bucket: AWS_BUCKET_NAME_SERVICIO_NOTAS
    };
    return s3Instance.getObject(downloadParams).createReadStream();
}

exports.getFileStream = getFileStream;

function getTemporaryUrl(fileKey)
{
    const downloadParams = {
        Key: fileKey,
        Bucket: AWS_BUCKET_NAME_SERVICIO_NOTAS,
        Expires: 60
    };

    return s3Instance.getSignedUrlPromise('getObject', downloadParams);
}

exports.getTemporaryUrl = getTemporaryUrl;