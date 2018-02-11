import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContextComponent from './highOrder'

class SwitchButton extends Component {
    static contextTypes = {
        store: PropTypes.object
    }

    _changeThemeColor(color) {
        const { store } = this.context;
        store.dispatch({
            type: 'change_color',
            themeColor: color
        })
    }

    render() {
        const options = ['red', 'blue'];
        return (
            <div>
                {
                    options.map(option => {
                        return <button style={{ color: this.props.data }} onClick={this._changeThemeColor.bind(this, option)}>{option}</button>
                    })
                }
            </div>
        );
    }
}

export default SwitchButton = ContextComponent(SwitchButton);

