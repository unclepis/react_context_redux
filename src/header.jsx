import React, { Component } from 'react'
import ContextComponent from './highOrder'

class Header extends Component {
    render() {
        return (
            <div>
                <h1 style={{ color: this.props.data }}>React with redux and context!</h1>
            </div>
        )
    }
}

export default Header = ContextComponent(Header);