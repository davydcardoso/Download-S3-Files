import "./bootstrap";
import AWS from "aws-sdk";
import { s3 } from "./services/s3";
import { queue } from "./lib/queue";

async function populateQueue() {
  AWS.config.update({ region: "us-west-1" });

  const bucketParams = { Bucket: process.env.BUCKET as string };

  s3.listObjects(bucketParams, async (err, data) => {
    if (err) {
      console.log(`Error accessing S3 | Erro: ${err.message}`);
      return;
    }

    if (data.Contents) {
      data.Contents.forEach(async (contents) => {
        console.log(contents.Key);
        queue
          .push({ fileName: contents.Key as string })
          .then((status) => {
            console.log(status);
          })
          .catch((err) => {
            console.log("Error downloading file", err);
          });
      });
    }
  });
}

populateQueue();
