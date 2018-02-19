import { connect } from 'react-redux'
import ContentTitle from '../components/content'

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeThemeColor: (color) => {
            dispatch({
                type: 'change_color',
                themeColor: color
            });
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContentTitle);
