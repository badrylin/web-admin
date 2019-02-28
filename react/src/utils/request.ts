import axios from 'axios';
import { message } from 'antd';
import { getToken } from './auth';

// 创建axios实例
const service = axios.create({
//   baseURL: process.env.VUE_APP_MOCK_API,
  timeout: 5000,
});

// request 拦截器
service.interceptors.request.use(
  (config) => {
    config.headers['X-Token'] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    return config;
  },
  (error) => {
    // Handle request error here
    Promise.reject(error);
  },
);

// respone 拦截器
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    message.error(error.message);
    return Promise.reject(error);
  },
);

export default service;
