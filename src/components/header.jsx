import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class HeaderTitle extends Component {
    static propTypes = {
        themeColor: PropTypes.string
    }

    render() {
        return (
            <div>
                <h1 style={{ color: this.props.themeColor }}>React with redux and context!</h1>
            </div>
        )
    }
}
