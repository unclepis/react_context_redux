import React, { Component } from 'react'
import PropTypes from 'prop-types'

// 定义了一个高阶组件connect，将从context获取store的重复逻辑提取出来，然后将传入的低阶组件进行封装
export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        }

        constructor() {
            super()
            this.state = { allProps: {} }
        }

        componentWillMount() {
            const { store } = this.context;
            this._updateThemeColor();
            store.subscribe(() => this._updateThemeColor()); // 监听数据变化
        }

        _updateThemeColor() {
            const { store } = this.context;
            let stateProps = mapStateToProps ? mapStateToProps(store.getState()) : this.props; // 根据定义好的返回state给每个pumb组件返回不同的state
            let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props) : {}; // 根据定义好的返回state给每个pumb组件返回不同的state
            this.setState({
                allProps: {
                    ...stateProps, //通过mapStateToProps生成的props
                    ...dispatchProps,
                    ...this.props // 整合了普通的props
                }
            });
        }

        render() {
            return (
                <WrappedComponent {...this.state.allProps} />
            )
        }
    }
    return Connect
}

export class Provider extends Component {
    // 定义Provider组件的props
    static PropTypes = {
        store: PropTypes.object,
        children: PropTypes.any // Provider组件里面可以放入正真的组件
    }

    // 定义contextApi
    static childContextTypes = {
        store: PropTypes.object
    }

    // 把用户在容器组件传入props的store放入context方便子组件共享
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
        );
    }
}
