import React, { useState, useEffect } from 'react';
import './index.less';
import { List, Row, Col, Modal, message, Button, Switch } from 'antd';
import type { IArticleDetail } from '@/typings/article';
import Service from '@/service';

const { confirm } = Modal;

const ArticleList = () => {
  const [articleList, setArticleList] = useState<IArticleDetail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Service.post.queryArticleList({});
        if (result.code !== 200) {
          return message.error(result.message);
        }
        setArticleList(result.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <div>
      <List
        header={
          <Row className='list-div'>
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={3}>
              <b>发布时间</b>
            </Col>
            <Col span={3}>
              <b>集数</b>
            </Col>
            <Col span={3}>
              <b>浏览量</b>
            </Col>

            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={articleList}
        renderItem={(item) => (
          <List.Item>
            <Row className='list-div'>
              <Col span={8}>{item.title}</Col>
              <Col span={3}>{item.typeName}</Col>
              <Col span={3}>{item.createTime}</Col>
              <Col span={3}>
                共<span>{item.partCount}</span>集
              </Col>
              <Col span={3}>{item.viewCount}</Col>

              <Col span={4}>
                <Button type='primary'>修改</Button>&nbsp;
                <Button>删除 </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ArticleList;
