import { baseApi } from './config';
import { request } from './request';

type Api = {
  [propName: string]: string;
};

const api: Api = {
  getTypeList: `${baseApi}/getTypeList`,
};

const postService = {
  getTypeList() {
    return request({
      url: api.getTypeList,
    });
  },
};

export default postService;
