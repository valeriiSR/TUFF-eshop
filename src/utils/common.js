export const shuffle = (arr) => {
  return [...arr].sort(() => 0.5 - Math.random())
}

export const buildSearchParamsURL = (url, params) => {
  let urlWithParams = url;

  Object.entries(params).forEach(([key, value], i) => {
    const sign = !i ? '?' : '&';
    urlWithParams += `${sign}${key}=${value}`;
  })
  
  return urlWithParams;
}

export const summ = (arr) => arr.reduce((prev, current) => prev + current, 0);