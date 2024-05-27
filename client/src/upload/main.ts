console.log("upload");
import { uploadFile, mergeFile, checkFile } from "./api";
interface Chunk {
  chunk: Blob;
  index: number;
}
const input = document.querySelector("#input") as HTMLInputElement;
const merge = document.querySelector("#merge") as HTMLButtonElement;
input.addEventListener("change", async (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const name = file.name;
  // 文件分片
  const chunkSize = 1024 * 1024 * 4; // 4MB
  const chunkList = fragmentationFile(file, chunkSize);
  // 断点续传 检查以已传片段
  const { error, data } = await checkFile(name.split(".")[0]);
  if (error) return;
  const list: any[] = [];
  for (const item of chunkList) {
    if (data.includes(String(item.index))) continue;
    const formData = new FormData();
    formData.append("index", item.index.toString());
    formData.append("fileName", name.split(".")[0]);
    formData.append("file", item.chunk);
    list.push(
      uploadFile(formData, {
        body: formData,
      })
    );
  }
  if (list.length === 0) {
    console.log("文件已上传");
    return;
  }
  const res = await Promise.all(list);
  if (res.some((item) => item.error)) {
    console.log("上传失败");
    return;
  }
  mergeFile({ name });
});
// 文件分片处理
function fragmentationFile(file: File, chunkSize: number): Chunk[] {
  const chunks = Math.ceil(file.size / chunkSize);
  const chunkList: Chunk[] = [];
  for (let i = 0; i < chunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);
    chunkList.push({
      chunk,
      index: i,
    });
  }
  return chunkList;
}
