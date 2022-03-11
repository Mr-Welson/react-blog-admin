import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { IRoute } from '@/typings/route';
import { staticRoutes } from '@/routes';
import zhCN from 'antd/lib/locale/zh_CN';
import './App.less';

dayjs.locale('zh-cn');

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          {staticRoutes.map((route: IRoute) => (
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
