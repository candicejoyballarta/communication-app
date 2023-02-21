import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/document-list.css';
import { DeleteModal } from './components/deleteModal';
import EditModal from './components/EditModal';
import UploadModal from './components/UploadModal';

export class ManageDocuments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: JSON.parse(localStorage.getItem('Users')) || [],
			documents: JSON.parse(localStorage.getItem('userDocuments')) || [],
			loggedIn: JSON.parse(localStorage.getItem('loggedIn')) || {},
			docId: null,
			docToEdit: null,
			displayUpload: 'none',
			displayEdit: 'none',
			displayDelete: 'none',
			fileName: '',
			fileLabel: 'Sample File',
			fileErr: '',
			labelErr: '',
		};

		this.fileInputRef = React.createRef();
		this.handleFileInputChange = this.handleFileInputChange.bind(this);
		this.showUpload = this.showUpload.bind(this);
		this.showEdit = this.showEdit.bind(this);
		this.showDelete = this.showDelete.bind(this);
		this.hideUpload = this.hideUpload.bind(this);
		this.hideEdit = this.hideEdit.bind(this);
		this.hideDelete = this.hideDelete.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.onChangeLabel = this.onChangeLabel.bind(this);
	}

	handleFileInputChange(event) {
		this.setState({ fileName: event.target.files[0].name });
	}

	onChangeLabel(e) {
		this.setState({
			fileLabel: e.target.value,
		});
	}

	showUpload() {
		this.setState({ displayUpload: 'block' });
	}

	showEdit(document) {
		this.setState({ docId: document.id });
		this.setState({ docToEdit: document });
		this.setState({ displayEdit: 'block' });
	}

	showDelete(id) {
		this.setState({ docId: id });
		this.setState({ displayDelete: 'block' });
	}

	hideUpload() {
		this.setState({ docId: null });
		this.setState({ displayUpload: 'none' });
		this.setState({ fileErr: '' });
		this.setState({ labelErr: '' });
	}

	hideEdit() {
		this.setState({ docId: null });
		this.setState({ displayEdit: 'none' });
	}

	hideDelete() {
		this.setState({ docId: null });
		this.setState({ displayDelete: 'none' });
	}

	handleUpload = (document) => {
		// Get Documents from localStorage
		const userDocuments = this.state.documents;
		// Push object in array
		userDocuments.push(document);
		// Update localStorage
		localStorage.setItem('userDocuments', JSON.stringify(userDocuments));
		this.setState({ displayUpload: 'none' });
	};

	handleEdit = (label) => {
		const docuToEdit = this.state.documents.find(
			({ fileId }) => fileId === this.state.docToEdit.fileId
		);
		docuToEdit.label = label;
		this.setState({ documents: this.state.documents });
		this.setState({ docId: null });
		localStorage.setItem(
			'userDocuments',
			JSON.stringify(this.state.documents)
		);
	};

	handleDelete(e) {
		e.preventDefault();
		// Filter documents in localStorage
		let userDocs = this.state.documents.filter(
			({ fileId }) => fileId !== this.state.docId
		);
		// Update localStorage
		localStorage.setItem('userDocuments', JSON.stringify(userDocs));
		this.setState({ documents: userDocs });
		this.setState({ displayDelete: 'none' });
	}

	render() {
		return (
			<>
				<h2 className='tab-title'>My Uploads</h2>

				<div className='table-border'>
					<table>
						<thead>
							<tr>
								<td className='label-head'>Label</td>
								<td className='file-head'>File Name</td>
								<td className='action-share'>Action</td>
							</tr>
						</thead>
						<tbody>
							{this.state.documents.map((document, index) => {
								let row;
								if (
									document.ownerId === this.state.loggedIn.id
								) {
									row = (
										<tr key={index}>
											<td>{document.label}</td>
											<td>{document.fileName}</td>
											<td>
												<a
													href='#edit-modal'
													onClick={() =>
														this.showEdit(document)
													}
												>
													Edit
												</a>{' '}
												|
												<a
													href='#delete-modal'
													onClick={() =>
														this.showDelete(
															document.fileId
														)
													}
												>
													{' '}
													Delete
												</a>{' '}
												|
												<Link
													to={`/share/${document.fileId}`}
												>
													{' '}
													Share
												</Link>
											</td>
										</tr>
									);
								}
								return row;
							})}
						</tbody>
					</table>
				</div>

				<div className='shared-uploads'>
					<h2 className='tab-title'>Shared Uploads</h2>
					<div className='table-border'>
						<table>
							<thead>
								<tr>
									<td className='label-head'>Label</td>
									<td className='file-head'>File Name</td>
									<td className='action-share'>Shared by</td>
								</tr>
							</thead>
							<tbody id='shared-docs'>
								{this.state.documents.map((document, index) => {
									let row;
									let shareIds = document.shareIds.some(
										(user) =>
											user === this.state.loggedIn.id
									);
									if (shareIds) {
										let docsOwner = this.state.users.find(
											({ id }) => id === document.ownerId
										);
										row = (
											<tr key={index}>
												<td>{document.label}</td>
												<td>{document.fileName}</td>
												<td>{docsOwner.email}</td>
											</tr>
										);
									}
									return row;
								})}
								<tr>
									<td>
										<button
											type='button'
											onClick={this.showUpload}
										>
											&#43; Add Upload
										</button>
									</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				{/* Upload Modal */}
				<UploadModal
					loggedIn={this.state.loggedIn}
					show={this.state.displayUpload}
					onClose={this.hideUpload}
					onUpload={this.handleUpload}
				/>

				{/* Edit Modal */}
				{this.state.docToEdit && (
					<EditModal
						doc={this.state.docToEdit}
						show={this.state.displayEdit}
						onClose={this.hideEdit}
						onUpdate={this.handleEdit}
						onChange={this.onChangeLabel}
					/>
				)}

				{/* Delete Modal */}
				<DeleteModal
					title='Confirm File Deletion'
					show={this.state.displayDelete}
					onClose={this.hideDelete}
					onDelete={this.handleDelete}
				/>
			</>
		);
	}
}

export default ManageDocuments;
