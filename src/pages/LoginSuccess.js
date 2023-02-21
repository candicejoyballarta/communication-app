import React, { Component } from 'react';

export class LoginSuccess extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: JSON.parse(localStorage.getItem('loggedIn')) || {},
		};
	}

	render() {
		return (
			<div className='container'>
				<h2 className='login-success text-2xl font-bold mb-9'>
					Login Successful
				</h2>

				<p>
					<strong>Welcome !</strong> {this.state.loggedIn.email}
				</p>
			</div>
		);
	}
}

export default LoginSuccess;
