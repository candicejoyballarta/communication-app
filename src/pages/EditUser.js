import React, { useState } from 'react';
import '../css/edit-user.css';
import { useNavigate, useParams } from 'react-router-dom';

export const EditUser = (props) => {
	const navigate = useNavigate();
	let { id: userId } = useParams();
	const userList = JSON.parse(localStorage.getItem('Users')) || [];
	// find user from userList using userID
	const userToEdit = userList.find(({ id }) => id === +userId);

	const [user, setUser] = useState({
		fullName: userToEdit.fullName,
		email: userToEdit.email,
	});

	const [errors, setErrors] = useState({
		fullNameErr: '',
		emailErr: '',
	});

	const { fullName, email } = user;
	const { fullNameErr, emailErr } = errors;

	const checkIfEmailIsTaken = (email) => {
		// check if the email is already in use by another user in localStorage
		const filterEmails = userList.filter(
			({ email }) => email !== userToEdit.email
		);
		const takenEmails = filterEmails.map((u) => u.email);

		return takenEmails.includes(email);
	};

	const validateEmail = (email) => {
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
	};

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
		setErrors({ fullNameErr: '', emailErr: '' });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let hasErrors = false;

		// Validation
		const trimName = fullName.trim();

		if (!trimName) {
			setErrors({ ...errors, fullNameErr: 'Please input full name' });
			hasErrors = true;
		}

		if (!email) {
			setErrors({ ...errors, emailErr: 'Please input email' });
			hasErrors = true;
		} else if (validateEmail(email) === false) {
			setErrors({ ...errors, emailErr: 'Please input valid email' });
			hasErrors = true;
		} else if (checkIfEmailIsTaken(email) === true) {
			setErrors({ ...errors, emailErr: 'Email already taken!' });
			hasErrors = true;
		}

		if (!hasErrors) {
			userToEdit.fullName = fullName;
			userToEdit.email = email;

			const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));

			if (loggedIn.id === userToEdit.id) {
				loggedIn.fullName = fullName;
				loggedIn.email = email;
			}

			localStorage.setItem('Users', JSON.stringify(userList));
			localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
			navigate('/users-list');
		}
	};

	return (
		<div className='container'>
			<h2>Edit User Information</h2>
			<div className='edit-user-form'>
				<div className='content'>
					<div className='form-input'>
						<label>
							<strong>Full Name</strong>
						</label>
						<input
							className='input'
							type='text'
							name='fullName'
							id='fullName'
							value={user.fullName}
							onChange={handleChange}
						/>
						{fullNameErr ? (
							<p className='error editErr'>{fullNameErr}</p>
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
							id='email'
							value={user.email}
							onChange={handleChange}
						/>
						{emailErr ? (
							<p className='error editErr'>{emailErr}</p>
						) : (
							''
						)}
					</div>
				</div>
				<input
					className='btn'
					type='submit'
					value='Save'
					onClick={handleSubmit}
				/>
			</div>
		</div>
	);
};

export default EditUser;
