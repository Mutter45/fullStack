import SparkMD5 from 'spark-md5';
interface Res {
  hash: string;
}
export async function makeFileHash<T>(
  item: T,
  key: keyof T & string,
): Promise<T & Res> {
  const arrayBuffer = await (item[key] as Blob).arrayBuffer();
  const hash = SparkMD5.ArrayBuffer.hash(arrayBuffer);
  return {
    ...item,
    hash,
  };
}
