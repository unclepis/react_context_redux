import { connect } from 'react-redux'
import React, { Component } from 'react'
import CommentInput from './commentInput'
import CommentList from '../components/commentList'

class CommentApp extends Component {
    render() {
        return (
            <div style={{ display: 'flex' }}>
                <CommentInput />
                <CommentList {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor,
        comments: [...state.comments]
    }
}
export default connect(mapStateToProps)(CommentApp)