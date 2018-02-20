import { connect } from 'react-redux'
import CommentInput from '../components/commentInput'

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor,
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (comments) => {
            dispatch({
                type: 'add_comment',
                comments: comments
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);
