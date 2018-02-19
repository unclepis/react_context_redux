import { connect } from 'react-redux'
import HeaderTitle from '../components/header'

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}
export default connect(mapStateToProps)(HeaderTitle);