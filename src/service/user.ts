import { baseApi } from './config';
import axios from 'axios';
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
    return axios({
      url: api.login,
      method: 'POST',
      withCredentials: true,
      data,
    });
  },
};

export default userService;
