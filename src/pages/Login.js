import React from 'react';
import '../css/login.css';
import { Navigate } from 'react-router';

export class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: JSON.parse(localStorage.getItem('Users')) || [],
			email: '',
			password: '',
			emailError: '',
			passwordError: '',
			loginError: '',
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

	handleSubmit(event) {
		event.preventDefault();
		let hasError = false;

		if (!this.state.email) {
			this.setState({ emailError: 'Email is required' });
			hasError = true;
		} else if (!this.validateEmail(this.state.email)) {
			this.setState({ emailError: 'Email is not valid' });
			hasError = true;
		} else {
			this.setState({ emailError: '' });
		}

		if (!this.state.password) {
			this.setState({ passwordError: 'Password is required' });
			hasError = true;
		} else {
			this.setState({ passwordError: '' });
		}

		// Check if form has no error
		if (!hasError) {
			const userList = this.state.users;

			// Check if email is registered
			const userExists = userList.find(
				({ email }) => email === this.state.email
			);

			if (userExists) {
				// Check if email and password in match
				if (
					userExists.email === this.state.email &&
					userExists.password === this.state.password
				) {
					localStorage.setItem(
						'loggedIn',
						JSON.stringify(userExists)
					);
					this.setState({ success: true });
				} else {
					this.setState({ loginError: 'Wrong email or password!' });
				}
			} else {
				this.setState({ loginError: 'Email is not registered yet!' });
			}
		}
	}

	render() {
		return (
			<div className='container w-screen'>
				<h2 className='mt-title text-2xl font-bold'>Login</h2>
				<form onSubmit={this.handleSubmit} className='login-form'>
					<div className='content'>
						<div className='form-input'>
							<label>
								<strong>Email</strong>
							</label>
							<input
								className='input'
								type='email'
								name='email'
								id='email'
								onChange={(event) => {
									this.setState({
										email: event.target.value,
									});
									this.setState({ emailError: '' });
									this.setState({ loginError: '' });
								}}
							/>
							{this.state.emailError ? (
								<p className='error emailErr'>
									{this.state.emailError}
								</p>
							) : this.state.loginError ? (
								<p className='error emailErr'>
									{this.state.loginError}
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
								id='password'
								onChange={(event) => {
									this.setState({
										password: event.target.value,
									});
									this.setState({ passwordError: '' });
								}}
							/>
							{this.state.passwordError ? (
								<p className='error passErr'>
									{this.state.passwordError}
								</p>
							) : (
								''
							)}
						</div>
					</div>

					<input
						className='btn border-2 border-black'
						type='submit'
						value='Login'
					/>

					{this.state.success ? (
						<Navigate to='/' replace={true} />
					) : (
						''
					)}
				</form>
			</div>
		);
	}
}

export default Login;
