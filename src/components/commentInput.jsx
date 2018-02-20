import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Input } from 'antd'

export default class CommentInput extends Component {
    static propTypes = {
        themeColor: PropTypes.string,
        addComment: PropTypes.func
    }
    constructor() {
        super()
        this.state = {
            userName: '',
            comment: ''
        }
    }

    handleInput(inputName, e) {
        if (inputName === 'userName') {
            this.setState({
                'userName': e.target.value
            });
        } else {
            this.setState({
                'comment': e.target.value
            });
        }
    }

    handleComment() {
        const { userName, comment } = this.state;
        if (userName && comment) {
            this.props.comments.push({
                userName,
                comment
            });
            this.setState({
                comment: ''
            });
        }
        if (this.props.addComment) {
            this.props.addComment(this.props.comments);
        }
    }
    render() {
        return (
            <div style={{ border: `1px dashed ${this.props.themeColor}`, flex: '1 1 30%' }}>
                <div style={{ display: 'flex' }}>
                    <label style={{ color: this.props.themeColor }} htmlFor="userName">User Name:</label>
                    <Input style={{ width: '50%' }} id="userName" onChange={this.handleInput.bind(this, 'userName')} value={this.state.userName} placeholder="User Name" />
                </div>
                <div style={{ display: 'flex', width: '80%' }}>
                    <label style={{ color: this.props.themeColor }} htmlFor="comment">Comment:</label>
                    <Input row={10} id="comment" onChange={this.handleInput.bind(this, 'comment')} value={this.state.comment} placeholder="Comment Input" />
                </div>
                <Button type="primary" onClick={this.handleComment.bind(this)}><label style={{ color: this.props.themeColor }}>Submit Comment</label> </Button>
            </div>
        )
    }
}