import fs from "fs";
import { QueueTask } from "./queue";
import { s3 } from "../services/s3";

export async function worker({ fileName }: QueueTask) {
  return new Promise<string>((resolve, reject) => {
    const bucketParams = { Bucket: process.env.BUCKET as string };

    const options = {
      Bucket: process.env.BUCKET as string,
      Key: fileName,
    };

    const fileStream = s3.getObject(options).createReadStream();

    fileStream
      .pipe(fs.createWriteStream(`./public/${fileName}`))
      .on("finish", () => {
        resolve("Arquivo baixado com sucesso");
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}
