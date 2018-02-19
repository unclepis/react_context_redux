import React, { Component } from 'react'
import SwitchButton from './switchButton'

export default class Content extends Component {
    render() {
        return (
            <div>
                <p style={{ color: this.props.themeColor }}>React with redux and context!</p>
                <SwitchButton {...this.props} />
            </div>
        )
    }
}
