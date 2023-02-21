import React, { Component } from 'react';
import '../css/chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class GroupChat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: JSON.parse(localStorage.getItem('Users')) || [],
			chats: JSON.parse(localStorage.getItem('chatMessages')) || [],
			loggedIn: JSON.parse(localStorage.getItem('loggedIn')) || {},
			message: '',
			msgError: '',
			username: null,
		};

		this.sendMessage = this.sendMessage.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.setState({ username: this.state.loggedIn.fullName });
	}

	handleChange(event) {
		this.setState({ message: event.target.value });
		this.setState({
			msgError: '',
		});
	}

	sendMessage(e) {
		e.preventDefault();
		let hasError = false;
		const loggedUser = this.state.loggedIn;

		// Get Chat Logs from localStorage
		const chatMessages = this.state.chats;

		let message = this.state.message.trim();

		if (!message) {
			this.setState({ msgError: 'Please input a message' });
			hasError = true;
		}

		if (!hasError) {
			// Get Time and Date of Message
			let date = new Date();
			let dateFormat =
				'[' +
				date.getFullYear() +
				'-' +
				date.getDate() +
				'-' +
				(date.getMonth() + 1) +
				' ' +
				date.getHours() +
				':' +
				date.getMinutes() +
				':' +
				date.getSeconds() +
				']';

			let chatMsg = {
				dateTime: dateFormat,
				userId: loggedUser.id,
				message: message,
			};

			chatMessages.push(chatMsg);
			localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
			this.setState({ chats: chatMessages });
			this.setState({ message: '' });
		}
	}

	render() {
		return (
			<div className='chat-container'>
				<span className='chat-title text-lg'>Group Chat</span>
				<span className='close right'>
					<FontAwesomeIcon icon='fa-solid fa-xmark' fontSize='20' />
				</span>
				<div id='chat-history' className='chat-history'>
					{this.state.chats.map((chat, index) => {
						let chatUser = this.state.users.find(
							({ id }) => id === chat.userId
						);

						return (
							<p key={index}>
								{chat.dateTime} {chatUser.fullName}:{' '}
								{chat.message}
							</p>
						);
					})}
				</div>

				<form onSubmit={this.sendMessage} className='chat-box'>
					<strong>
						<span id='chat-name'>{this.state.username}</span>
					</strong>
					<textarea
						name='message'
						id='chat-box'
						rows='1'
						value={this.state.message}
						onChange={this.handleChange}
					></textarea>
					<div className='buttons'>
						<input type='submit' value='Send' id='submit-btn' />
						<input
							type='button'
							value='Refresh'
							id='reset-btn'
							onClick={() => window.location.reload(false)}
						/>
					</div>
				</form>
				{this.state.msgError ? (
					<p className='error ml-28'>{this.state.msgError}</p>
				) : (
					''
				)}
			</div>
		);
	}
}

export default GroupChat;
