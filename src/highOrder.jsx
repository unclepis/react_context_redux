import React, { Component } from 'react'
import PropTypes from 'prop-types'

// 高阶组件封装从context中获取store的重复代码
export const connect = (WrappedComponent) => {
    class ContextComponent extends Component {
        static contextTypes = {
            store: PropTypes.object
        }

        constructor() {
            super();
            this.state = {
                themeColor: ''
            }
        }

        /**
         * 从context中获取store并订阅主题颜色变更事件
         */
        componentWillMount() {
            const { store } = this.context;
            this._updateThemeColor();
            store.subscribe(() => this._updateThemeColor());
        }


        _updateThemeColor() {
            const { store } = this.context;
            const state = store.getState();
            this.setState({
                themeColor: state.themeColor
            })
        }

        render() {
            return (
                <WrappedComponent data={this.state.themeColor} />
            )
        }
    }
    return ContextComponent // 封装后的组件
}

export class Provider extends Component {
    static propTypes = {
        store: PropTypes.object,
        children: PropTypes.any
    }

    static childContextTypes = {
        store: PropTypes.object
    }

    getChildContext() {
        return {
            store: this.props.store
        }
    }


    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
} 