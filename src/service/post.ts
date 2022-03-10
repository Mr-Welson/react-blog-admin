import { baseApi } from './config';
import { request } from './request';
import type { IArticleInfo } from '@/typings/article';

type Api = {
  [propName: string]: string;
};

const api: Api = {
  getTypeList: `${baseApi}/getTypeList`,
  queryArticleList: `${baseApi}/queryArticleList`,
  addArticle: `${baseApi}/addArticle`,
  updateArticle: `${baseApi}/updateArticle`,
  deleteArticle: `${baseApi}/deleteArticle/<id>`,
  getArticleById: `${baseApi}/getArticleById/<id>`,
};

const postService = {
  getTypeList() {
    return request({
      url: api.getTypeList,
    });
  },
  queryArticleList(data: object) {
    return request({
      url: api.queryArticleList,
      data,
    });
  },
  addArticle(data: IArticleInfo) {
    return request({
      url: api.addArticle,
      data,
    });
  },
  updateArticle(data: IArticleInfo) {
    return request({
      url: api.updateArticle,
      method: 'post',
      data,
    });
  },
  deleteArticle(id: number) {
    return request({
      url: api.deleteArticle.replace('<id>', String(id)),
      method: 'get',
    });
  },
  getArticleById(id: number) {
    return request({
      url: api.getArticleById.replace('<id>', String(id)),
      method: 'get',
    });
  },
};

export default postService;
