import AWS from 'aws-sdk'
import ApiErrorResponse from '../utils/ApiErrorResponse';
import { v4 as uuidv4 } from 'uuid'

// const config = {
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
//   region: "us-east-1",
// };
const initS3AWS = () => {
  const accesskeyId = process.env.AWS_S3_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_S3_SECRET_KEY;
  const config = {
    credentials: {
      accessKeyId: accesskeyId,
      secretAccessKey: secretAccessKey,
    },
    region: "us-east-1",
  };

  const s3 = new AWS.S3(config);
  s3.config.update(config);

  return s3;
}

export const getPresignedUrl = (req: any, res: any, next: any) => {
  const s3 = initS3AWS();
  // console.log(s3.config.credentials)
  // console.log(req.query)
  // console.log(req.payload);
  const extension = req.query.ext;
  const type = req.query.type;
  const key = `${req.payload.user.id}/${uuidv4()}.${req.query.ext}`;

  s3.getSignedUrl('putObject', {
    Bucket: 'yessir-bucket-tqt',
    Key: key,
    ContentType: type,
    // Conditions: [
    //   ['content-length-range', 0, 10000000],
    //   // ['starts-with', '$Content-Type', 'image/'],
    //   ['eq', '$Content-Type', type],
    // ],
    Expires: 15,
  }, (err, url) => {
    if (!err) {
      return res.status(200).json({
        key: key,
        url: url
      });
    }
    return next(new ApiErrorResponse(`cannot call for presigned url, ${err.message}`, 500))
  })
}