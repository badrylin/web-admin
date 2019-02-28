// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
export function urlToList(url: string): string[] {
  const urlList = url.split('/').filter((i) => i);
  return urlList.map((item, index) => `/${urlList.slice(0, index + 1).join('/')}`);
}

// 获取参数
export const GetUrlParam = (search: string, paramName: string) => {
  const arrObj = search.split('?');
  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split('&');
    let arr;
    for (const item of arrPara) {
      arr = item.split('=');
      if (arr != null && arr[0] === paramName) {
        return arr[1];
      }
    }
    return '';
  } else {
    return '';
  }
};
