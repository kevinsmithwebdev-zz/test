import React from 'react';
import SampleComponent from './SampleComponent';

class App extends React.Component {
	constructor(props) {
		super(props)
	}

	toggleTheme() {
		const newTheme = this.props.theme.name === 'light' ? 'dark': 'light';
		this.props.dispatchThemeChange(newTheme);
	};

	render() {
		return (
			<div id='main' className={this.props.theme.name}>
				<h1>This is my main app component.</h1>
				<h2>Theme: {this.props.theme.name}</h2>
				<button onClick={this.toggleTheme.bind(this)}>
					Change the Theme
				</button>
				<SampleComponent />
			</div>
		)
	}
}

export default App;
