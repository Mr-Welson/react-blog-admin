import React, { useState } from 'react';
import './index.less';
import { Row, Col, Input, Select, Button, DatePicker } from 'antd';
import { marked } from 'marked';
// import hljs from 'highlight.js';

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

const ModifyArticle: React.FC = () => {
  const [articleId, setArticleId] = useState<number>(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState<string>(''); // 文章标题
  const [articleContent, setArticleContent] = useState<string>(''); // markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState<string>('预览内容'); // html内容
  const [introducemd, setIntroducemd] = useState<string>(); // 简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState<string>('等待编辑'); // 简介的html内容
  const [showDate, setShowDate] = useState<number>(); // 发布日期
  const [updateDate, setUpdateDate] = useState<number>(); // 修改日志的日期
  const [typeInfo, setTypeInfo] = useState<number[]>([]); // 文章类别信息
  const [selectedType, setSelectType] = useState<number>(1); // 选择的文章类别

  const onPublish = () => {};
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const content = e.target.value;
    setArticleContent(content);
    const html = marked.parse(content);
    setMarkdownContent(html);
  };
  const onIntroduceChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const content = e.target.value;
    setIntroducemd(content);
    const html = marked.parse(content);
    setIntroducehtml(html);
  };
  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input placeholder='博客标题' size='large' />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select defaultValue='Sign Up' size='large'>
                <Select.Option value='Sign Up'>视频教程</Select.Option>
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
                <DatePicker placeholder='发布日期' size='large' />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ModifyArticle;
