import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Header from './header'
import Content from './content'

function CreateStore(themeReducer) {
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

const store = CreateStore(themeReducer);
export default class Index extends React.Component {
    static childContextTypes = {
        store: PropTypes.object
    }

    getChildContext() {
        return { store }
    }

    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}
ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
