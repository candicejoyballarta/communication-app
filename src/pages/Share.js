import React, { Component } from 'react';
import '../css/share.css';

export class Share extends Component {
	constructor() {
		super();
		this.state = {
			users: JSON.parse(localStorage.getItem('Users')) || [],
			documents: JSON.parse(localStorage.getItem('userDocuments')) || [],
			loggedIn: JSON.parse(localStorage.getItem('loggedIn')) || {},
			shares: [],
			fileName: '',
			selected: '-- Select User --',
			selectErr: '',
		};

		this.addShare = this.addShare.bind(this);
		this.removeShare = this.removeShare.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		const link = window.location.pathname.split('/');
		const docuShares = this.state.documents.find(
			({ fileId }) => fileId === +link[2]
		);
		this.setState({ shares: docuShares.shareIds });
		this.setState({ fileName: docuShares.fileName });
	}

	handleChange(event) {
		this.setState({ selected: event.target.value });
		this.setState({ selectErr: '' });
	}

	addShare(e) {
		e.preventDefault();

		let selected = this.state.selected;

		if (!selected || selected === '-- Select User --') {
			this.setState({ selectErr: 'Please select a user' });
		} else {
			const link = window.location.pathname.split('/');
			const docuToAddShare = this.state.documents.find(
				({ fileId }) => fileId === +link[2]
			);
			docuToAddShare.shareIds.push(+selected);
			localStorage.setItem(
				'userDocuments',
				JSON.stringify(this.state.documents)
			);
			this.setState({ selected: '' });
			this.setState({ selectErr: '' });
		}
	}

	removeShare(id) {
		const link = window.location.pathname.split('/');
		const docuToRemoveShare = this.state.documents.find(
			({ fileId }) => fileId === +link[2]
		);
		let itemIndex = docuToRemoveShare.shareIds.indexOf(id);
		if (itemIndex > -1) {
			docuToRemoveShare.shareIds.splice(itemIndex, 1);
		}
		this.setState({ shares: docuToRemoveShare.shareIds });

		localStorage.setItem(
			'userDocuments',
			JSON.stringify(this.state.documents)
		);
	}

	render() {
		return (
			<>
				<div className='upload-sharing'>
					<h2>
						Upload Sharing:
						<span className='file-name' id='fileName'>
							{' '}
							{this.state.fileName}
						</span>
					</h2>
					<div className='table-border'>
						<table>
							<thead>
								<tr>
									<td>Shared User</td>
									<td>Action</td>
								</tr>
							</thead>
							<tbody id='share-list'>
								{this.state.shares.length > 0 ? (
									this.state.shares.map((userId, index) => {
										let userSharedTo =
											this.state.users.find(
												({ id }) => id === userId
											);
										return (
											<tr key={index}>
												<td>{userSharedTo.fullName}</td>
												<td>
													<a
														href='#remove-share'
														onClick={(e) => {
															e.preventDefault();
															this.removeShare(
																userSharedTo.id
															);
														}}
													>
														Remove
													</a>
												</td>
											</tr>
										);
									})
								) : (
									<tr className='text-center'>
										<td colSpan={2}>
											No data available yet
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>

				<div className='add-sharing'>
					<h2>Add Sharing</h2>
					<form onSubmit={this.addShare} className='share-input'>
						<label>Choose User :</label>
						<div className='select-wrap'>
							<select
								name='user'
								id='share-users'
								onChange={this.handleChange}
							>
								<option>-- Select user --</option>
								{this.state.users.map((user, index) => {
									const link =
										window.location.pathname.split('/');
									const docuShares =
										this.state.documents.find(
											({ fileId }) => fileId === +link[2]
										);
									let option;
									if (
										user.id !== this.state.loggedIn.id &&
										!docuShares.shareIds.includes(user.id)
									) {
										option = (
											<option key={index} value={user.id}>
												{user.fullName}
											</option>
										);
									}
									return option;
								})}
							</select>
						</div>
						<input type='submit' value='Add Share' id='add-share' />
						{this.state.selectErr ? (
							<p className='error pl-5'>{this.state.selectErr}</p>
						) : (
							''
						)}
					</form>
				</div>
			</>
		);
	}
}

export default Share;
