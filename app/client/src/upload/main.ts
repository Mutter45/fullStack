/** TODO 提取package并发布npm */
import { uploadFile, mergeFile, checkFile } from './api';
import { makeFileHash } from './makeFileHash';
interface Chunk {
  chunk: Blob;
  index: number;
  hash: string;
  start: number;
  end: number;
}
const input = document.querySelector('#input') as HTMLInputElement;

input.addEventListener('change', async (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const name = file.name;
  // // 文件分片
  console.time('WORK HASH');
  const chunkSize = 1024 * 1024 * 4; // 4MB
  const chunkList = await fragmentationFile(file, chunkSize, true);
  console.log(chunkList);
  console.timeEnd('WORK HASH');

  // 断点续传 检查以已传片段
  const { error, data } = await checkFile(name.split('.')[0]);
  if (error) return;
  const list: any[] = [];
  for (const item of chunkList) {
    if (data.includes(String(item.index))) continue;
    const formData = new FormData();
    formData.append('index', item.index.toString());
    formData.append('hash', item.hash);
    formData.append('fileName', name.split('.')[0]);
    formData.append('file', item.chunk);
    list.push(
      uploadFile({
        body: formData,
      }),
    );
  }
  if (!list.length) {
    console.log('文件已上传');
    return;
  }
  const res = await Promise.all(list);
  if (res.some((item) => item.error)) {
    console.log('上传失败');
    return;
  }
  mergeFile({ name });
});

// 文件分片处理
async function fragmentationFile(
  file: File,
  chunkSize: number,
  isWorker: boolean = false,
) {
  const chunks = Math.ceil(file.size / chunkSize);
  const chunkList: Omit<Chunk, 'hash'>[] = [];
  for (let i = 0; i < chunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);
    chunkList.push({
      chunk,
      index: i,
      start,
      end,
    });
  }
  const makeHashFn = isWorker ? ServiceFile : notServiceFile;
  const list: Chunk[] = await makeHashFn(chunkList);
  return list;
}
// 常规计算文件hash
async function notServiceFile(
  chunkList: Omit<Chunk, 'hash'>[],
): Promise<Chunk[]> {
  const ret = await Promise.all(
    chunkList.map((item) => makeFileHash(item, 'chunk')),
  );
  return ret;
}
// 采用Worker线程计算文件hash
function ServiceFile(chunkList: Omit<Chunk, 'hash'>[]): Promise<Chunk[]> {
  return new Promise((resolve) => {
    const worker = new Worker(new URL('./cutFile', import.meta.url), {
      type: 'module',
    });
    worker.postMessage(chunkList);
    worker.addEventListener('message', (e) => {
      //任务执行结束，关闭线程
      worker.terminate();
      resolve(e.data);
    });
  });
}
