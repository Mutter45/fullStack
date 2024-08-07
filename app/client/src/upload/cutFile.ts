import { makeFileHash } from './makeFileHash';
interface Chunk {
  chunk: Blob;
  index: number;
  hash: string;
  start: number;
  end: number;
}
addEventListener('message', handler);
async function handler(event: MessageEvent) {
  const result: Omit<Chunk, 'hash'>[] = event.data;
  const workerResult = await Promise.all(
    result.map((item) => makeFileHash(item, 'chunk')),
  );
  postMessage(workerResult);
}
