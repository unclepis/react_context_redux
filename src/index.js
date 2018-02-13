import React, { Component } from 'react'
import ReactDom from 'react-dom'
import Header from './header'
import Content from './content'
import { Provider } from './react-redux' // 通过context手写的Provider，为所有功能组件提供context
//import { Provider } from 'react-redux' // 这是真正react-redux提供的provider，在根组件中创建了context
//import { createStore } from 'redux' // 这是官方提供的createStore生成store

// 自己手动实现的createStore，后续引入redux的createStore
function createStore(themeReducer) {
    let state = null;
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state;
    const dispatch = (action) => {
        state = themeReducer(state, action);
        listeners.forEach(listener => listener());
    }
    dispatch({});
    return { getState, dispatch, subscribe };
}

const themeReducer = (state, action) => {
    if (!state) {
        return {
            themeColor: 'red'
        }
    }
    switch (action.type) {
        case 'change_color':
            return {
                ...state,
                themeColor: action.themeColor
            }
        default:
            return state;
    }
}

const store = createStore(themeReducer);

class Index extends Component {
    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}

ReactDom.render(
    <Provider store={store}>
        <Index />
    </Provider>,
    document.getElementById('root'));




