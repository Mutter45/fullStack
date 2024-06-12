import { readFile, writeFile } from 'node:fs/promises';
export default async function <T>(pathName: string, fn?: (list: T[]) => T[]) {
  try {
    const listJson = await readFile(pathName, 'utf-8');
    const list = JSON.parse(listJson) as T[];
    if (typeof fn !== 'function') {
      return list;
    }
    const data = fn(list);
    await writeFile(pathName, JSON.stringify(data), 'utf-8');
    return data;
  } catch (error) {
    return error.message;
  }
}
