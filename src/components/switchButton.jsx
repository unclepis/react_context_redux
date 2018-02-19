import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SwitchButton extends Component {
    static propTypes = {
        themeColor: PropTypes.string,
        changeThemeColor: PropTypes.func
    }

    _changeThemeColor(color) {
        if (this.props.changeThemeColor) {
            this.props.changeThemeColor(color);
        }
    }

    render() {
        const options = ['red', 'blue'];
        return (
            <div>
                {
                    options.map((option, index) => {
                        return <button key={index} style={{ color: this.props.themeColor }} onClick={this._changeThemeColor.bind(this, option)}>{option}</button>
                    })
                }
            </div>
        );
    }
}

