import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CommentList extends Component {
    static propTypes = {
        themeColor: PropTypes.string,
        comments: PropTypes.array
    }
    render() {
        return (
            <div style={{ border: `1px dashed ${this.props.themeColor}`, flex: '1 1 50%' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
                    {
                        this.props.comments.length ? this.props.comments.map((comment, index) => {
                            return (
                                <div key={index}>
                                    <legend>{comment.userName} say:</legend>
                                    <div>{comment.comment}</div>
                                </div>
                            );
                        }) : null
                    }
                </div>
            </div>
        )
    }
}