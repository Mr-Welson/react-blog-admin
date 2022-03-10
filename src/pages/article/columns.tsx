import React from 'react';
import { Popconfirm, Button } from 'antd';

export const getColumns = (onDelete: Function, onEdit: Function) => {
  return [
    {
      dataIndex: 'title',
      title: '标题',
    },
    {
      dataIndex: 'typeName',
      title: '类别',
    },
    {
      dataIndex: 'createTime',
      title: '发布时间',
    },
    {
      dataIndex: 'viewCount',
      title: '浏览量',
    },
    {
      dataIndex: 'id',
      title: '操作',
      render: (id: number) => (
        <>
          <Button key='edit' type='primary' onClick={() => onEdit(id)}>
            修改
          </Button>
          <Popconfirm key='delete' title='确定要删除吗？' onConfirm={() => onDelete(id)}>
            <Button> 删除</Button>
          </Popconfirm>
        </>
      ),
    },
  ];
};
