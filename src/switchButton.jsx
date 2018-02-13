import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from './react-redux' // 导入手写的高阶函数connect从context中获取store
// import { connect } from 'react-redux' // 官方提供的connect高阶函数

class ThemeSwitch extends Component {
    static contextTypes = {
        themeColor: PropTypes.string,
        onSwitchColor: PropTypes.func
    }

    handleChangeThemeColor(color) {
        if (this.props.onSwitchColor) {
            this.props.onSwitchColor(color);
        }
    }

    render() {
        return (
            <div>
                <button style={{ color: this.props.themeColor }} onClick={this.handleChangeThemeColor.bind(this, 'red')}>red</button>
                <button style={{ color: this.props.themeColor }} onClick={this.handleChangeThemeColor.bind(this, 'blue')}>blue</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => { // 用于需要获取用户的action，需要获取store中的dispatch，从mapDispatchToProps中获取
    return {
        onSwitchColor: (color) => {
            dispatch({
                type: 'change_color',
                themeColor: color
            });
        }
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}
export default ThemeSwitch = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch);
