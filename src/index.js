import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import HeaderTitle from './container/header'
import ContentTitle from './container/content'
// import { Provider } from './highOrder'
import { Provider } from 'react-redux'
import { Reducer } from './appReducer/reducer'
// import { CreateStore } from './store'
import { createStore } from 'redux'
import { Layout } from 'antd'
import 'antd/dist/antd.css'

const store = createStore(Reducer);
const { Header, Footer, Sider, Content } = Layout;



const renders = () => {
    const { themeColor } = store.getState()
    ReactDOM.render(
        <Provider store={store}>
            <div>
                <Layout>
                    <Header style={{ backgroundColor: '#7dbcea' }}>
                        <HeaderTitle />
                    </Header>
                    <Layout>
                        <Sider style={{ backgroundColor: '#3ba0e9' }} >
                            <div style={{ color: themeColor }}> This is Slide</div>
                        </Sider>
                        <Content style={{ backgroundColor: 'rgba(16, 142, 233, 1)' }}>
                            <ContentTitle />
                        </Content>
                    </Layout>
                    <Footer style={{ backgroundColor: '#7dbcea' }}>
                        <div style={{ color: themeColor }}>This is footer</div>
                    </Footer>
                </Layout>
            </div>
        </Provider>, document.getElementById('root'))
};
store.subscribe(renders);
renders();
registerServiceWorker();
