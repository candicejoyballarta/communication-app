import React from 'react';
import { Link } from 'react-router-dom';
import { DeleteModal } from './components/deleteModal';

export class ManageUsers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: JSON.parse(localStorage.getItem('Users')) || [],
			chats: JSON.parse(localStorage.getItem('chatMessages')) || [],
			documents: JSON.parse(localStorage.getItem('userDocuments')) || [],
			loggedIn: JSON.parse(localStorage.getItem('loggedIn')) || {},
			deleteId: null,
			displayStyle: 'none',
		};

		this.showDeleteModal = this.showDeleteModal.bind(this);
		this.unshowDeleteModal = this.unshowDeleteModal.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleStorageUpdate = this.handleStorageUpdate.bind(this);
	}

	showDeleteModal(id) {
		this.setState({ deleteId: id });
		this.setState({ displayStyle: 'block' });
	}

	unshowDeleteModal() {
		this.setState({ displayStyle: 'none' });
	}

	handleDelete(e) {
		e.preventDefault();

		// Delete user chat messages
		let userChat = this.state.chats.filter(
			({ userId }) => userId !== this.state.deleteId
		);
		localStorage.setItem('chatMessages', JSON.stringify(userChat));

		// Delete user documents
		let userDocs = this.state.documents.filter(
			({ ownerId }) => ownerId !== this.state.deleteId
		);
		// Remove shared files to user
		const userDocShares = userDocs.map((file) => {
			let docShares = file.shareIds.filter(
				(shareIds) => shareIds !== this.state.deleteId
			);
			return { ...file, shareIds: docShares };
		});
		localStorage.setItem('userDocuments', JSON.stringify(userDocShares));

		// Delete user data in localStorage
		let users = this.state.users.filter(
			({ id }) => id !== this.state.deleteId
		);
		localStorage.setItem('Users', JSON.stringify(users));
		this.setState({ displayStyle: 'none' });
		this.setState({ users: users });
	}

	componentDidMount() {
		const users = JSON.parse(localStorage.getItem('Users')) || [];
		if (users) {
			this.setState({ users: users });
		}

		window.addEventListener('storage', this.handleStorageUpdate);
	}

	componentWillUnmount() {
		window.removeEventListener('storage', this.handleStorageUpdate);
	}

	handleStorageUpdate = (event) => {
		if (event.key === 'Users') {
			this.setState({ users: event.newValue });
		}
	};

	render() {
		return (
			<>
				<h2 className='tab-title'>Users</h2>

				<div className='table-border'>
					<table>
						<thead>
							<tr>
								<td className='col-name'>Name</td>
								<td className='col-email'>User Email ID</td>
								<td className='col-actions'></td>
							</tr>
						</thead>
						<tbody>
							{this.state.users.map((user, index) => (
								<tr key={index}>
									<td>{user.fullName}</td>
									<td>{user.email}</td>
									<td>
										<Link to={`/edit-user/${user.id}`}>
											Edit{' '}
										</Link>
										{user.id === this.state.loggedIn.id ? (
											''
										) : (
											<button
												className='asText'
												onClick={() => {
													this.showDeleteModal(
														user.id
													);
												}}
											>
												{' '}
												| Delete
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<DeleteModal
					title='Confirm User Deletion'
					show={this.state.displayStyle}
					onClose={this.unshowDeleteModal}
					onDelete={this.handleDelete}
				/>
			</>
		);
	}
}

export default ManageUsers;
