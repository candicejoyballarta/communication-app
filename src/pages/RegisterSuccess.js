import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class RegisterSuccess extends Component {
	render() {
		return (
			<div className='container'>
				<h2 className='mt-title'>Registration Successful</h2>

				<p className='register-message'>
					Thank you for your registration
				</p>

				<Link to='/welcome' className='register-link'>
					Click to return to home page
				</Link>
			</div>
		);
	}
}

export default RegisterSuccess;
