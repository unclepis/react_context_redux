import React, { Component } from 'react'
import { connect } from './react-redux' // 从手写的react-redux中引入connect高阶函数，把从context中获取store的通用逻辑封装到dumb组件Header
import { connect } from 'react-redux'

class Header extends Component {
    render() {
        return (
            <h1 style={{ color: this.props.themeColor }}>Redux和context和混合使用</h1>
        )
    }
}
const mapStateToProps = (state) => { // 根据Header这个无状态的pumb组件需要state中的上面参数，对高阶connect组件进行配置
    return {
        themeColor: state.themeColor
    }
}

export default Header = connect(mapStateToProps)(Header);
