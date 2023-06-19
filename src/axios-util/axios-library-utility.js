import axios from "axios";

// const header = {}

// baseURL: 'https://some-domain.com/api/',

// headers: {'X-Custom-Header': 'foobar'}
const timeout = 5000;
const baseURL = "https://postcodes.io/";
const maxTryCount = 3;
const retryCount = 0;

const instance = axios.create({
  baseURL,
  timeout,
  retryCount,
  maxTryCount,
});

export const sleep = (ms) => {
  return new Promise((res, rej) => {
    setTimeout(res, ms);
  });
};

instance.interceptors.request.use((config) => {
  // set up tokens and headers
  return config;
}, null);

instance.interceptors.response.use(null, async (error) => {
  const { config } = error;
  if (!config) return Promise.reject(error);
  await sleep(2000);
  // handle error types!
  if (error.code == "ECONNABORTED") {
    if (config.retryCount < config.maxTryCount) {
      config.retryCount++;
      await instance.request(config);
    } else {
      return Promise.reject(error);
    }
  } else {
    return Promise.reject(error);
  }
});

export { instance as axios };
export * from "axios";
