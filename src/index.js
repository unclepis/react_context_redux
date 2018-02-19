import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Header from './container/header'
import Content from './container/content'
// import { Provider } from './highOrder'
import { Provider } from 'react-redux'
import { Reducer } from './appReducer/reducer'
// import { CreateStore } from './store'
import { createStore } from 'redux'

const store = createStore(Reducer);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Header />
            <Content />
        </div>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
