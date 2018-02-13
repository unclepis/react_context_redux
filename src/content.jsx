import React, { Component } from 'react'
import ThemeSwitch from './themeButton'
import { connect } from './react-redux' // 引入手写的高阶函数connect
// import { connect } from 'react-redux'  // 官方提供的封装从context中获取store的高阶函数connect

class Content extends Component {
    render() {
        return (
            <div>
                <p style={{ color: this.props.themeColor }}>redux和context混合使用的具体内容</p>
                <ThemeSwitch />
            </div>
        )
    }
}

const mapStateToProps = (state) => { // 根据Content这个无状态的pumb组件需要state中的上面参数，对高阶connect组件进行配置
    return {
        themeColor: state.themeColor
    }
}
export default Content = connect(mapStateToProps)(Content);
