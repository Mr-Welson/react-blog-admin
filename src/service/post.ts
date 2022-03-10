import { baseApi } from './config';
import { request } from './request';
import type { IArticleInfo } from '@/typings/article';

type Api = {
  [propName: string]: string;
};

const api: Api = {
  getTypeList: `${baseApi}/getTypeList`,
  articleList: `${baseApi}/queryArticleList`,
  addArticle: `${baseApi}/addArticle`,
  updateArticle: `${baseApi}/updateArticle`,
};

const postService = {
  getTypeList() {
    return request({
      url: api.getTypeList,
    });
  },
  queryArticleList(data: object) {
    return request({
      url: api.articleList,
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
};

export default postService;
