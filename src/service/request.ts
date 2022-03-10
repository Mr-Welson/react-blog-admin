import Axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';
import { baseApi } from './config';
import { message } from 'antd';
import { getToken } from '@/utils/auth';

type BaseResponse<T = any> = {
  code: number;
  data: T;
  message: string;
};

const contentTypeMap = {
  json: 'application/json;charset=UTF-8',
  file: 'multipart/form-data',
  formData: 'application/x-www-form-urlencoded',
};

interface ICustomAxiosRequestConfig extends AxiosRequestConfig {
  contentType?: 'json' | 'file' | 'formData';
}

const http = Axios.create({
  withCredentials: true,
  baseURL: baseApi,
  timeout: 60 * 1000,
});

// 请求拦截
http.interceptors.request.use((config: ICustomAxiosRequestConfig): AxiosRequestConfig => {
  const { contentType = 'json', headers, ...rest } = config;
  const mergeHeaders = {
    token: getToken(),
    'Content-Type': contentTypeMap[contentType],
    ...headers,
  };
  return { ...rest, headers: mergeHeaders };
});

// 响应拦截
http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    if (data.code !== 200) {
      console.error('==  response error == ');
      console.error(`== ${response.config.url} ==`, data);
      console.error();

      message.error(data.message);
      if (data.code === 401) {
        // token失效 跳转login
        window.location.href = '/login';
      }
    }
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export const request = (config: ICustomAxiosRequestConfig) => {
  return http
    .request(config)
    .then((res: AxiosResponse): BaseResponse => res.data)
    .catch((err) => Promise.reject(err));
};
