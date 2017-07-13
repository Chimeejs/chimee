/**
* 处理range的静态函数
* author songguangyu
* emil 522963130@qq.com
*/
export default function (range) {
  const headers = {};
  let param;

  if (range.to !== -1) {
      param = `bytes=${range.from.toString()}-${range.to.toString()}`;
  } else {
      param = `bytes=${range.from.toString()}-`;
  }
  headers['Range'] = param;

  return {
    headers
  };
};
