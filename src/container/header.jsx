import { connect } from 'react-redux'
import Header from '../components/header'

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}
export default connect(mapStateToProps)(Header);