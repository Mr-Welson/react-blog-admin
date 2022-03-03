import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { IRoute } from '@/typings/route';
import { pageRoutes } from '@/routes';
import 'antd/dist/antd.css';
import zhCN from 'antd/lib/locale/zh_CN';

dayjs.locale('zh-cn');

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          {pageRoutes.map((route: IRoute) => (
            <Route exact={route.exact} key={route.path} path={route.path} component={route.component} />
          ))}
          {/* <Route exact path='/login' component={Login} />
          <Route path='/' component={Layout} /> */}
        </Switch>
      </Router>
    </ConfigProvider>
  );
}

export default App;
