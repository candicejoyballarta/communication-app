import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UploadModal = (props) => {
	const [label, setLabel] = useState('');
	const [fileName, setFileName] = useState('');
	const [labelErr, setLabelErr] = useState('');
	const [fileErr, setFileErr] = useState('');
	const fileInputRef = useRef();
	// ref for file input

	const handleLabelChange = (e) => {
		setLabel(e.target.value);
		setLabelErr('');
	};
	const handleFileInputChange = (e) => {
		setFileName(e.target.files[0].name);
		setFileErr('');
	};
	const handleClose = () => props.onClose();
	const handleUpload = (e) => {
		e.preventDefault();

		// Validate Inputs
		let hasErrors = false;
		const trimLabel = label.trim();

		if (!trimLabel) {
			setLabelErr('File Label is required!');
			hasErrors = true;
		} else {
			setLabelErr('');
		}

		if (!fileName) {
			setFileErr('File is required!');
			hasErrors = true;
		} else {
			setFileErr('');
		}

		// Generate ID
		const randomNumber = Math.floor(Math.random() * 999);

		// Save inputs in an object
		let docs = {
			fileId: randomNumber,
			ownerId: props.loggedIn.id,
			shareIds: [],
			fileName: fileName,
			label: trimLabel,
		};

		if (!hasErrors) {
			props.onUpload(docs);
			setFileName('');
			setLabel('Sample File');
			fileInputRef.current.files = null;
			document.getElementById('fileName').value = '';
			props.onClose();
		}
	};

	return (
		<div
			id='upload-modal'
			className='modal center height-inc'
			style={
				fileErr || labelErr
					? {
							height: '22rem',
							display: props.show,
					  }
					: {
							height: '16rem',
							display: props.show,
					  }
			}
		>
			<div className='modal-header'>
				<span className='header'>Upload</span>
				<span
					className='close right'
					id='upload-close'
					onClick={handleClose}
				>
					<FontAwesomeIcon icon='fa-solid fa-xmark' fontSize='20' />
				</span>
			</div>
			<form onSubmit={handleUpload} className='modal-body'>
				<div className='form-input upload-label'>
					<label>Label</label>
					<input
						type='text'
						name='label'
						value={label}
						id='label'
						onChange={handleLabelChange}
					/>
					{labelErr ? <p className='error ml-28'>{labelErr}</p> : ''}
				</div>

				<div className='form-input upload-file-input'>
					<label>File Upload</label>
					<input
						type='file'
						name='file'
						id='fileName'
						onChange={handleFileInputChange}
						ref={fileInputRef}
					/>
					{fileErr ? <p className='error ml-32'>{fileErr}</p> : ''}
				</div>

				<div className='modal-buttons'>
					<input type='submit' value='Upload Now' id='upload-btn' />
					<input
						type='button'
						value='Cancel'
						id='upload-cancel'
						onClick={handleClose}
					/>
				</div>
			</form>
		</div>
	);
};

export default UploadModal;
