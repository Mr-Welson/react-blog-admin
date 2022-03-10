import React, { useState, useEffect } from 'react';
import './index.less';
import { useHistory } from 'react-router-dom';
import { getColumns } from './columns';
import { Table, message } from 'antd';
import type { IArticleDetail } from '@/typings/article';
import Service from '@/service';

const ArticleList = () => {
  const history = useHistory();
  const [articleList, setArticleList] = useState<IArticleDetail[]>([]);

  // 获取文章列表
  const fetchData = async () => {
    try {
      const result = await Service.post.queryArticleList({});
      if (result.code !== 200) {
        return message.error(result.message);
      }
      setArticleList(result.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 删除文章
  const onDelete = async (id: number) => {
    try {
      const result = await Service.post.deleteArticle(id);
      if (result.code !== 200) {
        return message.error(result.message);
      }
      fetchData();
    } catch (error) {}
  };

  const onEdit = (id: number) => {
    history.push(`/addArticle/${id}`);
  };

  return (
    <div>
      <Table rowKey='id' dataSource={articleList} columns={getColumns(onDelete, onEdit)}></Table>
    </div>
  );
};

export default ArticleList;
