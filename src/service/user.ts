import { baseApi } from './config';
import { request } from './request';

type Api = {
  [propName: string]: string;
};

type LoginParams = {
  username: string;
  password: string;
};

const api: Api = {
  login: `${baseApi}/login`,
};

const userService = {
  login(data: LoginParams) {
    return request({
      url: api.login,
      method: 'POST',
      data,
      contentType: 'json',
    });
  },
};

export default userService;
