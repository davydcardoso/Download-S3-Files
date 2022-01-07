import fastq, { queueAsPromised } from "fastq";
import { worker } from "./worker";

export type QueueTask = {
  fileName: string;
};

const CONCURRENCY = 10;

export const queue: queueAsPromised<QueueTask> = fastq.promise(
  worker,
  CONCURRENCY
);
