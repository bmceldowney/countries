/**
 * A wrapper for the web worker functionality
 */
import DataWorker from './data.worker'

export const processData = data => {
  return new Promise(resolve => {
    const worker = new DataWorker()

    worker.onmessage = event => {
      resolve(event.data)
    }

    worker.postMessage(data)
  })
}
