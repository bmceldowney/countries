/**
 * A wrapper for the web worker functionality
 */
import { DataWorker } from "./data.worker";

export const processData = (data: any) => {
  return new Promise((resolve) => {
    const worker = new DataWorker();

    worker.onmessage = (event: any) => {
      resolve(event.data);
    };

    worker.postMessage(data);
  });
};
