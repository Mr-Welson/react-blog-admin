import React, { useEffect, useState } from 'react';
import './index.less';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';
import { marked } from 'marked';
// import hljs from 'highlight.js';
import Service from '@/service';
import type { IArticleInfo } from '@/typings/article';
import { useParams } from 'react-router-dom';

// const renderer = new Marked.Renderer();
// renderer.heading = (text, level) => {
//   const anchor = tocify.add(text, level);
//   return `<a id="${anchor}" href="#${anchor}"><h${level}>${text}</h${level}></a>`;
// };

const renderer = new marked.Renderer();

marked.setOptions({
  renderer, // 必要参数，可以通过自定义的Renderer渲染出自定义的格式
  gfm: true, // 使用 github 样式
  pedantic: false, // markdown 语法容错处理
  sanitize: false, // 不渲染markdown中的 html 标签
  // tables: true, // 支持Github形式的表格，必须打开gfm选项，填写true或者false
  breaks: false, // 支持Github换行符，必须打开gfm选项，填写true或者false
  smartLists: true, // 自动渲染列表
  smartypants: false,
  // highlight: (code) => {
  //   return hljs.highlightAuto(code).value;
  // },
});

type TypeInfo = {
  id: number;
  name: string;
  order: number;
  icon: string;
};

const ModifyArticle: React.FC = () => {
  const [articleId, setArticleId] = useState<number | undefined>(undefined); // 文章的ID，如果是undefined说明是新增加，如果不是undefined，说明是修改
  const [articleTitle, setArticleTitle] = useState<string>(''); // 文章标题
  const [articleContent, setArticleContent] = useState<string>(''); // markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState<string>('预览内容'); // html内容
  const [introducemd, setIntroducemd] = useState<string>(); // 简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState<string>('等待编辑'); // 简介的html内容
  const [showDate, setShowDate] = useState<number>(); // 发布日期
  const [updateDate, setUpdateDate] = useState<number>(); // 修改日志的日期
  const [typeInfo, setTypeInfo] = useState<TypeInfo[]>([]); // 文章类别信息
  const [selectedType, setSelectType] = useState<number>(1); // 选择的文章类别
  const params: { id?: string } = useParams();

  // 获取文章详情
  const getArticleById = async (id: number) => {
    try {
      const result = await Service.post.getArticleById(id);
      if (result.code !== 200) {
        return message.error(result.message);
      }
      setArticleTitle(result.data.title);
      setArticleContent(result.data.content);
      const html = marked(result.data.content);
      setMarkdownContent(html);
      setIntroducemd(result.data.introduce);
      const tmpInt = marked(result.data.introduce);
      setIntroducehtml(tmpInt);
      setShowDate(result.data.addTime);
      setSelectType(result.data.typeId);
    } catch (error) {}
  };

  useEffect(() => {
    if (params.id) {
      setArticleId(+params.id);
      getArticleById(+params.id);
    }
  }, []);

  // 获取文章分类列表
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Service.post.getTypeList();
        if (result.code !== 200) {
          return message.error(result.message);
        }
        setTypeInfo(result.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  // 文章内容change事件
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const content = e.target.value;
    setArticleContent(content);
    const html = marked.parse(content);
    setMarkdownContent(html);
  };
  // 文章简介change事件
  const onIntroduceChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const content = e.target.value;
    setIntroducemd(content);
    const html = marked.parse(content);
    setIntroducehtml(html);
  };
  // 文章类型切换
  const onTypeChange = (value: number) => {
    setSelectType(value);
  };
  // 修改发布时间
  const onPublishDateChange = (date: any) => {
    setShowDate(date * 1);
  };
  // 发布事件
  const onPublish = async () => {
    if (!selectedType) {
      message.error('必须选择文章类别');
      return false;
    } else if (!articleTitle) {
      message.error('文章名称不能为空');
      return false;
    } else if (!articleContent) {
      message.error('文章内容不能为空');
      return false;
    } else if (!introducemd) {
      message.error('简介不能为空');
      return false;
    } else if (!showDate) {
      message.error('发布日期不能为空');
      return false;
    }
    try {
      const data: IArticleInfo = {
        typeId: selectedType,
        title: articleTitle,
        content: articleContent,
        introduce: introducemd,
        createTime: showDate,
      };
      const funcName = articleId ? 'updateArticle' : 'addArticle';
      if (articleId) {
        data.id = articleId;
        data.viewCount = Math.ceil(Math.random() * 100) + 1000;
      }
      const result = await Service.post[funcName](data);
      if (result.code !== 200) {
        return message.error(result.message);
      }
      !articleId && setArticleId(result.data.id);
      message.success('文章保存成功');
    } catch (error) {
      message.success('文章保存失败');
    }
  };

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                placeholder='博客标题'
                size='large'
                value={articleTitle}
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select defaultValue={selectedType} size='large' onChange={onTypeChange}>
                {!!typeInfo.length &&
                  typeInfo.map((v) => (
                    <Select.Option value={v.id} key={v.id}>
                      {v.name}
                    </Select.Option>
                  ))}
              </Select>
            </Col>
          </Row>

          <br />
          <Row gutter={10}>
            <Col span={12}>
              <Input.TextArea
                className='markdown-content'
                rows={35}
                placeholder='文章内容'
                value={articleContent}
                // onPressEnter={onContentChange}
                onChange={onContentChange}
              />
            </Col>
            <Col span={12}>
              <div className='show-html' dangerouslySetInnerHTML={{ __html: markdownContent }}></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size='large'>暂存文章</Button>&nbsp;
              <Button type='primary' size='large' onClick={onPublish}>
                发布文章
              </Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <Input.TextArea rows={4} placeholder='文章简介' value={introducemd} onChange={onIntroduceChange} />
              <br />
              <br />
              <div className='introduce-html' dangerouslySetInnerHTML={{ __html: introducehtml }}></div>
            </Col>

            <Col span={12}>
              <div className='date-select'>
                <DatePicker placeholder='发布日期' size='large' onChange={onPublishDateChange} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ModifyArticle;
