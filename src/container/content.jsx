import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SwitchButton from '../components/switchButton'
import CommentApp from './commentApp'
import { connect } from 'react-redux'

class ContentTitle extends Component {
    static propTypes = {
        themeColor: PropTypes.string,
        changeThemeColor: PropTypes.func
    }

    render() {
        return (
            <div>
                <p style={{ color: this.props.themeColor }}>React with redux and context!</p>
                <SwitchButton {...this.props} />
                <CommentApp />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor,
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeThemeColor: (color) => {
            dispatch({
                type: 'change_color',
                themeColor: color
            });
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContentTitle);
