import React, { Component } from 'react';
import '../css/register.css';
import { Navigate } from 'react-router';

export class Register extends Component {
	constructor() {
		super();
		this.state = {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
			fullNameError: '',
			emailError: '',
			passwordError: '',
			accError: '',
			success: '',
		};

		this.validateEmail = this.validateEmail.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	validateEmail(email) {
		//Check minimum valid length of an Email.
		if (email.length <= 2) {
			return false;
		}

		//If whether email has @ character.
		if (email.indexOf('@') === -1) {
			return false;
		}

		let parts = email.split('@');
		let dot = parts[1].indexOf('.');
		let dotPart = parts[1].split('.');
		let dotCount = dotPart.length - 1;

		// Check whether it starts with Dot
		if (parts[0].indexOf('.') === 0) {
			return false;
		}

		//Check whether Dot is present, and that too minimum 1 character after @.
		if (dot === 0 || dot === -1 || dot < 2 || dotCount > 2) {
			return false;
		}

		//Check whether Dot is not the last character and dots are not repeated.
		for (let i = 0; i < dotPart.length; i++) {
			if (dotPart[i].length === 0) {
				return false;
			}
		}

		return true;
	}

	handleSubmit = (event) => {
		event.preventDefault();
		let hasError = false;

		if (!this.state.fullName) {
			this.setState({ fullNameError: 'Please input full name' });
			hasError = true;
		} else {
			this.setState({ fullNameError: '' });
		}

		if (!this.state.email) {
			this.setState({ emailError: 'Email is required' });
			hasError = true;
		} else if (!this.validateEmail(this.state.email)) {
			this.setState({ emailError: 'Email is not valid' });
			hasError = true;
		} else {
			this.setState({ emailError: '' });
		}

		if (!this.state.confirmPassword) {
			this.setState({ passwordError: 'Please confirm password' });
			hasError = true;
		} else {
			this.setState({ passwordError: '' });
		}

		if (!this.state.password) {
			this.setState({ passwordError: 'Password is required' });
			hasError = true;
		} else if (this.state.password.length < 8) {
			this.setState({
				passwordError: 'Password must be 8 characters',
			});
			hasError = true;
		} else if (this.state.password !== this.state.confirmPassword) {
			this.setState({ passwordError: 'Passwords does not match' });
			hasError = true;
		} else {
			this.setState({ passwordError: '' });
		}

		if (
			!this.state.fullNameError ||
			!this.state.emailError ||
			!this.passwordError
		) {
			// Get userlist from local storage
			const userList = JSON.parse(localStorage.getItem('Users')) || [];

			// Loop for userlist
			for (let i = 0; i < userList.length; i++) {
				// Check if user exist on storage
				if (userList[i].email === this.state.email) {
					this.setState({
						accError: 'User already exist in system!',
					});
					hasError = true;
				}
			}

			if (!hasError) {
				let userID = Math.floor(Math.random() * 999);
				// User input in JSON
				const userData = {
					id: userID,
					fullName: this.state.fullName,
					email: this.state.email,
					password: this.state.password,
				};

				// Save User data in localStorage and redirect to success page
				userList.push(userData);
				localStorage.setItem('Users', JSON.stringify(userList));
				this.setState({ success: 'User Registered!' });
			} else {
				this.setState({ success: '' });
			}
		}
	};

	render() {
		return (
			<div className='container'>
				<h2 className='mt-title'>Register</h2>

				<form onSubmit={this.handleSubmit} className='register-form'>
					<div className='content'>
						<div className='form-input'>
							<label>
								<strong>Full Name</strong>
							</label>
							<input
								className='input'
								type='text'
								name='full-name'
								onChange={(event) => {
									this.setState({
										fullName: event.target.value,
									});
									this.setState({ fullNameError: '' });
								}}
							/>
							{this.state.fullNameError ? (
								<p className='error fullNameErr'>
									{this.state.fullNameError}
								</p>
							) : (
								''
							)}
						</div>
						<div className='form-input'>
							<label>
								<strong>Email</strong>
							</label>
							<input
								className='input'
								type='email'
								name='email'
								onChange={(event) => {
									this.setState({
										email: event.target.value,
									});
									this.setState({ emailError: '' });
								}}
							/>
							{this.state.emailError ? (
								<p className='error emailErr'>
									{this.state.emailError}
								</p>
							) : (
								''
							)}
						</div>
						<div className='form-input'>
							<label>
								<strong>Password</strong>
							</label>
							<input
								className='input'
								type='password'
								name='password'
								onChange={(event) => {
									this.setState({
										password: event.target.value,
									});
									this.setState({ passwordError: '' });
								}}
							/>
						</div>
						<div className='form-input'>
							<label>
								<strong>Confirm Password</strong>
							</label>
							<input
								className='input'
								type='password'
								name='confirm-password'
								onChange={(event) =>
									this.setState({
										confirmPassword: event.target.value,
									})
								}
							/>
							{this.state.passwordError ? (
								<p className='error passwordErr'>
									{this.state.passwordError}
								</p>
							) : (
								''
							)}
							{this.state.accError ? (
								<p className='error accError'>
									{this.state.accError}
								</p>
							) : (
								''
							)}
						</div>
					</div>

					<input className='btn' type='submit' value='Register' />
				</form>

				{this.state.success ? (
					<Navigate to='/register-success' replace={true} />
				) : (
					''
				)}
			</div>
		);
	}
}

export default Register;
