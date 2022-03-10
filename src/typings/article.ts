export interface IArticleInfo {
  id?: number;
  typeId: number;
  title: string;
  content: string;
  introduce: string;
  createTime: number;
  viewCount?: number | undefined;
}

export interface IArticleDetail extends IArticleInfo {
  id: number;
  typeName: string;
  partCount: number;
  viewCount?: number;
}
