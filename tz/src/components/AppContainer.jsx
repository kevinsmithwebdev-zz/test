import { connect } from 'react-redux';
import { changeTheme } from '../actions';
import App from './App';

const mapStateToProps = (state) => {
	return {
		theme: state.theme
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchThemeChange: (newThemeName) => {
			dispatch(changeTheme(newThemeName))
		}
	}
};

const AppContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default AppContainer;
