import { S3 } from "aws-sdk";

export const s3 = new S3({
  credentials: {
    accessKeyId: process.env.ACCESSKEY as string,
    secretAccessKey: process.env.SECRETKEY as string,
  },
});
