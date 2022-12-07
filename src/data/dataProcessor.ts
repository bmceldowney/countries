/**
 * A wrapper for the web worker functionality
 */
import { AppDataState } from "../state/AppDataContext";
import * as workerPath from "file-loader?name=[name].js!./data.worker";

export const processData = (data: any) => {
  return new Promise((resolve: (state: AppDataState) => void) => {
    const worker = new Worker(workerPath);

    worker.onmessage = (event: any) => {
      resolve(event.data);
    };

    worker.postMessage(data);
  });
};
