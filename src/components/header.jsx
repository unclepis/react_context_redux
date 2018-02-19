import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <div>
                <h1 style={{ color: this.props.themeColor }}>React with redux and context!</h1>
            </div>
        )
    }
}
