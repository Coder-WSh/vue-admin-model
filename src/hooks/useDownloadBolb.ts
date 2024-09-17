import { ElMessage } from "element-plus";

/**
 * @param bolb 二进制文档流
 * @param name 文件名称
 * @param type 文件类型后缀
 * @description 创建一个a标签，然后下载文件，最后删除
 */
const useCreateDownload = (bolb: Blob, name: string, type: string): void => {
  if (bolb && name && type) return;
  const url = window.URL.createObjectURL(bolb); //创建一个blob地址
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = `${name}.${type}`;
  a.click();
  // 移除url的ObjectURL
  if (window.URL) {
    window.URL.revokeObjectURL(url);
  } else {
    window.webkitURL.revokeObjectURL(url);
  }
  document.removeChild(a);
};

type requestType = () => Promise<any>;
/**
 *
 * @param request api请求
 * @param name 文件名
 * @param type 文件类型
 * @returns request获取的data
 * @description 执行request，然后创建下载请求
 */
const useCreateBolb = (
  request: requestType,
  name: string,
  type: string
): Promise<any> => {
  let data: any = null;
  request()
    .then((res) => {
      data = res.data;
      useCreateDownload(data, name, type);
    })
    .catch((err) => {
      console.log("err", err);
      ElMessage.error("下载错误,请重新尝试。");
    });
  return Promise.resolve(data);
};

export  {
  useCreateBolb,
};
