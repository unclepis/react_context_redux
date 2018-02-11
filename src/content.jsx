import React, { Component } from 'react'
import ContextComponent from './highOrder'
import SwitchButton from './switchButton'

class Content extends Component {
    render() {
        return (
            <div>
                <p style={{ color: this.props.data }}>React with redux and context!</p>
                <SwitchButton />
            </div>
        )
    }
}

export default Content = ContextComponent(Content);
